import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DkimDialogComponent } from './dkim-dialog.component';

describe('DkimDialogComponent', () => {
  let component: DkimDialogComponent;
  let fixture: ComponentFixture<DkimDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DkimDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DkimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
