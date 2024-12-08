import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoPage } from './mantenimiento.page';
import { FirebaseService } from '../../../services/firebase.service';
import { of } from 'rxjs';

describe('MantenimientoPage', () => {
  let component: MantenimientoPage;
  let fixture: ComponentFixture<MantenimientoPage>;
  let firebaseService: jasmine.SpyObj<FirebaseService>;

  beforeEach(async () => {
    const firebaseServiceSpy = jasmine.createSpyObj('FirebaseService', ['getSalasMantenimiento', 'getSalaById']);

    await TestBed.configureTestingModule({
      declarations: [MantenimientoPage],
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenimientoPage);
    component = fixture.componentInstance;
    firebaseService = TestBed.inject(FirebaseService) as jasmine.SpyObj<FirebaseService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getSalasMantenimiento', () => {
    it('should get salas from Firebase', () => {
      const mockSalas = [{ id: '1', nombre: 'Sala 1' }, { id: '2', nombre: 'Sala 2' }];
      firebaseService.getSalasMantenimiento.and.returnValue(of(mockSalas));

      component.getSalas(); // Llama a tu método que usa getSalasMantenimiento

      expect(firebaseService.getSalasMantenimiento).toHaveBeenCalled();
      expect(component.salas).toEqual(mockSalas); // Asumiendo que tienes un array `salas` en tu componente
    });
  });

  describe('getSalaById', () => {
    it('should get sala by id from Firebase', () => {
      const mockSala = { id: '1', nombre: 'Sala 1' };
      const id = '1';
      firebaseService.getSalaById.and.returnValue(of(mockSala));

      component.getSalaById(id); // Llama a tu método que usa getSalaById

      expect(firebaseService.getSalaById).toHaveBeenCalledWith(id);
      expect(component.sala).toEqual(mockSala); // Asumiendo que tienes una propiedad `sala` en tu componente
    });
  });
});
