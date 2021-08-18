import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "./../../core/services/auth.service";
import { NotificationService } from "./../../core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.css"],
})
export class RequestComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle("easyloan - request");
    this.createForm();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem("savedUserEmail");

    this.loginForm = new FormGroup({
      email: new FormControl(savedUserEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl("", Validators.required),
      loan_product: new FormControl({value: 'personal_loans', disabled: false}, Validators.required),
      rememberMe: new FormControl(savedUserEmail !== null),
    });
  }

  save() {
    const email = this.loginForm.get("email").value;
    const password = this.loginForm.get("password").value;
    const rememberMe = this.loginForm.get("rememberMe").value;

    this.loading = true;
    // this.authenticationService.login(email.toLowerCase(), password).subscribe(
    //   (data) => {
    //     if (rememberMe) {
    //       localStorage.setItem("savedUserEmail", email);
    //     } else {
    //       localStorage.removeItem("savedUserEmail");
    //     }
    //     this.router.navigate(["/"]);
    //   },
    //   (error) => {
    //     this.notificationService.openSnackBar(error.error);
    //     this.loading = false;
    //   }
    // );
  }

  resetPassword() {
    this.router.navigate(["/auth/password-reset-request"]);
  }
}
