import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { CommentsService } from '../../services/comments.service';

describe('CommentComponent', () => {
  let commentSrv: jasmine.SpyObj<CommentsService>;
  let fixture: ComponentFixture<CommentComponent>; // ComponentFixture is a wrapper around the component and its template. It provides access to the component instance and allows us to interact with the component's template and trigger change detection.
  let component: CommentComponent; // This variable will hold the instance of the CommentComponent that we will be testing. We will use this variable to call methods and access properties of the component in our test cases.

  beforeEach(async () => {
    const commSpy = jasmine.createSpyObj('CommentsService', [
      'getAllComments',
      'postComment',
    ]);
    // await is used to wait for the asynchronous operations to complete before proceeding with the test.
    // In this case, it waits for the TestBed configuration and component compilation to finish before running the tests.
    await TestBed.configureTestingModule({
      imports: [CommentComponent],
      providers: [
        {
          provide: CommentsService,
          useValue: commSpy,
        },
      ],
    }).compileComponents(); // compileComponents is used to compile the component and its template. It is necessary when the component has external templates or styles. It returns a promise that resolves when the compilation is complete.

    commentSrv = TestBed.inject(
      CommentsService,
    ) as jasmine.SpyObj<CommentsService>;

    fixture = TestBed.createComponent(CommentComponent); // createComponent is used to create an instance of the component and its template. It returns a ComponentFixture that allows us to interact with the component and its template in our tests.
    component = fixture.componentInstance; // componentInstance is a property of the ComponentFixture that gives us access to the instance of the component that was created. We can use this variable to call methods and access properties of the component in our test cases.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input and button elements', () => {
    const inputEl = fixture.nativeElement.querySelector('input');
    const buttonEl = fixture.nativeElement.querySelector('button');
    const h1El = fixture.nativeElement.querySelector('h1').innerText;
    expect(h1El).toBe("welcome to comments section");
    expect(inputEl).withContext("Input element should be present").toBeTruthy();
    expect(buttonEl).withContext("Button element should be present").toBeTruthy();
  });
});
