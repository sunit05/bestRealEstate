import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Amaltis } from './amaltis';

describe('Amaltis', () => {
  let component: Amaltis;
  let fixture: ComponentFixture<Amaltis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Amaltis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Amaltis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
