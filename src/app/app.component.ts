import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentComponent } from './components/comment/comment.component';
import { UserComponent } from './components/user/user.component';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-new-prep';
}

/**
 * To generate code coverage , use command  ng test --no-watch --code-coverage
 * After running the above command, a new folder named coverage will be created in the root directory of the project. Inside the coverage folder, there will be an index.html file that you can open in a web browser to view the code coverage report.
 * --no-watch flag is used to run the tests only once and then exit, instead of keeping the test runner active and watching for file changes. This is useful when you want to generate a code coverage report without continuously running the tests.
 */
