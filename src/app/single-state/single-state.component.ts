import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from '../states.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'single-state',
  templateUrl: './single-state.component.html',
  styleUrls: ['./single-state.component.css']
})
export class singleStateComponent implements OnInit {
  @ViewChild('f', { static: true }) timeForm: NgForm;

  id: number;

  idOnReload = '';
  stateInfo: any;
  validFrom: boolean = true;
  validTo: boolean = true;
  hasError: boolean = true;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  states: any;
  stateData: any;
  total = 0;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      order: []
    };

    this.route.params.subscribe((params: Params) => {
      this.idOnReload = params.id;

      this.stateInfo = this.dataStorageService.getSelectedContact(this.idOnReload);

      this.http.get('http://api.eia.gov/series/?api_key=f8c39d1a3ce44b9772f00aa5ad65de14&series_id=' + this.idOnReload)
        .pipe(map(stateData => {
          const postArr = [];
          for (const key in stateData) {
            postArr.push({ ...stateData[key], id: key })
          }

          this.states = postArr;
          console.log("postarr", this.states);
          return postArr;
        }
        ))
        .subscribe(response => {
          this.stateData = response[1][0].data;
          console.log("response", this.stateData);
          this.dtTrigger.next();
        });
    });
  }

  onGetResult(form: NgForm) {
    var resetForm = <HTMLFormElement>document.getElementById("form");
    const value = form.value;

    console.log("form value", value);
    if (value.from == '') {
      this.hasError = true;
      this.validFrom = false;
    }
    else {
      this.hasError = false;
      this.validFrom = true;
    }

    if (value.toYear == '') {
      this.hasError = true;
      this.validTo = false;
    }
    else {
      this.hasError = false;
      this.validTo = true;
    }

    if (value.from < value.toYear && value.from >= 1980 && value.toYear <= 2018) {
      this.hasError == false;
      let newArr = this.stateData.reverse();
      console.log("arr", this.stateData);
      if (form.valid && this.hasError == false && this.validFrom == true && this.validTo == true) {
        for (var i = 0; i < newArr.length; i++) {
          if (value.from <= newArr[i][0]) {
            console.log('year', newArr[i][0]);
            this.total = this.total + newArr[i][1];
            if (value.toYear == newArr[i][0]) {
              i = newArr.length;
            }
          }
        }
        if( this.states[1][0].units == "metric tons CO2"){
          this.total = (this.total/1000000);
        }
        else if(this.states[1][0].units == "Kilograms of CO2 per million Btu"){
          this.total = (this.total/1000);
        }
      }
    }
    else {
      this.total = 0;
      alert("Enter the years between 1980 and 2018 where the value of 'To' is bigger than 'From.");    
      resetForm.reset();
      this.validFrom == false;
      this.validTo == false;
      this.hasError == false;
    }
    
    alert("Total tax from "+ value.from+ " to "+value.toYear +" to be paid by "+ this.states[1][0].name+ " is "+ this.total.toFixed(1) );   
    resetForm.reset();
  }


}
