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
      this.inputData.forEach((data,index) => {
        console.log(data);
        var obj1 = data;
        var obj2 = { ' ': 'dog' }
        array[index]= {...obj2,...obj1 };
      });
      this.inputData=array;
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
}
