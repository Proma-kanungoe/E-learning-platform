import { Component, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
numOfItem = 0;
  constructor(private us:UtilityService){}
ngOnInit(): void {
  this.us.numOfItem.subscribe(res=>{
this.numOfItem = res;
  })
}
}
