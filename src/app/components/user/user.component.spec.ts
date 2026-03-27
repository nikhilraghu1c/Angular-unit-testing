import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { UserComponent } from './user.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UserComponent', () => {
  let fixture: ComponentFixture<UserComponent>;
  let component: UserComponent;
  let el: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show username after button click - using done', (done) => {
    const buttonEl = fixture.nativeElement.querySelector('button');
    buttonEl.click();

    setTimeout(() => {
      expect(component.username).toBe('Ramesh Verma');
      done(); // Call done to indicate that the asynchronous test is complete
    }, 1000);
  });

  it('should show username after button click - using fakeAsync and tick', fakeAsync(() => {
    // fakeAsync is a testing utility function that allows us to write asynchronous tests in a synchronous manner. It provides a fake implementation of the asynchronous functions and allows us to control the passage of time using the tick function.

    const buttonEl = fixture.nativeElement.querySelector('button');
    buttonEl.click();
    tick(1000); // Simulate the passage of time for the setTimeout in the showUserName method
    expect(component.username).toBe('Ramesh Verma');
  }));

  it('should show username after button click - using fakeAsync and flush', fakeAsync(() => {
    // fakeAsync is a testing utility function that allows us to write asynchronous tests in a synchronous manner. It provides a fake implementation of the asynchronous functions and allows us to control the passage of time using the tick function.

    const buttonEl = fixture.nativeElement.querySelector('button');
    buttonEl.click();

    // We can also use flush() here instead of tick(1000) to flush all pending asynchronous tasks, including the setTimeout, without specifying a specific time duration.
    // Flush is used to flush any pending asynchronous tasks, such as microtasks or timers, that may be scheduled during the execution of the test. It ensures that all asynchronous operations are completed before making assertions.

    flush();
    expect(component.username).toBe('Ramesh Verma');
  }));

  // fakeAsync will not work with ajax calls or Promises, as they are not part of the fakeAsync zone.
  // So we can use waitForAsync instead of fakeAsync for testing asynchronous code that involves ajax calls or Promises. waitForAsync allows us to write asynchronous tests and will automatically wait for all asynchronous operations to complete before making assertions.

  it('should show username after hitting API - using waitForAsync', waitForAsync(() => {
    const buttonEl = el.query(By.css('.api-class')).nativeElement;
    buttonEl.click();

    // whenStable is a method of the ComponentFixture that returns a promise that resolves when all asynchronous tasks, such as microtasks or timers, have been completed. It is used in conjunction with waitForAsync to ensure that the test waits for all asynchronous operations to finish before making assertions.

    fixture.whenStable().then(() => {
      expect(component.username).toBe('Leanne Graham');
    });
  }));
});
