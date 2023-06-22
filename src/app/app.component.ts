import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SectorService } from './jsonService.service';
import Swal from 'sweetalert2';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

// export const DATE_FORMATS = {
//   parse: {
//     dateInput: 'MM-YYYY',
//   },
//   display: {
//     dateInput: 'MMM-YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMM YYYY',
  },
};

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  input1: number;
  input2: number;
  operator: any;
  dropOperator:any;
  finalRes: number;
  month = new Date();
  maxDate =  new Date();
  todaysDate = new Date();
  selectedMonth:any;
  operatorSign = ['+', '-', '*', '/', '%'];

  formGrop1:FormGroup;
  formMat:FormGroup;
  getname = new FormControl();
  getemail = new FormControl();
  getPos = new FormControl();
  formMatValue:any;
  isDisable = true;
  sectorList = [];
  sectorYList = [];
  headerList = [];
  monthValue = [];
  innerMntVl =[];
  //displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  //data: PeriodicElement[] = ELEMENT_DATA;
  officialPosition = [
    {
      "empId": "1",
      "empPos": "Sr. Manager"
    },
    {
      "empId": "2",
      "empPos": "Manager"
    },
    {
      "empId": "3",
      "empPos": "Deputy Manager"
    },
    {
      "empId": "4",
      "empPos": "Programe Manager"
    },
    {
      "empId": "5",
      "empPos": "Hr Manager"
    }
  ]
  selectDate: string;
  data: PeriodicElement[];
  displayedColumns = [];
  columnsToDisplay: string[];
  constructor(private fb:FormBuilder, private service1:SectorService,private datePipe:DatePipe){

  }
  ngOnInit() {
    this.createForm();
    this.createMatForm();
    this.getname.disable();
    this.getemail.disable();
    this.getSectorServiceData();
  }
  
  createForm(){
    this.formGrop1 = this.fb.group({
      input_1: new FormControl(''),
      input_2: new FormControl(''),
      operator: new FormControl(''),
      select1 :new FormControl('')
    })
  }

  createMatForm(){
    this.formMat = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      position: new FormControl('')
    })
  }

  getSectorServiceData(){
    this.service1.getSectorListdata().subscribe((res:any)=>{
      console.log(res.res.headers);
      this.sectorList = res.res.sector;
      console.log(this.sectorList);
      this.headerList = res.res.headers;
    })
  }
  submitRes() {
    let result: number;
    // result = this.input1 +  this.input2;
    //this.finalRes = parseInt(result);
     let oper = this.operator;

    if (this.dropOperator === '+') {
      result = parseInt(this.input1.toString()) + parseInt(this.input2.toString());
      this.finalRes = result;
    }
    if (this.dropOperator === '-') {
      result =  parseInt(this.input1.toString()) - parseInt(this.input2.toString());
      this.finalRes = result;
    }
    if (this.dropOperator === '*') {
      result = parseInt(this.input1.toString()) * parseInt(this.input2.toString());
      this.finalRes = result;
    }
    if (this.dropOperator === '/') {
      result = parseInt(this.input1.toString()) / parseInt(this.input2.toString());
      this.finalRes = result;
    }
    console.log(this.finalRes);
    console.log(oper);
  }

  OnKeyChange(evt){
      let result: number;
     //let oper = this.operator;
     let oper = evt.target.value;
    if(oper === '+') {
      result = parseInt(this.input1.toString()) + parseInt(this.input2.toString());
      this.finalRes = result;
    }
    if(oper === '-') {
      result =  parseInt(this.input1.toString()) - parseInt(this.input2.toString());
      this.finalRes = result;
    }
    if(oper === '*') {
      result = parseInt(this.input1.toString()) * parseInt(this.input2.toString());
      this.finalRes = result;
    }
    if(oper === '/') {
      result = parseInt(this.input1.toString()) / parseInt(this.input2.toString());
      this.finalRes = result;
    }
    console.log(this.finalRes);
    console.log(oper);
  }

  selectedSign(evt){
    this.dropOperator = evt.target.value;
    console.log(this.dropOperator);
  }

   calculation = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '*': function (x, y) { return x * y },
    '/': function (x, y) { return x / y},
    '%': function (x, y) { return (x * y) / 100}
  }​​​​​​​

  selectedSignReac(evt){
    this.dropOperator = evt.target.value;
    //let output = this.math_it_up[evt.target.value](10, 2);

    //console.log(output); 
  }
  submitform1(){
    let oper = this.formGrop1.get('select1').value;

    if(oper === '+'){
      let res:any;
      res = parseInt(this.formGrop1.get('input_1').value) + parseInt(this.formGrop1.get('input_2').value);
      this.finalRes = res;
    }
    if(oper === '-'){
      let res:any;
      res = parseInt(this.formGrop1.get('input_1').value.toString()) - parseInt(this.formGrop1.get('input_2').value.toString());
      this.finalRes = res;
    }
    if(oper === '*'){
      let res:any;
      res = parseInt(this.formGrop1.get('input_1').value.toString()) * parseInt(this.formGrop1.get('input_2').value.toString());
      this.finalRes = res;
    }
    if(oper === '/'){
      let res:any;
      res = parseInt(this.formGrop1.get('input_1').value.toString()) / parseInt(this.formGrop1.get('input_2').value.toString());
      this.finalRes = res;
    }
    console.log(oper);
  }

  submitform2(){
    let oper = this.formGrop1.get('select1').value;
    //for(let i=0; i < this.operatorSign.length; i++){
      //if(this.operatorSign[i] === oper){
        this.finalRes = this.calculation[oper](parseInt(this.formGrop1.get('input_1').value),parseInt(this.formGrop1.get('input_2').value));
      //}
    //}
  }

  submitMatform(){
    console.log(this.formMat.value);
    this.formMatValue = this.formMat.value;
    this.getname.setValue(this.formMatValue.name);
    this.getemail.setValue(this.formMatValue.email);
    this.getPos.setValue(this.formMatValue.position);
  }

  posChange(evt){
    console.log(evt.value)
    this.getPos.setValue(evt.value);
  }

  submitSector(){
    let isNonEmptyField = false;
    let valueList = [];
    this.sectorList.forEach((item)=>{
      valueList = item.values
      valueList.forEach((valueItm)=>{
        if(!(valueItm.itemValue === null || valueItm.itemValue == 0 || valueItm.itemValue === '')){
          isNonEmptyField = true;
          console.log("Value::",valueItm.itemValue);
          //return;
        }
      })
    });
    console.log("isNonEmptyField:",isNonEmptyField);
    if(isNonEmptyField){
      console.log("non zero value found in 2 log....");
      Swal.fire({
        title: 'Do you want to Submit the changes?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Result are submitted successfully....");
          //this.spinner.show();
              //this.finalSubmit();
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
    else{
      console.log("value not found");
      Swal.fire({
        icon: 'warning',
        title: "Submit Unsuccessful",
        text: "Please put non zero value in empty field",
        confirmButtonText: `OK`,
        allowOutsideClick: false
      })
    }
  }

  _from_monthSelectedHandler(chosenMonthDate: Moment, datepicker: MatDatepicker<Moment>) {

    if (!this._isMonthEnabled(chosenMonthDate.year(), chosenMonthDate.month())) {
      return;
    }

    chosenMonthDate.set({ date: 1 });


    let selectedMonth = chosenMonthDate.toDate();
    this.month = selectedMonth;
    console.log(this.month);

    this.selectedMonth = this.datePipe.transform(this.month, 'ddMMyyyy');
    console.log(this.selectedMonth);
    //this.dataServ.setMonthEvent(this.selectedMonth);
    //this.apiSrv.setMonthEvent(this.datePipe.transform(this.month,'yyyyMM'));
    // this._inputCtrl.setValue(chosenMonthDate);
    // this.onChange(chosenMonthDate.toDate());
    this.onTouched();
    datepicker.close();
  }
  private _isMonthEnabled(year: number, month: number) {
    if (
      month === undefined ||
      month === null) {
      return false;
    }

    //const firstOfMonth = moment([year, month, 1]);

    // If any date in the month is enabled count the month as enabled.
    // for (const date = firstOfMonth; date.month() === month; date.add(1, 'd')) {
    //   if (this._customFilter(date)) {
    //     return true;
    //   }
    // }

    return true;
  }


  // Function to call when the date changes.
  onChange = (monthAndYear: Date) => { };

// Function to call when the input is touched.
  onTouched = () => { };

  fromDateChangeControl(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectDate = this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd');
    console.log("this.selectDate", this.selectDate);
    var d = new Date(this.selectDate);
    console.log(d.toLocaleDateString());
    d.setMonth(d.getMonth() + 11);
    console.log(d.toLocaleDateString());

    var theMonths = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var now = new Date(this.selectDate);
    this.displayedColumns = [];
    for (var i = 0; i < 5; i++) {
      var future = new Date(now.getFullYear(), now.getMonth() + i, 1);
      var month = theMonths[future.getMonth()];
      var year = future.getFullYear();
      //console.log(month, year);
      this.displayedColumns.push(month);
      this.columnsToDisplay = this.displayedColumns.slice(0, this.displayedColumns.length);
      console.log(this.displayedColumns);
      this.service1.getyearSectorListdata().subscribe((res:any)=>{
        this.sectorYList = res.res.sector;
        this.sectorYList.forEach((item)=>{
          this.monthValue = item.values;
          console.log(this.monthValue);
        })
      })
      //this.data = ELEMENT_DATA;
    }
  }
}
