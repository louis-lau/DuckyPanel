import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { AddressDialogComponent } from "./address-dialog.component"

describe("AddressDialogComponent", (): void => {
  let component: AddressDialogComponent
  let fixture: ComponentFixture<AddressDialogComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [AddressDialogComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(AddressDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
