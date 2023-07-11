import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { CoordService } from '../coord.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.css']
})
export class MoreinfoComponent implements OnInit {

  private moreinfo_table!: HTMLTableElement;
  piggies: any;

  constructor(private router: Router, private cs: CoordService, private http: HttpClient) { 
    this.http.get<Object>('https://272.selfip.net/apps/njJws0Fhpa/collections/temp_pigStorage/documents/')
    .subscribe((data)=>{
      this.piggies = Object.entries(data)
      console.log(typeof(this.piggies));
    }); 
  }

  ngOnInit(): void {
    this.displayinfo();
  }

  displayinfo(){
    
    this.moreinfo_table = document.createElement("table");

    // -------------------------------creating the data rows----------------------------------

    this.http.get<Object>('https://272.selfip.net/apps/njJws0Fhpa/collections/temp_pigStorage/documents/')
    .subscribe((data)=>{
      this.piggies = Object.entries(data);
    
      for (var i = 0; i < this.piggies.length; i++){
        var pigData = JSON.parse(this.piggies[i][1].data);
        console.log(pigData);

        var name_row = this.moreinfo_table.insertRow(-1);
        name_row.insertCell(0).innerHTML = "Name of reporter: ";
        name_row.insertCell(1).innerHTML = pigData.name;

        var pn_row = this.moreinfo_table.insertRow(-1);
        var pnc1 = pn_row.insertCell(0);
        pnc1.innerHTML = "Reporter Phone Number: ";
        var pnc2 = pn_row.insertCell(1);
        pnc2.innerHTML = pigData.phone;

        var breed_row = this.moreinfo_table.insertRow(-1);
        breed_row.insertCell(0).innerHTML = "This pig's breed:";
        breed_row.insertCell(1).innerHTML = pigData.breed;
        
        var id_row = this.moreinfo_table.insertRow(-1);
        id_row.insertCell(0).innerHTML = "This pig's ID: ";
        id_row.insertCell(1).innerHTML = pigData.id;

        var location_row = this.moreinfo_table.insertRow(-1);
        location_row.insertCell(0).innerHTML = "This pig's current location: ";
        location_row.insertCell(1).innerHTML = pigData.location + " (" + pigData.longitude + ", " + pigData.latitude + ")";
      
        var status_row = this.moreinfo_table.insertRow(-1);
        status_row.insertCell(0).innerHTML = "This pig's current status: ";
        status_row.insertCell(1).innerHTML = pigData.status;

        var time_row = this.moreinfo_table.insertRow(-1);
        time_row.insertCell(0).innerHTML = "Time: ";
        time_row.insertCell(1).innerHTML = pigData.time;

        var extra_row = this.moreinfo_table.insertRow(-1);
        extra_row.insertCell(0).innerHTML = "Extra information: ";
        extra_row.insertCell(1).innerHTML = pigData.moreinfo;

        var empty_row = this.moreinfo_table.insertRow(-1);
        empty_row.insertCell(0).innerHTML = "--------------------------------------------------------";
        empty_row.insertCell(1).innerHTML = "--------------------------------------------------------";

        var container = document.querySelector("#moreinfo_table");

        container?.appendChild(this.moreinfo_table);
      }
    })
  }

  goback(){
    this.router.navigate(["/"]);
  }
}
