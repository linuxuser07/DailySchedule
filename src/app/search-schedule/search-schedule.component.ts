import { Component, OnInit } from "@angular/core";
import { Facility } from "../facility";
import { ScheduleService } from "../schedule.service";
import { Schedule } from "../schedule";

@Component({
  selector: "app-search-schedule",
  templateUrl: "./search-schedule.component.html",
  styleUrls: ["./search-schedule.component.css"]
})
export class SearchScheduleComponent implements OnInit {
  facilities: Facility[];
  schedules: Schedule[];
  showRefresh: Boolean;
  showTable: Boolean;
  selectedFacility;
  selectedDay: Date;
  myDate = new Date();
  
  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.getFacilities();
    this.showTable = false;
    this.showRefresh = false;
  }

  //api call to get the facilities
  getFacilities() {
    this.scheduleService.getFacilities().subscribe(
      r =>
        //getting the data if available
        {
          this.facilities = r.data;
        },
      err => console.log(err),
      () => console.log("Done getting the Facilities")
    );
  }
  //setting schedule for mondays only
  onlyMonday(myDate) {
    var day = myDate.getDay();
    return day === 1;
  }
  //gettting the schedules from api 
  getSchedules() {
    this.showTable= true;
    this.showRefresh = true;
    if (this.selectedFacility !== "" && this.myDate.getDay() === 1) {
      this.selectedDay = this.myDate;
      this.scheduleService
        .getSchedules(this.selectedFacility, this.myDate.getDate().toString())
        .subscribe(
          r => {
            this.schedules = r.data;
          },
          err => console.log(err),
          () => console.log("Finished getting schedules")
        );
    }
  }

  refresh() {
    this.showRefresh = false;
    this.showTable = false;
    this.selectedFacility = '';
  
  }
}
