import { TestBed } from '@angular/core/testing'

import { ErrorSnackbarService } from './error-snackbar.service'

describe('ErrorSnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: ErrorSnackbarService = TestBed.get(ErrorSnackbarService)
    expect(service).toBeTruthy()
  })
})
