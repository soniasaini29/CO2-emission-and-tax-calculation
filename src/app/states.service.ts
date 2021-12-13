import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })

export class DataStorageService {
	stateselected: any;
	
	constructor(
		private http: HttpClient,
		private router: Router
    ) { }
    
    goToEditPage(id){
        this.stateselected = id;
		this.router.navigate(['../states/' + this.stateselected]);
    }

    getSelectedContact(id) {
		return this.http
		.get('http://api.eia.gov/category/?api_key=f8c39d1a3ce44b9772f00aa5ad65de14&category_id=2251610');
	}
}
