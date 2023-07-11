import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { CoordService } from '../coord.service';

@Component({
  selector: 'app-pig-form',
  templateUrl: './pig-form.component.html',
  styleUrls: ['./pig-form.component.css']
})
export class PigFormComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private cs: CoordService) { }

  ngOnInit(): void {
  }

  add(){

    // adding data to storage
    var name_node = document.querySelector("#name") as HTMLInputElement ;
    var name = name_node.value;

    var phone_node = document.querySelector("#phone-num") as HTMLInputElement;
    var ph_num = phone_node.value;

    var breed_node = document.querySelector("#breed") as HTMLInputElement;
    var breed = breed_node.value;

    var id_node = document.querySelector("#Pid") as HTMLInputElement;
    var id = id_node.value;

    var location_node = document.querySelector("#location") as HTMLInputElement;
    var location = location_node.value;

    var longitude_node = document.querySelector("#longitude") as HTMLInputElement;
    var longitude = longitude_node.value;

    var latitude_node = document.querySelector("#latitude") as HTMLInputElement;
    var latitude = latitude_node.value;

    var moreinfo_node = document.querySelector("#extra") as HTMLInputElement;
    var moreinfo = moreinfo_node.value;

    var time = new Date().toJSON().slice(0,10).split('-').reverse().join('/');

    var pigdata = {
      "name": name,
      "phone":ph_num, 
      "breed":breed,
      "id":id, 
      "location": location,
      "longitude":longitude,
      "latitude": latitude, 
      "moreinfo": moreinfo, 
      "time": time, 
      "status": "Ready for pickup"
    }
    var string_pigdata = JSON.stringify(pigdata); 

    var pig = {
      "key": name,
      "data": string_pigdata
    };

    this.http.post('https://272.selfip.net/apps/njJws0Fhpa/collections/temp_pigStorage/documents/', pig)
    .subscribe((data)=>{
      console.log(data)});
    
    // save new coordinates 
    var new_coords = {
      name: name!,
      long: parseFloat(longitude),
      lat: parseFloat(latitude)
    }
    this.cs.addCoords(new_coords);

    this.router.navigate(["/"]);

  }
  
  goback(){
    this.router.navigate(["/"]);
  }
}
