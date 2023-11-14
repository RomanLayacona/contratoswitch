import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDescuentoNoTransaccionalComponent } from './editar-descuento-no-transaccional.component';

describe('EditarDescuentoNoTransaccionalComponent', () => {
  let component: EditarDescuentoNoTransaccionalComponent;
  let fixture: ComponentFixture<EditarDescuentoNoTransaccionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDescuentoNoTransaccionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDescuentoNoTransaccionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
