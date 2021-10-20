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
  userSave(data): Observable<any> {
    return this.http.post(this.apiPath("/save"), data).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  usermail(data): Observable<any> {
    return this.http.post(this.apiPath("/sendmail"), data).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  
  userpay(data): Observable<any> {
    return this.http.post(this.apiPath("/sendpay"), data).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  userPayemnt(data): Observable<any> {
    return this.http.post(this.apiPath("/payment/save"), data).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  getInstallmetAmount(data): Observable<any> {
    return this.http.post(this.apiPath("/intrestCal"), data).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  
  saveLoan(data): Observable<any> {
    return this.http.post(this.apiPath("/cusloan"), data).pipe(
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

  getUserById(userId): Observable<any> {
    return this.http.get(this.apiPath("/find/" + userId)).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  
  userDelete(id): Observable<any> {
    return this.http.delete(this.apiPath("/delete/" + id)).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  deleteBorrower(id): Observable<any> {
    return this.http.delete(this.apiPath("/borrower/" + id)).pipe(
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

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiPath("/all")).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  getAllWorkingStatus(): Observable<any> {
    return this.http.get(this.apiPath("/workingstatus")).pipe(
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
  borrowerGetByNewId(userId): Observable<any> {
    return this.http.get(this.apiPath("/borrower/new/" + userId)).pipe(
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
