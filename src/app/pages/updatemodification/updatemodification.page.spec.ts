import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatemodificationPage } from './updatemodification.page';

describe('UpdatemodificationPage', () => {
  let component: UpdatemodificationPage;
  let fixture: ComponentFixture<UpdatemodificationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatemodificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
