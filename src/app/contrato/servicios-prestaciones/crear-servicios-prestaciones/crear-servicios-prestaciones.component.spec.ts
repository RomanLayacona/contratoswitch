import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearServiciosPrestacionesComponent } from './crear-servicios-prestaciones.component';

describe('CrearServiciosPrestacionesComponent', () => {
  let component: CrearServiciosPrestacionesComponent;
  let fixture: ComponentFixture<CrearServiciosPrestacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearServiciosPrestacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearServiciosPrestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
