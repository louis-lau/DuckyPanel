import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { LoginComponent } from "./login.component"

describe("LoginComponent", (): void => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
