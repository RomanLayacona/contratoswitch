import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParametroComisionComponent } from './create-parametro-comision.component';

describe('CreateParametroComisionComponent', () => {
  let component: CreateParametroComisionComponent;
  let fixture: ComponentFixture<CreateParametroComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParametroComisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParametroComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
