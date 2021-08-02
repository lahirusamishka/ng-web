import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { MatCheckboxChange, MatPaginator } from "@angular/material";

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

  itemsObject = [{
    id: 1,
    val: 'john'
  }, {
    id: 2,
    val: 'jane'
  }];
  selected3 = [];
  
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
  

  toggle(item,event: MatCheckboxChange) {
     if (event.checked) {
      this.selected3.push(item);
    } else {
      const index = this.selected3.indexOf(item);
      if (index >= 0) {
        this.selected3.splice(index, 1);
      }
    }
   console.log(item + "<>", event.checked);
  }

  exists(item) {
    return this.selected3.indexOf(item) > -1;
  };

  isIndeterminate() {
    return (this.selected3.length > 0 && !this.isChecked());
  };

  isChecked() {
    return this.selected3.length === this.itemsObject.length;
  };



  toggleAll(event: MatCheckboxChange) { 

    if ( event.checked ) {

       this.itemsObject.forEach(row => {
          // console.log('checked row', row);
          this.selected3.push(row)
          });

        // console.log('checked here');
    } else {
      // console.log('checked false');
       this.selected3.length = 0 ;
    }
}
 
}
