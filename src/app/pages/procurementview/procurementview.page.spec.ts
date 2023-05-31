import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcurementviewPage } from './procurementview.page';

describe('ProcurementviewPage', () => {
  let component: ProcurementviewPage;
  let fixture: ComponentFixture<ProcurementviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcurementviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
