import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoProcesadoraComponent } from './contrato-procesadora.component';

describe('ContratoProcesadoraComponent', () => {
  let component: ContratoProcesadoraComponent;
  let fixture: ComponentFixture<ContratoProcesadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoProcesadoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoProcesadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
