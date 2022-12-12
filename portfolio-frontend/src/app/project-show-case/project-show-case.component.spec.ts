import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectShowCaseComponent } from './project-show-case.component';

describe('ProjectShowCaseComponent', () => {
  let component: ProjectShowCaseComponent;
  let fixture: ComponentFixture<ProjectShowCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectShowCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectShowCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
