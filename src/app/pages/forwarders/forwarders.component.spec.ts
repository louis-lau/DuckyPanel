import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { ForwardersComponent } from "./forwarders.component"

describe("ForwardersComponent", (): void => {
  let component: ForwardersComponent
  let fixture: ComponentFixture<ForwardersComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [ForwardersComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(ForwardersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
