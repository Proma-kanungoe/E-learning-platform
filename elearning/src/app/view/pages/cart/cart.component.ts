import { Component, OnInit } from '@angular/core';
import { CloudService } from '../../../services/cloud.service';
import { Course } from '../../../model/courses.model';
import { UtilityService } from '../../../services/utility.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartIdArr:String[] =[];
  cart:Course[] =[]
  totalPrice:number = 0;
  constructor(private cloudSer: CloudService, private us: UtilityService){}
ngOnInit(): void {
  const cart = localStorage.getItem("cart");
  if(cart){
    console.log(cart)
    const arr = JSON.parse(cart)
    this.cartIdArr = arr;
    this.fetchCart();
   

  }
}

fetchCart(){
  this.cloudSer.getCartDetais(this.cartIdArr).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.cart = res.data;
      this.calculateTotalPrice()
    },
    error:(e)=>{
      console.log("Error in Fetching Data",e)
    }
  })
}

deleteFromCart(id:String){
  const index = this.cartIdArr.indexOf(id);
  this.cartIdArr.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(this.cartIdArr))
  this.fetchCart();
  this.us.cartItem()


}


calculateTotalPrice(){
  this.cart.forEach(item=>{
    this.totalPrice += Number(item.price)
  })
}
}
