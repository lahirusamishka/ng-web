import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"],
})
export class CustomerListComponent implements OnInit {
  dataSource: any[];

  constructor() {}

  ngOnInit() {
    this.dataSource = [
      { id: 1, name: "Hyddrogen", weight: 1.0079, symbol: "H", edit: " " },
      { id: 2, name: "Helium", weight: 4.0026, symbol: "He", edit: " " },
      { id: 3, name: "Lithium", weight: 6.941, symbol: "Li", edit: " " },
      { id: 4, name: "Beryllium", weight: 9.0122, symbol: "Be", edit: " " },
      { id: 5, name: "Boron", weight: 10.811, symbol: "B", edit: " " },
      { id: 6, name: "Carbon", weight: 12.0107, symbol: "C", edit: " " },
      { id: 7, name: "Nitrogen", weight: 14.0067, symbol: "N", edit: " " },
      { id: 8, name: "Oxygen", weight: 15.9994, symbol: "O", edit: " " },
      { id: 9, name: "Fluorine", weight: 18.9984, symbol: "F", edit: " " },
      { id: 10, name: "Neon", weight: 20.1797, symbol: "Ne", edit: " " },
    ];
  }
}
