import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCaseComponent } from './dashboard-case.component';

describe('DashboardCaseComponent', () => {
  let component: DashboardCaseComponent;
  let fixture: ComponentFixture<DashboardCaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCaseComponent]
    });
    fixture = TestBed.createComponent(DashboardCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
