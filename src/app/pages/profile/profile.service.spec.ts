import { TestBed, TestBedStatic } from '@angular/core/testing'

import { ProfileService } from './profile.service'

describe('ProfileService', (): void => {
  beforeEach((): TestBedStatic => TestBed.configureTestingModule({}))

  it('should be created', (): void => {
    const service: ProfileService = TestBed.get(ProfileService)
    expect(service).toBeTruthy()
  })
})
