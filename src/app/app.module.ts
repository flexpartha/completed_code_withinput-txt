import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import {MatButtonModule} from '@angular/material/button';
import { SectorService } from './jsonService.service';
import {MatTableModule} from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@NgModule({
  imports:[ 
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
		MatNativeDateModule,
    HttpClientModule,
    BrowserAnimationsModule 
  ],
  declarations: [AppComponent, HelloComponent ],
  providers:[
    SectorService,
    DatePipe

  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
