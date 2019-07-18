import { TestBed, TestBedStatic } from "@angular/core/testing"

import { AddressesService } from "./addresses.service"

describe("AddressesService", (): void => {
  beforeEach((): TestBedStatic => TestBed.configureTestingModule({}))

  it("should be created", (): void => {
    const service: AddressesService = TestBed.get(AddressesService)
    expect(service).toBeTruthy()
  })
})
