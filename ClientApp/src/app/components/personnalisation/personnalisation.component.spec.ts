import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalisationComponent } from './personnalisation.component';

describe('PersonnalisationComponent', () => {
  let component: PersonnalisationComponent;
  let fixture: ComponentFixture<PersonnalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnalisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
