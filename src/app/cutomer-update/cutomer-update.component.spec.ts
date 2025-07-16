import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerUpdateComponent } from './cutomer-update.component';

describe('CutomerUpdateComponent', () => {
  let component: CutomerUpdateComponent;
  let fixture: ComponentFixture<CutomerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CutomerUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutomerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
