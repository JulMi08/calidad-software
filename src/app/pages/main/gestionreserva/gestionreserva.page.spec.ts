// src/app/pages/gestionreserva/gestionreserva.page.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionreservaPage } from './gestionreserva.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { of, throwError } from 'rxjs';

describe('GestionreservaPage', () => {
  let component: GestionreservaPage;
  let fixture: ComponentFixture<GestionreservaPage>;
  let firebaseServiceMock: jasmine.SpyObj<FirebaseService>;
  let utilsServiceMock: jasmine.SpyObj<UtilsService>;

  beforeEach(async () => {
    firebaseServiceMock = jasmine.createSpyObj('FirebaseService', ['getSlots', 'updateSlotStatus', 'deleteSubCollection', 'updatecancelReservationStatus']);
    utilsServiceMock = jasmine.createSpyObj('UtilsService', ['loading']);

    await TestBed.configureTestingModule({
      declarations: [GestionreservaPage],
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceMock },
        { provide: UtilsService, useValue: utilsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionreservaPage);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Debería cargar solo las salas deshabilitadas', async () => {
      // Preparar
      const mockSlots = [
        { payload: { doc: { id: '1', data: () => ({ sala: 'Sala 1', disabled: true }) } } },
        { payload: { doc: { id: '2', data: () => ({ sala: 'Sala 2', disabled: false }) } } },
      ];
      firebaseServiceMock.getSlots.and.returnValue(of(mockSlots));
      
      // Simulando un objeto HTMLIonLoadingElement
      const loadingElement = jasmine.createSpyObj<HTMLIonLoadingElement>('HTMLIonLoadingElement', ['present', 'dismiss']);
      loadingElement.animated = false;
      loadingElement.backdropDismiss = true;
      loadingElement.cssClass = '';
      loadingElement.id = '';
      loadingElement.isOpen = false; // Aquí se define isOpen como una propiedad
  
      utilsServiceMock.loading.and.returnValue(Promise.resolve(loadingElement));
  
      // Actuar
      await component.ngOnInit();
  
      // Afirmar
      expect(firebaseServiceMock.getSlots).toHaveBeenCalled();
      expect(component.slots.length).toBe(2);
      expect(loadingElement.present).toHaveBeenCalled();
      expect(loadingElement.dismiss).toHaveBeenCalled();
    });
  });
  
});