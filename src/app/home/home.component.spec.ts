import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { HomeComponent } from "./home.component"

describe("HomeComponent", (): void => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
