import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { FabButtonComponent } from "./fab-button.component"

describe("FabButtonComponent", (): void => {
  let component: FabButtonComponent
  let fixture: ComponentFixture<FabButtonComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [FabButtonComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(FabButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
