import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsModalComponent } from './insights-modal.component';

describe('InsightsModalComponent', () => {
  let component: InsightsModalComponent;
  let fixture: ComponentFixture<InsightsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
