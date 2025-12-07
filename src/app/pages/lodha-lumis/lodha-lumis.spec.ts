import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodhaLumis } from './lodha-lumis';

describe('LodhaLumis', () => {
  let component: LodhaLumis;
  let fixture: ComponentFixture<LodhaLumis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LodhaLumis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LodhaLumis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
