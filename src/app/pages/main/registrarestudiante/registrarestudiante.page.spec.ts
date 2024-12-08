import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarestudiantePage } from './registrarestudiante.page';

describe('RegistrarestudiantePage', () => {
  let component: RegistrarestudiantePage;
  let fixture: ComponentFixture<RegistrarestudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarestudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
