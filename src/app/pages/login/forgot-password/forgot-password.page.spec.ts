import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordPage } from './forgot-password.page';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;
  let firebaseServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    firebaseServiceMock = {
      resetPassword: jasmine.createSpy('resetPassword').and.returnValue(Promise.resolve()),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería enviar un correo de recuperación', async () => {
    // Preparar
    component.email = 'test@example.com';

    // Actuar
    await component.sendResetLink();

    // Afirmar
    expect(firebaseServiceMock.resetPassword).toHaveBeenCalledWith('test@example.com');
    expect(component.message).toBe('Se ha enviado un enlace de recuperación a tu correo.');
  });


});
