import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovallistPage } from './approvallist.page';

describe('ApprovallistPage', () => {
  let component: ApprovallistPage;
  let fixture: ComponentFixture<ApprovallistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApprovallistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
