import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ErrorSnackbarComponent } from './error-snackbar.component'

describe('ErrorSnackbarComponent', (): void => {
  let component: ErrorSnackbarComponent
  let fixture: ComponentFixture<ErrorSnackbarComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [ErrorSnackbarComponent],
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(ErrorSnackbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
