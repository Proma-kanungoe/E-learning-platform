import { Component, OnInit } from '@angular/core';
import { CloudService } from '../../../services/cloud.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
constructor(private cloudSer: CloudService){}

form!:FormGroup;
ngOnInit(): void {
  this.form = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]),
    name: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  
  })
}


onSubmit(){
if(this.form.valid){
  this.cloudSer.signup(this.form.value.email, this.form.value.name, this.form.value.password).subscribe({
    next:(res:any)=>{
      console.log("USER LOGIN", res)
    },
    error:(e)=>{
      console.log("USER ERROR", e)
    }
  })
}
}
}
