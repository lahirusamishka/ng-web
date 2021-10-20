import { LoanServiceService } from "src/app/core/services/loan-service.service";
import { MatSort } from "@angular/material/sort";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatCheckboxChange,
  MatDialog,
  MatPaginator,
  MatTableDataSource,
} from "@angular/material";
import { forkJoin } from "rxjs";
import { ConfirmationDialog } from "src/app/confirmation-dialog.component";

@Component({
  selector: "app-approve",
  templateUrl: "./approve.component.html",
  styleUrls: ["./approve.component.css"],
})
export class ApproveComponent implements OnInit {
  dataSource;
  displayedColumns;
  inputData;

  addCheckBox = true;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  actualPaginator: MatPaginator;

  selected3 = [];

  constructor(
    private dialog: MatDialog,
    private loanService: LoanServiceService
  ) {}

  ngOnInit() {

    this.loadTableData();
  }

  loadTableData() {
    var search = {
      search: null,
    };

    this.loanService.getAllLoans(search).subscribe((res) => {
      console.log(res);
      var arrayList = [];
      res.forEach((data) => {
        var obj = {
          id: data.id,
          first_name:
            this.checkNull(data.borrower.title) +
            " " +
            this.checkNull(data.borrower.first_name) +
            " " +
            this.checkNull(data.borrower.middle_name) +
            " " +
            this.checkNull(data.borrower.last_name),
          city: data.borrower.address1 + "_" + data.borrower.city,
          disbursed: this.checkNull(data.borrower.disbursed),
          dob: this.checkNull(data.borrower.dob),
          email: this.checkNull(data.borrower.email),
          interest: this.checkNull(data.borrower.interest),
          loan_product: this.checkNull(data.borrower.loan_product),
          mobile: this.checkNull(data.borrower.mobile),
          postal_code: this.checkNull(data.borrower.postal_code),
          working_status: this.checkNull(data.borrower.working_status),
          edit: " ",
        };
        arrayList.push(obj);
      });

      this.inputData = arrayList;

      if (this.inputData) {
        if (this.addCheckBox) {
          this.dataSource = [];
          var array = [];
          this.inputData.forEach((data, index) => {
            array[index] = { ...{ All: "" }, ...data };
          });
          this.inputData = array;
          this.dataSource = new MatTableDataSource(array);
        } else {
          this.dataSource = new MatTableDataSource(this.inputData);
        }
        if (this.inputData[0]) {
          this.displayedColumns = Object.keys(this.inputData[0]);
        }
        this.dataSource.sort = this.sort;
      }
    });
  }

  checkNull(value) {
    if (value == "" || value == "  ") {
      return "_";
    } else {
      return value;
    }
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.actualPaginator;
  }

  createNewBorrower() {
    console.log("create ");
  }

  print() {
    console.log(this.selected3);
  }

  toggle(item, event: MatCheckboxChange) {
    if (event.checked) {
      this.selected3.push(item);
    } else {
      const index = this.selected3.indexOf(item);
      if (index >= 0) {
        this.selected3.splice(index, 1);
      }
    }
  }

  exists(item) {
    return this.selected3.indexOf(item) > -1;
  }

  isIndeterminate() {
    return this.selected3.length > 0 && !this.isChecked();
  }

  isChecked() {
    return this.selected3.length === this.inputData.length;
  }

  toggleAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.inputData.forEach((row) => {
        // console.log('checked row', row);
        this.selected3.push(row);
      });

      // console.log('checked here');
    } else {
      // console.log('checked false');
      this.selected3.length = 0;
    }
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: "Are you sure want to delete?",
        buttonText: {
          ok: "Yes",
          cancel: "No",
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        let subsArray = [];
        this.selected3.forEach((e) => {
          console.log(e.id);

          subsArray.push(this.loanService.deleteBorrower(Number(e.id)));
        });
        forkJoin(subsArray).subscribe((results) => {
          console.log(results);
        });
      }
    });
  }
}
