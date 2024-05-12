import { Component } from '@angular/core';
import { CloudService } from '../../../services/cloud.service';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  courses:String[] = [];
  constructor(private cloudSer: CloudService) { } 

  ngOnInit(): void {
    this.form = new FormGroup({ 
      name:new FormControl(""),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required])
    })
   }

  form!:FormGroup;
  

  onSubmit(){
    console.log("SUBMITTED", this.form)
    let courseId = this.courses;
    
    this.cloudSer.newOrder(this.form.value.name, this.form.value.phone, this.form.value.email, this.form.value.payment).subscribe(
      {next:(res:any)=>{
        console.log("DATA FROM NEXT", res)
      },
      complete:()=>{
            console.log("DATA FROM COMPLETE")
      },
      error:(e)=>{
        console.log("Error in saving Data",e)
      }
    }

    )
  }
}
