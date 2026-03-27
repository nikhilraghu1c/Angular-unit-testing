import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { CommentsService } from './comments.service';
import { API_URL } from '../utils/resources';
import COMMENTS_DATA from '../../../db.json';

describe('CommentsService', () => {
  let commentsSrv: CommentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    commentsSrv = TestBed.inject(CommentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // afterEach is a Jasmine function that runs after each test case (it block) in the describe block.
  // It is used to clean up the test environment and perform any necessary teardown operations after each test case has been executed.
  afterEach(() => {
    httpTestingController.verify(); // Verify that there are no outstanding requests after each test case
  });

  it('should give all comments', () => {
    commentsSrv.getAllComments().subscribe((allComments: any) => {
      expect(allComments).toBeTruthy(); // Assert that the response is not null or undefined
      expect(allComments.length).toBe(2); // Assert that the response contains the expected number of comments
    });
    // Expect that a single request has been made to the specified URL and return its mock.
    const req = httpTestingController.expectOne(`${API_URL}/comments`);

    // Assert that the request is a GET request.
    expect(req.request.method).toBe('GET');

    // Respond with mock data (an array of comments).
    req.flush(COMMENTS_DATA.comments.slice(0, 2)); // Assuming we want to return the first 2 comments as mock data
  });

  it('should give comment by id', () => {
    const commentId = "1";
    commentsSrv.getCommentById(Number(commentId)).subscribe((comment: any) => {
      expect(comment).toBeTruthy();
      expect(comment.id).toBe(commentId);
      expect(comment.text).toBe('a comment about post 1');
    });

    // commentsSrv.getCommentById(Number(commentId)).subscribe((comment: any) => {
    //   expect(comment.text).toBe('a comment about post 1');
    // });

    const req = httpTestingController.expectOne(
      `${API_URL}/comments/${commentId}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(COMMENTS_DATA.comments[0]); // Respond with the comment that matches the specified id

    // httpTestingController.verify(); // Verify that there are no outstanding requests, only one request should have been made in this test case
  });

  it('should post a comment', () => {
    const newComment = { id: 3, text: 'a comment about post 2' };
    commentsSrv.postComment(newComment).subscribe((response: any) => {
        expect(response).toBeTruthy();
        expect(response.id).toBe(newComment.id);
        expect(response.text).toBe(newComment.text);
    });

    const req = httpTestingController.expectOne(`${API_URL}/comments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ id: 3, text: 'a comment about post 2' });
    req.flush({ id: 3, text: 'a comment about post 2' }); // Respond with the newly created comment
  });

  it("should give error if post a comments fails", () => {
    const newComment = { id: 3, text: 'a comment about post 2' };
    commentsSrv.postComment(newComment).subscribe({
      next: () => {
        // This block should not be executed
        fail('Expected an error, but got a successful response');
      },
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(500); // Assuming the server returns a 500 status code for errors
      },
    });

    const req = httpTestingController.expectOne(`${API_URL}/comments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newComment);
    req.flush('Error posting comment', { status: 500, statusText: 'Server Error' });
  });

});
