import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosComisionComponent } from './parametros-comision.component';

describe('ParametrosComisionComponent', () => {
  let component: ParametrosComisionComponent;
  let fixture: ComponentFixture<ParametrosComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosComisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
