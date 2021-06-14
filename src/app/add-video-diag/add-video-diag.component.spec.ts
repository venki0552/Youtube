import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoDiagComponent } from './add-video-diag.component';

describe('AddVideoDiagComponent', () => {
  let component: AddVideoDiagComponent;
  let fixture: ComponentFixture<AddVideoDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideoDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVideoDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
