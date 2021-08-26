import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { LoanServiceService } from 'src/app/core/services/loan-service.service';

@Component({
  selector: 'app-guarantor',
  templateUrl: './guarantor.component.html',
  styleUrls: ['./guarantor.component.css']
})
export class GuarantorComponent implements OnInit {

  dataSource;
  displayedColumns;
  inputData;

  addCheckBox = true;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  actualPaginator: MatPaginator;
  

  selected3 = [];

  constructor(private loanService: LoanServiceService) {}

  ngOnInit() {
    this.loanService.getAllGuarantor().subscribe((res) => {
      console.log(res);
      var arrayList = [];
      res.forEach((data) => {
        console.log(data);
        
        var obj = {
          id:data.id,
          first_name: this.checkNull(data.title) +" "+this.checkNull(data.first_name) + " " + this.checkNull(data.middle_name) + " " + this.checkNull(data.last_name),
          city: data.address1 + "_" + data.address2,
          disbursed: this.checkNull(data.disbursed),
          dob: this.checkNull(data.dob),
          email: this.checkNull(data.email),
          interest: this.checkNull(data.interest),
          mobile: this.checkNull(data.mobile),
          postal_code: this.checkNull(data.postal_code),
          state: this.checkNull(data.state),
          working_status: this.checkNull(data.working_status),
          edit: " ",
        };
        arrayList.push(obj);
      });

      this.inputData = arrayList;

      if (this.inputData) {
        if (this.addCheckBox) {
          this.dataSource = [];
          var array = [];
          this.inputData.forEach((data, index) => {
            array[index] = { ...{ All: "" }, ...data };
          });
          this.inputData = array;
          this.dataSource = new MatTableDataSource(array);
        } else {
          this.dataSource = new MatTableDataSource(this.inputData);
        }
        if(this.inputData[0]){
          this.displayedColumns = Object.keys(this.inputData[0]);
          this.dataSource.sort = this.sort;
        }
      }
    });
  }

  checkNull(value){
    if(value=="" || value=="  " ){
      return "_"
    }else{
      return value;
    }
  }

  ngAfterViewInit() {
      // this.dataSource.paginator = this.actualPaginator;
  }

  createNewBorrower() {
    console.log("create ");
  }

  toggle(item, event: MatCheckboxChange) {
    if (event.checked) {
      this.selected3.push(item);
    } else {
      const index = this.selected3.indexOf(item);
      if (index >= 0) {
        this.selected3.splice(index, 1);
      }
    }
  }

  exists(item) {
    return this.selected3.indexOf(item) > -1;
  }

  isIndeterminate() {
    return this.selected3.length > 0 && !this.isChecked();
  }

  isChecked() {
    return this.selected3.length === this.inputData.length;
  }

  toggleAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.inputData.forEach((row) => {
        // console.log('checked row', row);
        this.selected3.push(row);
      });

      // console.log('checked here');
    } else {
      // console.log('checked false');
      this.selected3.length = 0;
    }
  }

}
