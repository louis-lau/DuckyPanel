import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { DkimDialogComponent } from "./dkim-dialog.component"

describe("DkimDialogComponent", (): void => {
  let component: DkimDialogComponent
  let fixture: ComponentFixture<DkimDialogComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [DkimDialogComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(DkimDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
