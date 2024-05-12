import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CloudService } from '../../../services/cloud.service';
import { UtilityService } from '../../../services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
constructor(private cloudSer: CloudService, private us:UtilityService, private router:Router){}

form!:FormGroup;
ngOnInit(): void {
  this.form = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })
}


onSubmit(){
if(this.form.valid){
  this.cloudSer.login(this.form.value.email, this.form.value.password).subscribe({
    next:(res:any)=>{
      this.us.setToken(res.user.token)
      this.router.navigate(['/admin'])

    },
    error:(e)=>{
      console.log("USER ERROR", e)
    }
  })
}
}
}
