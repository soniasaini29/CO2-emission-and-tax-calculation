import { Component, OnInit, Input, HostListener } from '@angular/core';

import { map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {DataStorageService} from '../states.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  states: any;
  statesData: any;
  
  constructor(private http: HttpClient,
    private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.dtOptions = {
			pagingType: 'full_numbers',
			processing: true,
			order: []
		};
    this.http.get('http://api.eia.gov/category/?api_key=f8c39d1a3ce44b9772f00aa5ad65de14&category_id=2251610')
    .pipe(map(statesData => {
      const postArr = [];
      for (const key in statesData) {
        postArr.push({ ...statesData[key], id: key })
      }
     
      this.states = postArr;
      console.log("postarr",postArr[1]);
      return postArr;
    }
    ))
    .subscribe(response => {  
      this.statesData = response[1].childseries;
      console.log("response",this.statesData);
      this.dtTrigger.next();
    });
  }
  onEditContact(id){
    this.dataStorage.goToEditPage(id);
  }
}
