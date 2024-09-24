import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { graphql } from '../graphql';
import { GraphqlClient } from './services/graphql-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage],
  template: ` <div>
    <h1>Hello</h1>
    <pre>{{ $pikachuInfoStr() }}</pre>
    @let pikachuImageUrl = $pikachuImageUrl();
    @if (pikachuImageUrl !== null) {
      <img
        alt="image"
        width="100"
        height="100"
        priority
        [ngSrc]="pikachuImageUrl" />
    }
  </div>`,
})
export class AppComponent {
  private readonly graphqlClient = inject(GraphqlClient);
  private readonly domSanitizer = inject(DomSanitizer);

  public readonly $pikachuInfo = toSignal(
    this.graphqlClient.request({
      url: 'https://graphql-pokemon2.vercel.app',
      query: graphql(`
        query searchPokemon($name: String) {
          pokemon(name: $name) {
            number
            name
            image
          }
        }
      `),
      variables: {
        name: 'pikachu',
      },
    }),
    { initialValue: null }
  );

  public readonly $pikachuImageUrl = computed(() => {
    return this.$pikachuInfo()?.pokemon?.image ?? null;
  });

  public readonly $pikachuInfoStr = computed(() => {
    return JSON.stringify(this.$pikachuInfo(), null, 2);
  });
}
