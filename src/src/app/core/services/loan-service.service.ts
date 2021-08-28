import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RuntimeEnvLoaderService } from "./runtime-env-loader.service";

@Injectable({
  providedIn: "root",
})
export class LoanServiceService {

  constructor(
    private http: HttpClient,
    private envLoader: RuntimeEnvLoaderService
  ) {}

  borrowerSave(data): Observable<any> {
    return this.http.post(this.apiPath("/borrower"), data).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  
  guarantorSave(data): Observable<any> {
    return this.http.post(this.apiPath("/guarantor"), data).pipe(
      tap((data) => {
        return data;
      })
    );
  }



  checkUserOldApplication(userId): Observable<any> {
    return this.http.get(this.apiPath("/borrower/" + userId)).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  borrowerGetById(userId): Observable<any> {
    return this.http.get(this.apiPath("/borrower/data/" + userId)).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  
  getAllBorrower(): Observable<any> {
    return this.http.get(this.apiPath("/borrower")).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  getAllLoanProduct(): Observable<any> {
    return this.http.get(this.apiPath("/loanoproduct")).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  getAllInterstMethods(): Observable<any> {
    return this.http.get(this.apiPath("/intrestmethod")).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  getAllGuarantor(): Observable<any> {
    return this.http.get(this.apiPath("/guarantor")).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  
  checkUserOldguarantorApplication(userId): Observable<any> {
    return this.http.get(this.apiPath("/guarantor/" + userId)).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  
  guarantorGetById(userId): Observable<any> {
    return this.http.get(this.apiPath("/guarantor/data/" + userId)).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  getLogUserId() {
    const json = localStorage.getItem("currentUser");
    return JSON.parse(json).id;
  }

  private apiPath(path): string {
    return (
      this.envLoader.env.API_BASE_URL + "/" + this.envLoader.env.APP_KEY + path
    );
  }
}
