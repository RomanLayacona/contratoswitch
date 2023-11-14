import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarServiciosPrestacionesComponent } from './editar-servicios-prestaciones.component';

describe('EditarServiciosPrestacionesComponent', () => {
  let component: EditarServiciosPrestacionesComponent;
  let fixture: ComponentFixture<EditarServiciosPrestacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarServiciosPrestacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarServiciosPrestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
