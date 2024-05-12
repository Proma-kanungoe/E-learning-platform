import { Component, OnInit } from '@angular/core';
import { CloudService } from '../../../services/cloud.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
constructor(private cloudSer:CloudService){}
orders:any[] =[]
ngOnInit(): void {
  this.cloudSer.getOrders().subscribe({
    next:(res:any)=>{
      this.orders = res.data;

    },
    complete:()=>{
      console.log("COMPLETE GETTING ORDERS")
    },
    error:(e)=>{
      console.log(
        "Error in Fetching Admin Orders"
      )
    }
  })
}

}
