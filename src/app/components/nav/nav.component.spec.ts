import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { routes } from '../../app.routes';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;
  let component: NavComponent;
  let router: Router;
  let linkDes: any[];
  let routerLinks: RouterLink[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavComponent],
      providers: [
        provideRouter(routes),
        {
          provide: ComponentFixtureAutoDetect, // Instead of manually calling fixture.detectChanges(), we can provide ComponentFixtureAutoDetect with a value of true.
          useValue: true,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 router links', () => {
    expect(routerLinks.length).toBe(2);
    expect(routerLinks[0].href).toBe('/');
    expect(routerLinks[1].href).toBe('/about');
  });

  it('should have default route of home', () => {
    expect(router.url).toBe('/');
  });

  it('should navigate to about on click', fakeAsync(() => {
    const aboutLinkDe = linkDes[1];

    /* For debugElement triggerEventHandler is used to trigger an event handler on the element. It takes two arguments: the name of the event to trigger and an optional event object that can be passed to the event handler.
    In this case, we are triggering a click event on the aboutLinkDe element, which is the DebugElement for the about link in the NavComponent. The event object we are passing has a button property set to 0, which indicates that it is a left-click event.
    */

    aboutLinkDe.triggerEventHandler('click', { button: 0 });
    tick(); // flush we can also use here.
    expect(router.url).toBe('/about');
  }));
});

/*
    Infront of it, if we add f then only that test case will run and the rest of the test cases will be ignored. 
    Similarly, if we add x infront of it, then that test case will be ignored and the rest of the test cases will run.
    Same if we add f for describe block, then only that describe block will run and the rest of the describe blocks will be ignored.
    Similarly, if we add x for describe block, then that describe block will be ignored and the rest of the describe blocks will run.
*/


