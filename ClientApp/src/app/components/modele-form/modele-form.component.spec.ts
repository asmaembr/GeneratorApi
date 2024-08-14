import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleFormComponent } from './modele-form.component';

describe('ModeleFormComponent', () => {
  let component: ModeleFormComponent;
  let fixture: ComponentFixture<ModeleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
