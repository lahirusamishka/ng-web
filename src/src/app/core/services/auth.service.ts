import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import * as moment from "moment";
import "rxjs/add/operator/delay";
import { of, Observable, BehaviorSubject } from "rxjs";
import { RuntimeEnvLoaderService } from "./runtime-env-loader.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private _loginStatus: BehaviorSubject<boolean>;
  constructor(
    private envLoader: RuntimeEnvLoaderService,
    private http: HttpClient,
    @Inject("LOCALSTORAGE") private localStorage: Storage
  ) {
    //   var user =JSON.parse(localStorage.getItem('currentUser'))
    // const loginStatus = user.token;
    // this._loginStatus = new BehaviorSubject<boolean>(!!loginStatus);
    // const userJson = localStorage.getItem('currentUser');
    // if (!userJson) {
    //     this._authUser = new BehaviorSubject<any>(null);
    //     return;
    // }
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const loginStatus = user.token;
    this._loginStatus = new BehaviorSubject<boolean>(!!loginStatus);
  }

  getUserRoles(): any[] {
    const json = localStorage.getItem("currentUser");
    if (!json) {
      return [];
    }
    return JSON.parse(json).userRole;
  }

  isLoggedIn(): Observable<boolean> {
    return this._loginStatus.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiPath("/login"), { email, password }).pipe(
      tap((data) => {
        this.localStorage.setItem(
          "currentUser",
          JSON.stringify({
            token: data.token,
            isAdmin: true,
            email: data.user.email,
            id: data.user.user_id,
            alias: String(data.user.email).split("@")[0],
            expiration: moment().add(7, "days").toDate(),
            fullName: data.user.user_name,
            userRole: data.user.user_role,
            address: data.user.address,
            status: data.user.status,
          })
        );
        this._loginStatus.next(true);
        return true;
      })
    );
  }

  logout(): void {
    this.localStorage.removeItem("currentUser");
  }

  getCurrentUser(): any {
    return JSON.parse(this.localStorage.getItem("currentUser"));
  }

  passwordResetRequest(email: string) {
    return of(true).delay(1000);
  }

  changePassword(email: string, currentPwd: string, newPwd: string) {
    return of(true).delay(1000);
  }

  passwordReset(
    email: string,
    token: string,
    password: string,
    confirmPassword: string
  ): any {
    return of(true).delay(1000);
  }

  private apiPath(path): string {
    return (
      this.envLoader.env.API_BASE_URL + "/" + this.envLoader.env.APP_KEY + path
    );
  }
}
