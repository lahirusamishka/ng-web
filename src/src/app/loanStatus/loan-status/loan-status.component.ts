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
  constructor() {}

  ngOnInit() {}

  refreshLoan() {
    // this.loading=true;

    this.loading = false;
  }
}
