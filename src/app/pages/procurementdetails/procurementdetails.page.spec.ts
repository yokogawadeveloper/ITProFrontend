import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcurementdetailsPage } from './procurementdetails.page';

describe('ProcurementdetailsPage', () => {
  let component: ProcurementdetailsPage;
  let fixture: ComponentFixture<ProcurementdetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcurementdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
