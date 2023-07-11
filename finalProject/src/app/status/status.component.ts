import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  correct_hex_password = "84892b91ef3bf9d216bbc6e88d74a77c";
  returned_hex_password: any;
  piggies: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  change(): void {
    var password_node = document.querySelector("#password") as HTMLInputElement;
    var URL: string = 'https://api.hashify.net/hash/md5/hex?value=';
    var actual_URL: string = URL.concat(password_node.value)
    this.http.get<Object>(actual_URL)
    .subscribe((data)=>{
      if (data == null) {alert("NULL data")};
      this.returned_hex_password = Object.entries(data);
      var password = this.returned_hex_password[0][1];
      if (password != this.correct_hex_password){ 
        alert("Wrong password, returning to home page");
        this.router.navigate(["/"]);
      } 
    })
    var name_node = document.querySelector('#pigname') as HTMLInputElement
    if (name_node == null) {
      alert("name_node is null");  
    };
    
    URL = 'https://272.selfip.net/apps/njJws0Fhpa/collections/temp_pigStorage/documents/';
    actual_URL = URL.concat(name_node.value);
    actual_URL = actual_URL.concat("/");

    var status_node = document.querySelector("#status") as HTMLInputElement;

    this.http.get<Object>(actual_URL).subscribe((data)=>{

      this.piggies = Object.entries(data);

      var pigData = JSON.parse(this.piggies[1][1]);

      pigData.status = status_node.value;

      this.piggies[1][1] = JSON.stringify(pigData);

      var updated_pigData = {
        "name": pigData.name,
        "phone": pigData.phone, 
        "breed": pigData.breed,
        "id": pigData.id, 
        "location": pigData.location,
        "longitude":pigData.longitude,
        "latitude": pigData.latitude, 
        "moreinfo": pigData.moreinfo, 
        "time": pigData.time, 
        "status": pigData.status
      }
      var string_updated_pigData = JSON.stringify(updated_pigData)
      var updated_pig = {
        "key": pigData.name,
        "data": string_updated_pigData
      }

      this.http.delete('https://272.selfip.net/apps/njJws0Fhpa/collections/temp_pigStorage/documents/' + this.piggies[0][1] + '/').subscribe( (res) => {});
      this.http.post('https://272.selfip.net/apps/njJws0Fhpa/collections/temp_pigStorage/documents/', updated_pig)
      .subscribe((data=>{console.log(data)})
      );
    })
  this.router.navigate(["/"])
}

  goback(): void {
    this.router.navigate(["/"]);
  }
}
