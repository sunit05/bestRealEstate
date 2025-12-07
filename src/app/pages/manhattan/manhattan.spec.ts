import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Manhattan } from './manhattan';

describe('Manhattan', () => {
  let component: Manhattan;
  let fixture: ComponentFixture<Manhattan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manhattan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Manhattan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
