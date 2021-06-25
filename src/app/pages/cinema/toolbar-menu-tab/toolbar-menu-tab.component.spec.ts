import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarMenuTabComponent } from './toolbar-menu-tab.component';

describe('ToolbarMenuTabComponent', () => {
  let component: ToolbarMenuTabComponent;
  let fixture: ComponentFixture<ToolbarMenuTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarMenuTabComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarMenuTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
