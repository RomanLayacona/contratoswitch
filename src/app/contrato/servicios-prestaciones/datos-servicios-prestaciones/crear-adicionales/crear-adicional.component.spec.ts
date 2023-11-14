import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAdicionalComponent } from './crear-adicional.component';

describe('CrearAdicionalComponent', () => {
  let component: CrearAdicionalComponent;
  let fixture: ComponentFixture<CrearAdicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAdicionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
