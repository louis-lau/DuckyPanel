import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { ConfirmDialogComponent } from "./confirm-dialog.component"

describe("ConfirmDialogComponent", (): void => {
  let component: ConfirmDialogComponent
  let fixture: ComponentFixture<ConfirmDialogComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(ConfirmDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
