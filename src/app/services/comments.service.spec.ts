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
});
