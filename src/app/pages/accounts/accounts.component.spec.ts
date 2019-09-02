import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { AccountsComponent } from "./accounts.component"

describe("AccountsComponent", (): void => {
  let component: AccountsComponent
  let fixture: ComponentFixture<AccountsComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [AccountsComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(AccountsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
