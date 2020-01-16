import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ForwarderDialogComponent } from './forwarder-dialog.component'

describe('ForwarderDialogComponent', (): void => {
  let component: ForwarderDialogComponent
  let fixture: ComponentFixture<ForwarderDialogComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [ForwarderDialogComponent],
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(ForwarderDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
