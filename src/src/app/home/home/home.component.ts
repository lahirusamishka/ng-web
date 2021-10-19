import { LoanServiceService } from "src/app/core/services/loan-service.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  btnShow = false;

  message = "";
  userName: string = "jbond";
  requestForm: FormGroup;
  constructor(private loanService: LoanServiceService) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user == null) {
      this.btnShow = true;
    } else {
      this.btnShow = false;
    }
  }

  ngOnInit() {
    this.requestForm = new FormGroup({
      email: new FormControl(""),
      body: new FormControl(""),
    });
  }

  sendMail() {
    this.message = "sending....";
    var data = {
      username: "new",
      name: this.requestForm.get("email").value,
      data: this.requestForm.get("body").value,
      email: this.requestForm.get("email").value,
    };

    this.loanService.usermail(data).subscribe(
      (res) => {},
      (error) => {
        this.requestForm.reset();
        this.message =
          "request sent! we will send you login credentials as soon as possible";
      }
    );
  }
}
