import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleFormVarComponent } from './modele-form-var.component';

describe('ModeleFormVarComponent', () => {
  let component: ModeleFormVarComponent;
  let fixture: ComponentFixture<ModeleFormVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleFormVarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleFormVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
