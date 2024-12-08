import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPage } from './main.page';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear main', () => {
    expect(component).toBeTruthy();
  });
});
