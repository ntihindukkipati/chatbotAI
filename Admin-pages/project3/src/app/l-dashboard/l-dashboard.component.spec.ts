import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LDashboardComponent } from './l-dashboard.component';

describe('LDashboardComponent', () => {
  let component: LDashboardComponent;
  let fixture: ComponentFixture<LDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
