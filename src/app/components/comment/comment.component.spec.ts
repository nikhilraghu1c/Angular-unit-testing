import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { CommentsService } from '../../services/comments.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('CommentComponent', () => {
  let commentSrv: jasmine.SpyObj<CommentsService>;
  let fixture: ComponentFixture<CommentComponent>; // ComponentFixture is a wrapper around the component and its template. It provides access to the component instance and allows us to interact with the component's template and trigger change detection.
  let component: CommentComponent; // This variable will hold the instance of the CommentComponent that we will be testing. We will use this variable to call methods and access properties of the component in our test cases.
  let el: DebugElement; // DebugElement wrapper for DOM element access and manipulation in tests. Provides Angular-specific methods to query and interact with DOM elements.

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

    el = fixture.debugElement; // debugElement is a property of the ComponentFixture that provides access to the DebugElement, which is a wrapper around the native DOM element. It allows us to query and interact with the DOM elements in our tests using Angular-specific methods.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input and button elements', () => {
    const inputEl = fixture.nativeElement.querySelector('input');
    const buttonEl = fixture.nativeElement.querySelector('button');
    // const h1El = fixture.nativeElement.querySelector('h1').innerText;
    // Alternative way for above code to access the h1 element using DebugElement and By.css selector
    const h1El = el.query(By.css('h1')).nativeElement.innerText;
    expect(h1El).toBe('welcome to comments section');
    expect(inputEl).withContext('Input element should be present').toBeTruthy();
    expect(buttonEl)
      .withContext('Button element should be present')
      .toBeTruthy();
  });

  it('should load comment on init', () => {
    const mockComments = [
      { id: 1, text: 'comment 1' },
      { id: 2, text: 'comment 2' },
    ];

    // Setting up the mock response for the getAllComments method of comment service to return an observable of the mockComments array when it is called during the component's initialization (ngOnInit). and.returnValue is used to specify the value that should be returned when the getAllComments method of the commentSrv spy is called.
    commentSrv.getAllComments.and.returnValue(of(mockComments));

    // detectChanges is used to trigger change detection in the component. It is necessary to call this method after setting up the mock response to ensure that the component's template is updated with the new data.
    fixture.detectChanges();
    expect(component.allComments.length).toBe(2);
    expect(el.queryAll(By.css('li')).length).toBe(2);
  });

  it('should throw alert if comment text is empty', () => {
    spyOn(window, 'alert'); // Spy on the global alert function to check if it is called when the comment text is empty.
    component.text = '';
    component.handleSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please add a comment');
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(commentSrv.postComment).not.toHaveBeenCalled(); // Check that the postComment method of the comment service was not called when the comment text is empty.
  });

  it('should add comment on UI when user types and click on post button', () => {
    // Setting up the mock response for the getAllComments method of comment service to return an observable of the mockComments array when it is called during the component's initialization (ngOnInit). and.returnValue is used to specify the value that should be returned when the getAllComments method of the commentSrv spy is called.
    const mockComments = [
      { id: 1, text: 'comment 1' },
      { id: 2, text: 'comment 2' },
    ];
    commentSrv.getAllComments.and.returnValue(of(mockComments));
    fixture.detectChanges();

    // Setting up the mock response for the postComment method of comment service to return an observable of the new comment when it is called during the handleSubmit method. and.returnValue is used to specify the value that should be returned when the postComment method of the commentSrv spy is called.
    const newComment = { id: 3, text: 'Nice pic' };
    commentSrv.postComment.and.returnValue(of(newComment));
    spyOn(Date, 'now').and.returnValue(3);

    // simulate user typing a comment
    const inputEl: HTMLInputElement =
      fixture.nativeElement.querySelector('Input');
    inputEl.value = newComment.text;
    inputEl.dispatchEvent(new Event('input')); // Manually trigger the input event to update the component's text property with the new value.

    const buttonEl: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    buttonEl.click(); // Simulate a click event on the post button to trigger the handleSubmit method of the component.
    
    fixture.detectChanges(); // Trigger change detection to update the component's template with the new comment.
    const commentEl = el.queryAll(By.css('li')); 
    expect(commentEl.length).toBe(3);
    expect(commentEl[2].nativeElement.innerText).toBe(newComment.text);
    expect(commentSrv.postComment).toHaveBeenCalledWith({ id: 3, text: 'Nice pic' }); // Check that the postComment payload was correct or not.
  });
});

/* can we use spyOn for any other method of the component? Yes, we can use spyOn to spy on any method of the component. For example, we can spy on the loadComments method to check if it is called when a new comment is posted successfully. We can do this by adding the following code in the test case for posting a comment:
spyOn(component, 'loadComments'); // Spy on the loadComments method of the component
component.handleSubmit(); // Call the handleSubmit method to post a comment
expect(component.loadComments).toHaveBeenCalled(); // Check if the loadComments method was called after posting a comment successfully
it will fail we are not calling the loadcomments method in the handleSubmit method. */
