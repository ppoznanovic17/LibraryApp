import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistAllComponent } from './booklist-all.component';

describe('BooklistAllComponent', () => {
  let component: BooklistAllComponent;
  let fixture: ComponentFixture<BooklistAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooklistAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooklistAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
