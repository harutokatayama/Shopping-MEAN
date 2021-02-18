import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostProductsComponent } from './admin-post-products.component';

describe('AdminPostProductsComponent', () => {
  let component: AdminPostProductsComponent;
  let fixture: ComponentFixture<AdminPostProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPostProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
