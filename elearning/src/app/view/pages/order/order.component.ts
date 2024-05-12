import { Component } from '@angular/core';
import { CloudService } from '../../../services/cloud.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  numOfItem!:number;
  courses:String[] = [];
  constructor(private cloudSer: CloudService, private us: UtilityService, private router:Router) { } 

  ngOnInit(): void {
    this.form = new FormGroup({ 
      name:new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      payment:new FormControl("",[Validators.required])
    })
this.us.numOfItem.subscribe(res=>{
  this.numOfItem = res
})

   }

  form!:FormGroup;
  

  onSubmit(){
    console.log("SUBMITTED", this.form)
    let courseId = this.courses;
    
    if(this.form.valid){
      this.cloudSer.newOrder(this.form.value.name, this.form.value.phone, this.form.value.email,this.form.value.payment).subscribe(
        {next:(res:any)=>{
          console.log("DATA FROM NEXT", res);
          this.us.emptyCart();
          this.us.cartItem();
          alert("Order Successfull !");
          this.router.navigate(['/']);
        },
        complete:()=>{
              console.log("DATA FROM COMPLETE")
        },
        error:(e)=>{
          console.log("Error in saving Data",e)
        }
      })
    }
    

    
  }
}
