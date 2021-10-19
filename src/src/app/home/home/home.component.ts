import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  btnShow=false;

  constructor() { 
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user == null) {
      this.btnShow=true;
    } else {
      this.btnShow=false;
    }
  }

  ngOnInit() {
  }

}
