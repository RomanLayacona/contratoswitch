import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDescuentoNoTransaccionalComponent } from './crear-descuento-no-transaccional.component';

describe('CrearDescuentoNoTransaccionalComponent', () => {
  let component: CrearDescuentoNoTransaccionalComponent;
  let fixture: ComponentFixture<CrearDescuentoNoTransaccionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDescuentoNoTransaccionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDescuentoNoTransaccionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
