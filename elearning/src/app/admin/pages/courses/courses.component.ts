import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CloudService } from '../../../services/cloud.service'

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{

  constructor(private cloudSer: CloudService) { } 

  ngOnInit(): void {
    this.form = new FormGroup({ 
      title:new FormControl(""),
      description: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      date: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required)
    })
   }

  form!:FormGroup;
  

  onSubmit(){
    console.log("SUBMITTED", this.form)
    if(this.form.valid){
    this.cloudSer.addCourse(this.form.value.title, this.form.value.description, this.form.value.type, this.form.value.date,this.form.value.price).subscribe(
      {next:(res:any)=>{
        console.log("DATA FROM NEXT", res)
        alert("Data saved Successfully");
        this.form.reset();
      },
      complete:()=>{
            console.log("DATA FROM COMPLETE")
      },
      error:(e)=>{
        console.log("Error in saving Data",e)
      }
    }

    )
  }else{
    alert("Please check for correct Data!.")
  }
}

}
