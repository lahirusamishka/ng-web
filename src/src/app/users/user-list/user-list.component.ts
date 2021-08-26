import { LoanServiceService } from 'src/app/core/services/loan-service.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { NotificationService } from "../../core/services/notification.service";
import { NGXLogger } from "ngx-logger";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  userId: any;
  isReturnId: boolean;
  requestForm: FormGroup;
  loading: boolean;
  callUserId: any;
  callNewUserId: any;
  userObj: any;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private route: ActivatedRoute,
    private loanService:LoanServiceService
  ) {
    this.route.params.subscribe((result) => {
      if(result.id=="new"){
        this.isReturnId=false;
      }else{
        this.isReturnId=true;
      }
      this.userId = result.id;
    });
  }

  ngOnInit() {
    console.log(this.userId);
    this.createForm();
    this.checkIsHaveApplication();
  }
  checkIsHaveApplication() {
    this.loanService.borrowerGetById(this.userId).subscribe((res) => {
      if (res != null) {
        this.userObj=res;
        this.fillTheBorrowerData(res);
      }
    });
  }
  fillTheBorrowerData(data) {
    this.callUserId=data.id;
    this.callNewUserId=data.userId;
    this.requestForm.get("address1").setValue(data.address1),
      this.requestForm.get("address2").setValue(data.address2),
      this.requestForm.get("city").setValue(data.city),
      this.requestForm.get("description").setValue(data.description),
      this.requestForm.get("disbursed").setValue(data.disbursed),
      this.requestForm.get("dob").setValue(new Date(data.dob)),
      this.requestForm.get("email").setValue(data.email),
      this.requestForm.get("first_name").setValue(data.first_name),
      this.requestForm.get("interest").setValue(data.interest),
      this.requestForm.get("last_name").setValue(data.last_name),
      this.requestForm.get("loan_product").setValue(data.loan_product),
      this.requestForm.get("middle_name").setValue(data.middle_name),
      this.requestForm.get("mobile").setValue(data.mobile),
      this.requestForm.get("postal_code").setValue(data.postal_code),
      this.requestForm.get("state").setValue(data.state);
      this.requestForm.get("working_status").setValue(data.working_status);
      this.requestForm.get("title").setValue(data.title);
  }
  createForm() {
    this.requestForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
      ]),
      first_name: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      postal_code: new FormControl("", [Validators.required]),
      address1: new FormControl("", [Validators.required]),
      address2: new FormControl("", []),
      last_name: new FormControl("", []),
      description: new FormControl("", []),
      middle_name: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      working_status: new FormControl("", [Validators.required]),
      loan_product: new FormControl(
        { value: "", disabled: false },
        Validators.required
      ),
      disbursed: new FormControl(
        { value: "", disabled: false },
        Validators.required
      ),
      interest: new FormControl(
        { value: "", disabled: false },
        Validators.required
      ),
    });
  }

  printPdf(){

  }

  save(){
    // console.log(this.requestForm.value);

    // let formattedDate = new Date(
    //   this.requestForm.get("dob").value
    // ).toLocaleString();
    let formattedDate = new Date(
      this.requestForm.get("dob").value
    ).toLocaleString();

 
    this.userObj.address1= this.requestForm.get("address1").value,
      this.userObj.address2= this.requestForm.get("address2").value,
      this.userObj.city= this.requestForm.get("city").value,
      this.userObj.description= this.requestForm.get("description").value,
      this.userObj.disbursed= this.requestForm.get("disbursed").value,
      this.userObj.dob= formattedDate,
      this.userObj.email= this.requestForm.get("email").value,
      this.userObj.working_status= this.requestForm.get("working_status").value,
      this.userObj.first_name= this.requestForm.get("first_name").value,
      this.userObj.interest= this.requestForm.get("interest").value,
      this.userObj.last_name= this.requestForm.get("last_name").value,
      this.userObj.title= this.requestForm.get("title").value,
      this.userObj.loan_product= this.requestForm.get("loan_product").value,
      this.userObj.middle_name= this.requestForm.get("middle_name").value,
      this.userObj.mobile= this.requestForm.get("mobile").value,
      this.userObj.postal_code= this.requestForm.get("postal_code").value,
      this.userObj.state= this.requestForm.get("state").value,
      this.userObj.userId= this.callNewUserId,
    



    this.loading = true;
    this.loanService.borrowerSave(this.userObj).subscribe(
      (data) => {
        console.log(data);

        this.notificationService.openSnackBar("request saved successfully");
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
