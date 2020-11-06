import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoArrayComponent } from './photo-array.component';

describe('PhotoArrayComponent', () => {
  let component: PhotoArrayComponent;
  let fixture: ComponentFixture<PhotoArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
