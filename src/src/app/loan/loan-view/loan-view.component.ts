import { ActivatedRoute } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatCheckboxChange,
  MatDialog,
  MatPaginator,
  MatTableDataSource,
} from "@angular/material";
import { LoanServiceService } from "src/app/core/services/loan-service.service";
import { ConfirmationDialog } from "src/app/confirmation-dialog.component";
import { forkJoin } from "rxjs";
import { Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-loan-view",
  templateUrl: "./loan-view.component.html",
  styleUrls: ["./loan-view.component.css"],
})
export class LoanViewComponent implements OnInit {
  dataSource;
  displayedColumns;
  inputData;
  loanForm: FormGroup;
  Installemtfrom: FormGroup;

  addCheckBox = true;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  actualPaginator: MatPaginator;

  selected3 = [];
  loanId: any;
  loanObj: any;
  loanUserId: any;
  gObj: any;
  installment: any;
  allInstallment=[];
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "250px",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  constructor(
    private dialog: MatDialog,
    private loanService: LoanServiceService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((result) => {
      this.loanId = result.id;
    });
  }

  ngOnInit() {
    this.loadTableData();
    this.getLoanData();
    this.getGaranter();
    this.getAllInstallment();
    this.loanForm = new FormGroup({
      date: new FormControl(""),
      amount: new FormControl(""),
    });
    this.Installemtfrom = new FormGroup({
      loanamount: new FormControl(""),
      loanterm: new FormControl(""),
      interestrate: new FormControl(""),
    });
    
  }
  getAllInstallment() {
    this.loanService.getAllInstallment().subscribe(res=>{
      this.allInstallment=res;
      
    })
  }
  getGaranter() {
    this.loanService.getAllGuarantor().subscribe((res) => {
      res.forEach((element) => {
        if (element.userId == this.loanUserId) {
          console.log(element);
          this.gObj = element;
        }
      });
    });
  }
  getLoanData() {
    this.loanService.getAllBorrower().subscribe((res) => {
      res.forEach((element) => {
        if (element.id == this.loanId) {
          this.loanUserId = element.userId;
          this.loanObj = element;
        }
      });
    });
  }

  checkMothInstallemt() {
    console.log(this.Installemtfrom.value);
    this.loanService
      .getInstallmetAmount(this.Installemtfrom.value)
      .subscribe((res) => {
        this.installment = res;
      });
  }

  loanSave() {
    console.log("sdsd");
    
    var data = {
      installment: this.Installemtfrom.value,
      guarantorId: this.gObj.id,
      borrowerId: this.loanObj.id,
      userId:this.loanUserId
    };

    this.loanService.saveLoan(data).subscribe((res) => {
      console.log(res);

      var data = {
        username: "new",
        name: "congratulations",
        data: "your loan is approved. check here more details ->" + "http://localhost:4200/",
        email: "lahirusamishka@gmail.com",
      };
      this.loanService.usermail(data).subscribe(res=>{
        console.log(res);
      })
    });
    
  }

  sendMail() {}

  addPayment() {
    var data = {
      repaymentAmount: this.loanForm.get("amount").value,
      repaymentMethod: "installment",
      collectionDate: this.loanForm.get("date").value,
      CollectedBorrower: this.loanObj.id,
      loan: this.gObj.id,
    };

    this.loanService.userPayemnt(data).subscribe((res) => {
      console.log(res);
    });
  }

  loadTableData() {
    console.log("cccc");

    this.loanService.getAllInstallment().subscribe((res) => {
      console.log(res);
      var arrayList = [];
      res.forEach((data) => {
        var obj = {
          id: data.id,
          first_name:
            this.checkNull(data.title) +
            " " +
            this.checkNull(data.first_name) +
            " " +
            this.checkNull(data.middle_name) +
            " " +
            this.checkNull(data.last_name),
          city: data.address1 + "_" + data.address2,
          disbursed: this.checkNull(data.disbursed),
          dob: this.checkNull(data.dob),
          email: this.checkNull(data.email),
          interest: this.checkNull(data.interest),
          loan_product: this.checkNull(data.loan_product),
          mobile: this.checkNull(data.mobile),
          postal_code: this.checkNull(data.postal_code),
          working_status: this.checkNull(data.working_status),
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
@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview-example-dialog.html",
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
