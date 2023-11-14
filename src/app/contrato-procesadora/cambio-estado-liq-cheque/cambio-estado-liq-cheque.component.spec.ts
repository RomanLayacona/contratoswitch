import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioEstadoLiqChequeComponent } from './cambio-estado-liq-cheque.component';

describe('CambioEstadoLiqChequeComponent', () => {
  let component: CambioEstadoLiqChequeComponent;
  let fixture: ComponentFixture<CambioEstadoLiqChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioEstadoLiqChequeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioEstadoLiqChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
