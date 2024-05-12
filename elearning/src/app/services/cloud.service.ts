import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CloudService {

   SERVER_URL:String = "http://localhost:5001/api"
  constructor(private http: HttpClient) { }

  // USER LOGIN
  login(email:String, password:String){
    return this.http.post(`${this.SERVER_URL}/user/login`, {email, password})
  }
   signup(email:String,name:String, password:String){
    return this.http.post(`${this.SERVER_URL}/user/create`, {email,name, password})
  }
  signout(){
    return this.http.get(`${this.SERVER_URL}/user/signout`);
  }

  isAuth(){
    return this.http.get(`${this.SERVER_URL}/user/isAuth`).subscribe({
      next:(res:any)=>{
        if(res.success){
          return true;
        }else{
          return false;
        }
      },
      error:(e)=>{
        return false
      }
    })
   
  }

  // COURSES
  addCourse(title:String, description:String, type:String, date:String,price:String){
    return this.http.post(`${this.SERVER_URL}/courses/add`,{title, description, type, date, price})
  }

  getCourses(){
    return this.http.get(`${this.SERVER_URL}/courses/all`);
  }

  getCartDetais(idArr: String[]){
    return this.http.post(`${this.SERVER_URL}/courses/cart`,{idArr})
  }


  
  // ORDERS
  newOrder(name:String, phone:String, email:String,payment:String){
    let cart = localStorage.getItem("cart")
    let courses:String[] = [];
    if(cart){
     courses =JSON.parse(cart);
    }
    return this.http.post(`${this.SERVER_URL}/order/new`,{name, phone, email,payment, courses})
  }

  getOrders(){
    return this.http.get(`${this.SERVER_URL}/order/all`);
  }

  getSingleOrder(id:String){
    return this.http.get(`${this.SERVER_URL}/order/get/${id}`)
  }





}
