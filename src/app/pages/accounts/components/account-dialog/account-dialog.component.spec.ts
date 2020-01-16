import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AccountDialogComponent } from './account-dialog.component'

describe('AccountDialogComponent', (): void => {
  let component: AccountDialogComponent
  let fixture: ComponentFixture<AccountDialogComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [AccountDialogComponent],
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(AccountDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
