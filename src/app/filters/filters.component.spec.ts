import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { FiltersComponent } from "./filters.component"

describe("FiltersComponent", (): void => {
  let component: FiltersComponent
  let fixture: ComponentFixture<FiltersComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(FiltersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
