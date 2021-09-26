import { forkJoin } from "rxjs";
import { MatSort } from "@angular/material/sort";
import { MyExportService } from "./../core/services/print/my-export.service";
import { LoanServiceService } from "./../core/services/loan-service.service";
import { NotificationService } from "./../core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import SignaturePad from "signature_pad";
import {
  MatPaginator,
  MatDialog,
  MatTableDataSource,
  MatCheckboxChange,
} from "@angular/material";
import { ConfirmationDialog } from "../confirmation-dialog.component";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"],
})
export class CreateUserComponent implements OnInit {
  dataSource;
  displayedColumns;
  inputData;

  addCheckBox = true;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  actualPaginator: MatPaginator;

  selected3 = [];

  requestForm: FormGroup;
  loading: boolean;
  userId: string;

  InterstMethods = [];

  signatureImg: string;
  signaturePad: SignaturePad;
  @ViewChild("canvas", { static: false }) canvasEl: ElementRef;
  allUsers: any;
  workingStatus: any;
  selectedUser: any;

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private loanService: LoanServiceService,
    private printService: MyExportService,
    private dialog: MatDialog
  ) {}

  startDrawing(event: Event) {
    this.loading = false;
  }

  saveSign() {
    console.log(this.signatureImg);
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    if (this.signatureImg) {
      this.loading = false;
    }
  }

  clearPad() {
    this.signaturePad.clear();
    this.loading = true;
  }

  ngOnInit() {
    this.getAllUsers();
    // this.titleService.setTitle("easyloan - request");
    this.createForm();
    this.userId = this.loanService.getLogUserId();
    this.checkIsHaveApplication();
  }

  getAllUsers() {
    console.log("cccc");

    this.loanService.getAllUsers().subscribe((res) => {
      console.log(res);
      var arrayList = [];
      res.forEach((data) => {
        var obj = {
          id: data.user_id,
          status: data.status,
          address: data.address,
          user_name: data.user_name,
          email: this.checkNull(data.email),
          user_role: data.user_role,
          edit: " ",
        };
        arrayList.push(obj);
      });

      this.inputData = arrayList.reverse();

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

  checkIsHaveApplication() {
    this.loanService.checkUserOldApplication(this.userId).subscribe((res) => {
      if (res != null) {
        console.log(res);
        this.fillTheBorrowerData(res);
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

          subsArray.push(this.loanService.userDelete(Number(e.id)));
        });
        forkJoin(subsArray).subscribe((results) => {
          console.log(results);
        },(error) => {
          if (error.error == "deleted") {
            this.getAllUsers();
            this.notificationService.openSnackBar("User deleted");
          }
          this.loading = false;
        });
      }
    });
  }

  clear(){
    this.requestForm.reset();
  }

  fillTheBorrowerData(data) {
    // this.requestForm.get("address1").setValue(data.address1),
    //   this.requestForm.get("address2").setValue(data.address2),
    //   this.requestForm.get("city").setValue(data.city),
    //   this.requestForm.get("description").setValue(data.description),
    //   this.requestForm.get("disbursed").setValue(data.disbursed),
    //   this.requestForm.get("dob").setValue(new Date(data.dob)),
    //   this.requestForm.get("email").setValue(data.email),
    //   this.requestForm.get("first_name").setValue(data.first_name),
    //   this.requestForm.get("interest").setValue(data.interest),
    //   this.requestForm.get("last_name").setValue(data.last_name),
    //   this.requestForm.get("middle_name").setValue(data.middle_name),
    //   this.requestForm.get("mobile").setValue(data.mobile),
    //   this.requestForm.get("postal_code").setValue(data.postal_code),
    //   this.requestForm.get("state").setValue(data.state);
    // this.requestForm.get("working_status").setValue(data.working_status);
    // this.requestForm.get("title").setValue(data.title);
    // this.requestForm.get("gender").setValue(data.gender);
    // this.signaturePad.fromDataURL("data:image/jpeg;base64," + data.image);
  }

  private createForm() {
    this.requestForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      name: new FormControl("", [Validators.required]),
      role: new FormControl("customer", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      password1: new FormControl("", [Validators.required]),
      password2: new FormControl("", [Validators.required]),
    });
  }

  printPdf() {
    this.printService.PrintBorrower(this.requestForm.value);

    // var element = document.getElementById("test");
    // var options = {
    //   filename: "test.pdf",
    // };
    // domToPdf(element, options, function () {
    //   console.log("done");
    // });
  }

  editAction(data) {
    console.log("aaa");

    this.loanService.getUserById(data.id).subscribe((res) => {
      this.selectedUser = res;
      this.requestForm.get("name").setValue(res.user_name),
        this.requestForm.get("email").setValue(res.email),
        this.requestForm.get("address").setValue(res.address),
        this.requestForm.get("role").setValue(res.user_role);
    });
  }

  save() {
    var data = {
      user_name: this.requestForm.get("name").value,
      email: this.requestForm.get("email").value,
      password: this.requestForm.get("password2").value,
      image: "null",
      address: this.requestForm.get("address").value,
      user_role: this.requestForm.get("role").value,
      refresh_token: null,
      status: "",
    };

    this.loading = true;
    this.loanService.userSave(data).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        if (error.error == "Existing user") {
          this.notificationService.openSnackBar("Existing user");
        }else{
          this.notificationService.openSnackBar("request saved successfully");
          this.getAllUsers();
        }
        this.loading = false;
      }
    );
  }
}
