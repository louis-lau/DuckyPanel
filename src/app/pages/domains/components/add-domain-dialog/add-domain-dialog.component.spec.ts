import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AddDomainDialogComponent } from './add-domain-dialog.component'

describe('AddDomainDialogComponent', (): void => {
  let component: AddDomainDialogComponent
  let fixture: ComponentFixture<AddDomainDialogComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [AddDomainDialogComponent],
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(AddDomainDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
