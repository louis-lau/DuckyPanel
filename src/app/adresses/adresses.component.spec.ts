import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { AdressesComponent } from "./adresses.component"

describe("AdressesComponent", (): void => {
  let component: AdressesComponent
  let fixture: ComponentFixture<AdressesComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [AdressesComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(AdressesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
