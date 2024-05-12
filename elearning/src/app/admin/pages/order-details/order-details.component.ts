import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudService } from '../../../services/cloud.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{
  orderId!:string;
  orderDetails!:any;
  orders:any[] = [];
  constructor(private route:ActivatedRoute, private router:Router, private cloudService:CloudService){ }
ngOnInit(): void {
  this.getParams();
  this.getSingleOrder();

}
  getParams(){
    this.route.paramMap.subscribe(res=>{
      let id = res.get("id")
      if(id){this.orderId = id;}
     
    })
  }

  getSingleOrder(){
   
    this.cloudService.getSingleOrder(this.orderId).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.orderDetails = res.data;
        this.getOrderDetails();
        
      },
      error:(e)=>{
        console.log("Error", e)
        this.router.navigate(['/admin/orders'])
      }
    })
  }
  getOrderDetails(){
    // console.log(this.orderDetails)
    this.cloudService.getCartDetais(this.orderDetails.courses).subscribe({
      next:(res:any)=>{
        this.orders = res.data;
        console.log("orders", this.orders)
      }, 
      error:(e)=>{
        console.log("Error in getting Order Details",e)
      }
    })
  }
}
