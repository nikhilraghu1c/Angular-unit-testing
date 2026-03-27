import { Component } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'test-component',
  template: `<div appHighlight>Test Highlight Directive</div>`,
  standalone: true,
  imports: [HighlightDirective],
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let divEl: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    divEl = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(divEl).toBeTruthy();
  });

  it('should have red background color', () => {
    expect(divEl.style.backgroundColor).toBe('red');
  });

  it('should change font size on mouse enter and reset on mouse leave', () => {
    // Simulate mouse enter event
    divEl.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(divEl.style.fontSize).toBe('30px');

    // Simulate mouse leave event
    divEl.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    expect(divEl.style.fontSize).toBe('20px');
  });
});
