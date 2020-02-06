import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Client';
  constructor(private readonly apollo: Apollo) { }

  books$: Observable<any>;

  ngOnInit(): void {
    this.books$ = this.apollo.query<any>({
      query: gql`
      query books {
        books {
          totalCount
          results {
            id
            title
          }
        }
      }
      `
    }).pipe(map(result => result));
  }
}
