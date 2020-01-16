import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfileComponent } from './profile.component'

describe('ProfileComponent', (): void => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
    }).compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
