import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualisationComponent } from './previsualisation.component';

describe('PrevisualisationComponent', () => {
  let component: PrevisualisationComponent;
  let fixture: ComponentFixture<PrevisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevisualisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
