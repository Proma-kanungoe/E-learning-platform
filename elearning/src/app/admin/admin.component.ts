import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './_component/sidebar/sidebar.component'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
