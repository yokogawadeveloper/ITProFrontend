import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovallistdetailsPage } from './approvallistdetails.page';

describe('ApprovallistdetailsPage', () => {
  let component: ApprovallistdetailsPage;
  let fixture: ComponentFixture<ApprovallistdetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApprovallistdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
