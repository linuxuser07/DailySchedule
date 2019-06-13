import { Component, OnInit, Input, SimpleChange, ViewChild, ElementRef } from "@angular/core";
import { Schedule } from "../schedule";
import * as XLSX from 'xlsx';

@Component({
  selector: "app-schedule-table",
  templateUrl: "./schedule-table.component.html",
  styleUrls: ["./schedule-table.component.css"]
})
export class ScheduleTableComponent implements OnInit {
  
  @ViewChild('TABLE', {static: false}) table: ElementRef;

  showTable: Boolean;
  weekDays = [];
  private _day: Date;
  missedDay = { Day: "", amount: 0 };
  missingDays = [];
  monday = 0;
  tuesday = 0;
  wednesday = 0;
  thursday = 0;
  friday = 0;
  saturday = 0;

  constructor() {}
  //getting inputs from parent component
  @Input() schedules: Schedule[];
  @Input("selectedDay")
  set day(day: Date) {
    this._day = day;
  }
  get day(): Date {
    return this._day;
  }

  ngOnInit() {
    this.showTable = true;
    this.getDatesOfWeek(this.day);
    
    //console.log(this.day)
  }
  ngOnChanges(changeRecord: SimpleChange) {
    this.missingDays = [];
    this.weekDays = [];
    this.getMissingDays();
    var currentDate = new Date(this.day);
    this.getDatesOfWeek(currentDate);
    console.log(this.weekDays);
  }

  getDatesOfWeek(day: Date) {
    let result = new Date(day);
    let month = result.getMonth() + 1;
    let days = result.getDate();
    let mad = month + "/" + days;
    this.weekDays.push(mad);

    for (let i = 0; i < 6; i++) {
      result.setDate(result.getDate() + 1);
      month = result.getMonth() + 1;
      days = result.getDate();
      mad = month + "/" + days;
      this.weekDays.push(mad);
    }
  }

  dayOff() {
    var schedule = this.schedules;
    let dot = [0, 0, 0, 0, 0, 0];
    let dayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    if (schedule !== undefined) {
      for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].teammateType !== "Anesthesia") {
          continue;
        }
        if (schedule[i].monday !== "OFF") {
          dot[0]++;
        }
        if (schedule[i].tuesday !== "OFF") {
          dot[1]++;
        }
        if (schedule[i].wednesday !== "OFF") {
          dot[2]++;
        }
        if (schedule[i].thursday !== "OFF") {
          dot[3]++;
        }
        if (schedule[i].friday !== "OFF") {
          dot[4]++;
        }
        if (schedule[i].saturday !== "OFF") {
          dot[5]++;
        }
      }
      for (let i = 0; i < dot.length; i++) {
        if (dot[i] < 2) {
          this.missedDay.Day = dayNames[i];
          this.missedDay.amount = dot[i];
          this.missingDays.push(this.missedDay);
          this.missedDay = { Day: "", amount: 0 };
          //console.log(this.missingDays, 'these are the missing days');
        }
      }
    }
  }
  // calls the days off function.
  getMissingDays() {
    if (this.schedules !== undefined) {
      this.dayOff();
    }
  }
  ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'DailyScheule.xlsx');
  
}
}
