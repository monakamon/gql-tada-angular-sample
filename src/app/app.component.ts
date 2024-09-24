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
    <h1>Hello Pikachu</h1>
    @let pikachuImageUrl = $pikachuImageUrl();
    @if (pikachuImageUrl !== null) {
      <img
        alt="image"
        width="100"
        height="100"
        priority
        [ngSrc]="pikachuImageUrl" />
    }
    @if ($pikachuInfoStr() !== null) {
      <pre>{{ $pikachuInfoStr() }}</pre>
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
            attacks {
              fast {
                damage
                name
                type
              }
              special {
                damage
                name
                type
              }
            }
          }
        }
      `),
      variables: {
        name: 'pikachu',
      },
    }),
    { initialValue: null }
  );

  public readonly $pikachuImageUrl = computed<string | null>(() => {
    return this.$pikachuInfo()?.pokemon?.image ?? null;
  });

  public readonly $pikachuInfoStr = computed(() => {
    if (this.$pikachuInfo() === null) {
      return null;
    }
    return JSON.stringify(this.$pikachuInfo(), null, 2);
  });
}
