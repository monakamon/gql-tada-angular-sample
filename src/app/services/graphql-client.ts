import { inject, Injectable } from '@angular/core';
import { print } from 'graphql';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";
import {TypedDocumentNode} from "@graphql-typed-document-node/core";

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

  public request<Result = unknown, Variables = unknown>(param: {
    url: string;
    query: TypedDocumentNode<Result, Variables>;
    variables?: Variables;
    options?: HttpClientOptions,
  }): Observable<Result> {
    return this.httpClient
      .post<{ data: Result }>(param.url, {
        ...param.options,
        body: {
          query: print(param.query),
          variables: param.variables ?? {},
        },
      })
      .pipe(
        map((d) => {
          return d.data;
        })
      );
  }
}
