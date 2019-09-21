import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { DialogComponent } from "./dialog.component"

describe("DialogComponent", (): void => {
  let component: DialogComponent
  let fixture: ComponentFixture<DialogComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(DialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
