import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { graphql } from './graphql';
import { GraphqlClient } from './services/graphql-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<div>
    <h1>Hello</h1>
  </div>`,
})
export class AppComponent implements OnInit {
  private readonly graphqlClient = inject(GraphqlClient);

  public ngOnInit(): void {
    this.graphqlClient.request({ query: graphql() });
  }
}
