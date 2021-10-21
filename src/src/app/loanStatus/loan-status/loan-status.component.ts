import { LoanServiceService } from "src/app/core/services/loan-service.service";
import { Component, OnInit } from "@angular/core";
export interface PeriodicElement {
  position: number;
  amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, amount: "H" },
  { position: 2, amount: "He" },
  { position: 3, amount: "Li" },
  { position: 4, amount: "Be" },
  { position: 5, amount: "B" },
  { position: 6, amount: "C" },
  { position: 7, amount: "N" },
  { position: 8, amount: "O" },
  { position: 9, amount: "F" },
  { position: 10, amount: "Ne" },
];

@Component({
  selector: "app-loan-status",
  templateUrl: "./loan-status.component.html",
  styleUrls: ["./loan-status.component.css"],
})
export class LoanStatusComponent implements OnInit {
  loading: boolean;
  displayedColumns: string[] = ["position", "amount"];
  dataSource = ELEMENT_DATA;
  userId: any;
  allInstallment: any[];

  borrower: any;

  constructor(private loanService: LoanServiceService) {}

  ngOnInit() {
    this.getAllInstallment();
    const user = JSON.parse(localStorage.getItem("currentUser"));
    this.userId = user.id;
  }

  getAllInstallment() {
    this.loanService.getAllBorrower().subscribe((res) => {
      var array;
      res.forEach((element) => {
        console.log(element.userId);

        if (this.userId == element.userId) {
          
          this.borrower = element;
          console.log(this.borrower);
        }
      });
    });

    this.loanService.getAllInstallment().subscribe((res) => {
      
      
      
      var newArray = [];

      res.forEach((element) => {
        if (this.borrower.userId == element.id) {
          newArray.push(element);
        }
      });
      this.allInstallment = newArray;

      console.log(this.allInstallment);
    });
  }
  refreshLoan() {
    // this.loading=true;

    this.loading = false;
  }
}
