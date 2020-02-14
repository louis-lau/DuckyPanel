import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AddAliasDialogComponent } from './add-alias-dialog.component'

describe('AddAliasDialogComponent', (): void => {
  let component: AddAliasDialogComponent
  let fixture: ComponentFixture<AddAliasDialogComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [AddAliasDialogComponent],
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(AddAliasDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
