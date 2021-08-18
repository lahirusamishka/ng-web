import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RuntimeEnvLoaderService {
  env: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http
      .get('/assets/env.json', { headers: { 'X-SKip-Intercept': 'true' } })
      .toPromise()
      .then((env) => {
        this.env = env;
        return true;
      });
  }

  get config() {
    return this.env;
  }
}
