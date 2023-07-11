import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as L from 'leaflet';

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
import { CoordService } from '../coord.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements AfterViewInit, OnInit {

  map!: L.Map;
  table!: HTMLTableElement;
  pigList: any;
  coords = [{
    name: "just pretend you dont see me",
    long: 49.0,
    lat: -120.0,
  },
];

  private initTable(): void {

    this.table = document.querySelector("#dataTable") as HTMLTableElement;

    // -------------------------------just the header row----------------------------------

    var header_row = this.table.insertRow(0);
    var locat_h = header_row.insertCell(0);
    locat_h.innerHTML = "Location";
    var rep_h = header_row.insertCell(1);
    rep_h.innerHTML = "Reported By";
    var time_h = header_row.insertCell(2);
    time_h.innerHTML = "Time Reported";
    var stat_h = header_row.insertCell(3);
    stat_h.innerHTML = "Status";
    this.table.appendChild(header_row);

    // -------------------------------creating the data rows----------------------------------
    
    this.http.get<Object>('https://272.selfip.net/apps/njJws0Fhpa/collections/temp_pigStorage/documents/',)
    .subscribe((data)=>{
      this.pigList = Object.entries(data);

      for (var i = 0; i < this.pigList.length; i++){
        var pigData = JSON.parse(this.pigList[i][1].data);
  
        // creating cells
        var new_row = this.table.insertRow(-1);

        var locat = new_row.insertCell(0);
        locat.innerHTML = pigData.location;
        var reporter = new_row.insertCell(1);
        reporter.innerHTML = pigData.name;
        var time = new_row.insertCell(2);
        time.innerHTML = pigData.time;
        var stat = new_row.insertCell(3);
        stat.innerHTML = pigData.status;
  
        this.table.appendChild(new_row);  
      };
    });
  }



  constructor(private router: Router, private cs: CoordService, private http: HttpClient) {}


  ngOnInit(): void {
    this.initTable();
  }



  ngAfterViewInit(): void { 
    this.map = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibTBuZ28iLCJhIjoiY2xiNjVrZG94MDkzMTNucGxleGlneXVseiJ9.fGBI_sArsb2DqqyA2MEJ_g', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    this.http.get<Object>('https://272.selfip.net/apps/njJws0Fhpa/collections/temp_pigStorage/documents/',)
    .subscribe((data)=>{
      this.pigList = Object.entries(data);
      for (var i = 0; i < this.pigList.length; i++){
        var pigData = JSON.parse(this.pigList[i][1].data);
        var new_coords = {
          name: pigData.name,
          long: parseFloat(pigData.longitude),
          lat: parseFloat(pigData.latitude),
        }
        this.coords.push(new_coords);
      }
      for (var i = 0; i < this.coords.length; i++){
        if (this.coords[i].name != "just pretend you dont see me"){
          L.marker([this.coords[i].long, this.coords[i].lat]).addTo(this.map).bindPopup(this.coords[i].name + ": pls help me").openPopup();
        }
      }
    })
  }


  redirect(){
    this.router.navigate(["/add-pig"]);
  }

  redirect_more(){
    this.router.navigate(["/moreinfo"]);
  }

  redirect_delete(){
    this.router.navigate(["/delete"]);
  }

  redirect_status(){
    this.router.navigate(["/status"]);
  }

  refresh(){
    location.reload();
  }
}
