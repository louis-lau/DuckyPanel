import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { AddressesComponent } from "./addresses.component"

describe("AddressesComponent", (): void => {
  let component: AddressesComponent
  let fixture: ComponentFixture<AddressesComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [AddressesComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(AddressesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
