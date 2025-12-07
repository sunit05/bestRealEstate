import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Runwal } from './runwal';

describe('Runwal', () => {
  let component: Runwal;
  let fixture: ComponentFixture<Runwal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Runwal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Runwal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
