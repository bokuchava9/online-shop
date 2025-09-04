import { ComponentFixture, TestBed } from '@angular/core/testing';
// --- ვცვლით სახელს ---
import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // --- და აქაც ---
      imports: [HeaderComponent]
    })
    .compileComponents();

    // --- და აქაც ---
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});