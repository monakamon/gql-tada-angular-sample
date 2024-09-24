import { inject, Injectable } from '@angular/core';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";

type HttpClientOptions = {
  headers?:
    | HttpHeaders
    | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: any;
  params?:
    | HttpParams
    | {
    [param: string]:
      | string
      | number
      | boolean
      | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
};

@Injectable({ providedIn: 'root' })
export class GraphqlClient {
  private readonly httpClient = inject(HttpClient);

  constructor() {
  }

  public query<Result = unknown, Variables = unknown>(options: {
    url: string;
    options?: HttpClientOptions,
  }): Observable<Result> {
    return this.httpClient
      .post<{ data: Result }>('POST', options.url, {
        body: {
          query: print(options.query),
          variables: options.variables ?? {},
        },
        ...options.requestOptions,
      })
      .pipe(
        map((d) => {
          return d.data;
        })
      );
  }
}
