import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosServiciosPrestacionesComponent } from './datos-servicios-prestaciones.component';

describe('DatosServiciosPrestacionesComponent', () => {
  let component: DatosServiciosPrestacionesComponent;
  let fixture: ComponentFixture<DatosServiciosPrestacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosServiciosPrestacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosServiciosPrestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
