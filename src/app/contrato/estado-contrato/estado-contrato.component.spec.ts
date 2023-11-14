import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoContratoComponent } from './estado-contrato.component';

describe('EstadoContratoComponent', () => {
  let component: EstadoContratoComponent;
  let fixture: ComponentFixture<EstadoContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
