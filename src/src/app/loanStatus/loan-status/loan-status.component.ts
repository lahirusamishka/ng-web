import { LoanServiceService } from "src/app/core/services/loan-service.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loan-status",
  templateUrl: "./loan-status.component.html",
  styleUrls: ["./loan-status.component.css"],
})
export class LoanStatusComponent implements OnInit {
  loading: boolean;
  userId: any;
  allInstallment: any[];

  borrower: any;
  loanObj: any;
  installment: any;

  constructor(private loanService: LoanServiceService) {}

  ngOnInit() {
    this.userId = this.loanService.getLogUserId();
    this.getAllInstallment();
  }

  getAllInstallment() {
    this.loanService.getAllLoans({ search: null }).subscribe((res) => {
      res.forEach((element) => {
        if (this.userId == element.borrower.userId) {
          this.loanObj = element;
          var data = {
            loanamount: element.principalAmount,
            loanterm: element.loanDuration,
            interestrate: element.loanInterestAmount,
          };

          this.loanService.getInstallmetAmount(data).subscribe((res1) => {
            this.installment = res1;
          });
        }
      });
    });

    this.loanService.getAllInstallment().subscribe((res) => {
      var newArray = [];
      res.forEach((element) => {
        if (this.loanObj.borrower.id == element.userId) {
          newArray.push(element);
        }
      });
      console.log(newArray);
      
      this.allInstallment = newArray;
    });
  }
  refreshLoan() {
    // this.loading=true;
    this.loading = false;
  }
}
