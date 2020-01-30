import { Component, OnInit } from '@angular/core';
import {ADMIN} from "../../../app.constants";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  msg:String

  ngOnInit() {

     this.msg = sessionStorage.getItem(ADMIN)

  }

}
