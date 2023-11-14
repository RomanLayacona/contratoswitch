import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAdicionalComponent } from './editar-adicional.component';

describe('EditarAdicionalComponent', () => {
  let component: EditarAdicionalComponent;
  let fixture: ComponentFixture<EditarAdicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAdicionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
