import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAtaques } from './admin-ataques';

describe('AdminAtaques', () => {
  let component: AdminAtaques;
  let fixture: ComponentFixture<AdminAtaques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAtaques],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAtaques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
