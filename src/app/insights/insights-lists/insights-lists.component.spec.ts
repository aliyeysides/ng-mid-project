import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsListsComponent } from './insights-lists.component';

describe('InsightsListsComponent', () => {
  let component: InsightsListsComponent;
  let fixture: ComponentFixture<InsightsListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightsListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
