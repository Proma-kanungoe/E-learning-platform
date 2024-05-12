import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CloudService } from '../../../services/cloud.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private cloudService: CloudService,private us:UtilityService, private router:Router){}

  signoutSubmit(){
    this.us.removeToken();
this.cloudService.signout().subscribe({
  next:(res:any)=>{
    console.log(res, "Signout")
  },
  error:(e)=>{
    console.log("Error", e)
  }
})

this.router.navigate(['/'])
  }

  
}
