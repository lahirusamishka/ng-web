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

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private route: ActivatedRoute
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
  }
}
