import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DomainsComponent } from './domains.component'

describe('DomainsComponent', (): void => {
  let component: DomainsComponent
  let fixture: ComponentFixture<DomainsComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [DomainsComponent],
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(DomainsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
