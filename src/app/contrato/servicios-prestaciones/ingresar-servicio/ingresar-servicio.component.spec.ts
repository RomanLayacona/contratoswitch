import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarServicioComponent } from './ingresar-servicio.component';

describe('IngresarServicioComponent', () => {
  let component: IngresarServicioComponent;
  let fixture: ComponentFixture<IngresarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
