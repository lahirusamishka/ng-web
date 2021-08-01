import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { MatPaginator } from "@angular/material";

@Component({
  selector: "app-x-table",
  templateUrl: "./x-table.component.html",
  styleUrls: ["./x-table.component.css"],
})
export class XTableComponent implements OnInit {
  dataSource;
  displayedColumns;
  @Input() inputData;
  @Input() tableName;
  @Input() addCheckBox = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {
    if (this.addCheckBox) {
      this.dataSource = [];
      var array = [];
      this.inputData.forEach((data, index) => {
        array[index] = { ...{All: "" }, ...data };
      });
      this.inputData = array;
      this.dataSource = new MatTableDataSource(array);
    } else {
      this.dataSource = new MatTableDataSource(this.inputData);
    }
    this.displayedColumns = Object.keys(this.inputData[0]);
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selectAll(event) {
    // var array = [];
    console.log(event);
 
    document.getElementById("mat-checkbox-2").innerText["s"];
 
    // this.dataSource.filteredData.forEach((data,index) => {
    //   data.All=bool?"":" "
    // });

    // // this.inputData = array;
    // this.dataSource=new MatTableDataSource(array);
  }
}
