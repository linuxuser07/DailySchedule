import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScheduleService } from "./schedule.service";
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatButtonModule,
  MatTooltipModule,
  MatToolbar,
  MatTable
} from "@angular/material";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { SearchScheduleComponent } from "./search-schedule/search-schedule.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ScheduleTableComponent } from "./schedule-table/schedule-table.component";

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchScheduleComponent,
    MatToolbar,
    MatTable,
    ScheduleTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    MatTooltipModule,

    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
