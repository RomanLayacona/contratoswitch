import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosPrestacionesComponent } from './servicios-prestaciones.component';

describe('ServiciosPrestacionesComponent', () => {
  let component: ServiciosPrestacionesComponent;
  let fixture: ComponentFixture<ServiciosPrestacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosPrestacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosPrestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
