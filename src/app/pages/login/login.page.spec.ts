import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let firebaseServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Crea un mock para el servicio FirebaseService
    firebaseServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(Promise.resolve()),
    };

    // Crea un mock para el Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    // Mock para NavController
    const navControllerMock = {
      navigateForward: jasmine.createSpy('navigateForward'),
      navigateBack: jasmine.createSpy('navigateBack'),
    };

    // Mock para console.error
    spyOn(console, 'error');

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NavController, useValue: navControllerMock }, // Mock NavController
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Debería iniciar sesión', async () => {
    // Preparar
    component.email = 'test@example.com';
    component.password = 'password123';

    // Actuar
    await component.submit();

    // Afirmar
    expect(firebaseServiceMock.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(routerMock.navigate).toHaveBeenCalledWith(['../main/home']);
  });

});
