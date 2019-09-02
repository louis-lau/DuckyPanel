import { TestBed, TestBedStatic } from "@angular/core/testing"

import { AccountsService } from "./accounts.service"

describe("AccountsService", (): void => {
  beforeEach((): TestBedStatic => TestBed.configureTestingModule({}))

  it("should be created", (): void => {
    const service: AccountsService = TestBed.get(AccountsService)
    expect(service).toBeTruthy()
  })
})
