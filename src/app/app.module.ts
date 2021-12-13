import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { StatesComponent } from './states/states.component';
import { singleStateComponent } from './single-state/single-state.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StatesComponent,
    singleStateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyApXcxux2JyeUXWiJOeAOnM-1bS-XmebRc",
      authDomain: "myfirebaseproject-5195b.firebaseapp.com",
      storageBucket: "myfirebaseproject-5195b.appspot.com",
      projectId: "myfirebaseproject-5195b",
    }),
    AngularFireStorageModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
