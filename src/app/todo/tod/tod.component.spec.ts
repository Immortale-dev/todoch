import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodComponent } from './tod.component';

describe('TodComponent', () => {
  let component: TodComponent;
  let fixture: ComponentFixture<TodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
