import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  correct_hex_password = "84892b91ef3bf9d216bbc6e88d74a77c";
  returned_hex_password: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  del():void{

    var password_node = document.querySelector("#password") as HTMLInputElement;
    var URL: string = 'https://api.hashify.net/hash/md5/hex?value=';
    var actual_URL: string = URL.concat(password_node.value)
    this.http.get<Object>(actual_URL)
    .subscribe((data)=>{
      this.returned_hex_password = Object.entries(data);
      var password = this.returned_hex_password[0][1];
      if (password != this.correct_hex_password){
        alert("Wrong password, returning to home page");
        this.router.navigate(["/"]);
      } else {
        var delpig = document.querySelector("#name") as HTMLInputElement;
        var name = delpig.value;
        var delete_url = 'https://272.selfip.net/apps/njJws0Fhpa/collections/temp_pigStorage/documents/'
        delete_url = delete_url.concat(name);
        delete_url = delete_url.concat("/");
        this.http.delete(delete_url).subscribe( (res) => {});
        this.router.navigate(["/"]);
      }
    })
  }

  goback():void{
    this.router.navigate(["/"]);
    return;
  }
}
