import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFollowerComponent } from './not-follower.component';

describe('NotFollowerComponent', () => {
  let component: NotFollowerComponent;
  let fixture: ComponentFixture<NotFollowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFollowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
