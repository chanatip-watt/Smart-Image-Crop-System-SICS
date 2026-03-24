import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowImg } from './show-img';


describe('ShowImg', () => {
  let component: ShowImg;
  let fixture: ComponentFixture<ShowImg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowImg],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowImg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
