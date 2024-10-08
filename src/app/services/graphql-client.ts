import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface HttpClientOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  context?: HttpContext;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  observe?: any;
  params?:
    | HttpParams
    | Record<
        string,
        string | number | boolean | readonly (string | number | boolean)[]
      >;
  reportProgress?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseType?: any;
  withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' })
export class GraphqlClient {
  private readonly httpClient = inject(HttpClient);

  public readonly request = <Result = unknown, Variables = unknown>(param: {
    url: string;
    query: TypedDocumentNode<Result, Variables>;
    variables?: Variables;
    options?: HttpClientOptions;
  }): Observable<Result> => {
    return this.httpClient
      .post<{ data: Result }>(
        param.url,
        {
          query: print(param.query),
          variables: param.variables ?? {},
        },
        param.options
      )
      .pipe(
        map((d) => {
          return d.data;
        })
      );
  };
}
