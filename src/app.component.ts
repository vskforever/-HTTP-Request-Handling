import { Component, OnInit } from '@angular/core';
import { MyService } from './my-service.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>{{ title }}</h1>
      <div *ngIf="errorMessage" style="color: red;">
        <p>Error: {{ errorMessage }}</p>
      </div>
      <button (click)="sortPosts()">Sort Posts by Title</button>
      <ul *ngIf="posts.length">
        <li *ngFor="let post of posts">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
      <p *ngIf="!posts.length && !errorMessage">Loading...</p>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HTTP Service Example';
  posts: any[] = [];
  errorMessage: string = '';

  constructor(private myService: MyService) {}

  ngOnInit(): void {
    this.myService.getData().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  sortPosts(): void {
    this.posts.sort((a, b) => a.title.localeCompare(b.title));
  }
}
