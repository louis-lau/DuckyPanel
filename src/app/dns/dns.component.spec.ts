import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { DnsComponent } from "./dns.component"

describe("DnsComponent", (): void => {
  let component: DnsComponent
  let fixture: ComponentFixture<DnsComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [DnsComponent]
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(DnsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    expect(component).toBeTruthy()
  })
})
