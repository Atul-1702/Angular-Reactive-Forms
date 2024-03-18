import { Component } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CustomValidation } from './custom validations/space.validation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reactive-Forms';
  formData;
  reactiveForm:FormGroup;
  cardStatus:boolean=false;
  ngOnInit()
  {
    this.reactiveForm=new FormGroup({
      firstname:new FormControl(null,[Validators.required,CustomValidation.space]),
      lastname:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.pattern('.*(@gmail.com)')]),
      username:new FormControl(null,[Validators.required,Validators.pattern("[a-zA-z]+[-_]{1}[0-9]+")],CustomValidation.username),
      dob:new FormControl(null,Validators.required),
      gender:new FormControl(null,Validators.required),
      address:new FormGroup({
        street1:new FormControl(null,Validators.required),
        street2:new FormControl(null),
        country:new FormControl('India',Validators.required),
        city:new FormControl(null,Validators.required),
        region:new FormControl(null),
        pincode:new FormControl(null,[Validators.required,Validators.pattern("[0-9]{6}")])
      }),
      checkbox:new FormControl(false),
      skills:new FormArray([
         new FormControl('Angular'),
         
      ]),
      job:new FormArray([
        new FormGroup({
          company:new FormControl(null),
          role:new FormControl('Software Developer'),
          experience:new FormControl(null),
          start:new FormControl(null),
          end:new FormControl(null)
        })
      ])
    })
     this.reactiveForm.get('username').statusChanges.subscribe((data)=>
     {
      console.log(data);
     }
     )
  }
  onFormSubmitted(){
    this.formData=this.reactiveForm.value;
    this.cardStatus=true;
    this.reactiveForm.reset();
  }
  onAddSkillsButtonClicked()
  {
      (<FormArray>this.reactiveForm.get('skills')['controls']).push(new FormControl(null));
     
  }
  onAddExperienceButtonClicked()
  {
       (<FormArray>this.reactiveForm.get('job')['controls']).push(new FormGroup({
        company:new FormControl(null),
        role:new FormControl('Software Developer'),
        experience:new FormControl(null),
        start:new FormControl(null),
        end:new FormControl(null)
       }))
  }
  onDeleteExperienceButtonClicked(i:number)
  {
    (<FormArray>this.reactiveForm.get('job')).removeAt(i);
  }
  onCreateUsernameButtonClicked()
  {
     let username='';
     username+=(<string>this.reactiveForm.get('firstname').value).slice(0,4);
     username+=(<string>this.reactiveForm.get('lastname').value).slice(0,3);
     let date=(this.reactiveForm.get('dob').value);
     username+=new Date(date).getFullYear();
     /*this.reactiveForm.setValue({
       firstname:this.reactiveForm.get('firstname').value,
       lastname:this.reactiveForm.get('lastname').value,
       dob:this.reactiveForm.get('dob').value,
       username:username,
       email:'',
       gender:'',
       address:{
         street1:'',
         street2:'',
         country:'',
         city:'',
         pincode:'',
         region:'',
       },
       skills:[null],
       job:[{
        company:'',
        role:'',
        experience:'',
        start:'',
        end:''
       }],
       checkbox:''
     })
     */
    this.reactiveForm.patchValue({
      username:username,
      address:{
        country:'Nepal'
      },
      skills:['React'],
      job:[{
        
      },{
        company:'Moragan Stanely'
      }]
    })
  }

}
