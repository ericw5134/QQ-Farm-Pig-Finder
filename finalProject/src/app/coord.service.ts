import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordService {
  
  pigList: any;
  coords = [{
    name: "just pretend you dont see me",
    long: 49.0,
    lat: -120.0,
  },
];

  constructor(private http: HttpClient) { 
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
        this.addCoords(new_coords);
      }
    });
  }

  getCoords(){
    return this.coords;
  }

  addCoords(coords: { name: string; long: number; lat: number; }){
    this.coords.push(coords);
  } 

  deleteCoords(del_pig: string){ 
    this.coords = this.coords.filter(p=>p.name!==del_pig)
    console.log(this.coords);
    return this.coords;
  }
}
