import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "./../../core/services/auth.service";
import { NotificationService } from "./../../core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import domToPdf from "dom-to-pdf";
import * as moment from "moment";
import { DatePipe } from "@angular/common";
import { LoanServiceService } from "src/app/core/services/loan-service.service";
import SignaturePad from "signature_pad";
@Component({
  selector: "app-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.css"],
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  loading: boolean;
  userId: string;
  signatureImg: string;
  signaturePad: SignaturePad;
  @ViewChild("canvas", { static: false }) canvasEl: ElementRef;

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private loanService: LoanServiceService
  ) {}

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    this.loading = false;
  }

  saveSign() {
    console.log(this.signatureImg);
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    if (this.signatureImg) {
      console.log("ss");

      this.loading = false;
    }
  }

  clearPad() {
    this.signaturePad.clear();
    this.loading = true;
  }

  ngOnInit() {
    this.titleService.setTitle("easyloan - request");
    this.createForm();
    this.userId = this.loanService.getLogUserId();
    this.checkIsHaveApplication();
  }

  checkIsHaveApplication() {
    this.loanService.checkUserOldApplication(this.userId).subscribe((res) => {
      if (res != null) {
        console.log(res);
        this.fillTheBorrowerData(res);
      }
    });
  }

  fillTheBorrowerData(data) {
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
      this.requestForm.get("gender").setValue(data.gender);
      this.signaturePad.fromDataURL("data:image/jpeg;base64," + data.image);
  }

  private createForm() {
    this.requestForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      first_name: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      postal_code: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]{5}"),
      ]),
      address1: new FormControl("", [Validators.required]),
      address2: new FormControl("", []),
      last_name: new FormControl("", []),
      description: new FormControl("", []),
      middle_name: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9 ]{10}"),
      ]),
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

  printPdf() {
    var element = document.getElementById("test");
    var options = {
      filename: "test.pdf",
    };
    domToPdf(element, options, function () {
      console.log("done");
    });
  }

  save() {
    console.log(this.signatureImg);
    console.log(this.requestForm.value);

    let formattedDate = new Date(
      this.requestForm.get("dob").value
    ).toLocaleString();

    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;

    var data = {
      address1: this.requestForm.get("address1").value,
      address2: this.requestForm.get("address2").value,
      city: this.requestForm.get("city").value,
      description: this.requestForm.get("description").value,
      disbursed: this.requestForm.get("disbursed").value,
      dob: formattedDate,
      email: this.requestForm.get("email").value,
      working_status: this.requestForm.get("working_status").value,
      first_name: this.requestForm.get("first_name").value,
      interest: this.requestForm.get("interest").value,
      last_name: this.requestForm.get("last_name").value,
      title: this.requestForm.get("title").value,
      loan_product: this.requestForm.get("loan_product").value,
      middle_name: this.requestForm.get("middle_name").value,
      mobile: this.requestForm.get("mobile").value,
      postal_code: this.requestForm.get("postal_code").value,
      gender: this.requestForm.get("gender").value,
      state: this.requestForm.get("state").value,
      userId: this.userId,
      image: undefined ? null : String(this.signatureImg).split(",")[1],
    };

    console.log(data);

    this.loading = true;
    this.loanService.borrowerSave(data).subscribe(
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
