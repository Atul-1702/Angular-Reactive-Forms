import { AbstractControl, FormControl, ValidationErrors,AsyncValidator } from '@angular/forms';
import { Observable,of } from 'rxjs';

export class CustomValidation {
  
  static space(name: FormControl) {
    if (name.value != null && name.value.indexOf(' ') != -1) {
      return { space: true };
    }
    return null;
  }
  static username(name: AbstractControl){
    let userList = ['atul_1702', 'saanvi-123', 'radha-90', 'aslisona'];
    return new Promise((resolve,reject)=>
     {
       setTimeout(()=>{
          if(userList.includes(name.value))
          {
            resolve({user:true});
          }
          else
          {
            resolve(null);
          }
         
       },5000)
     }
     )  
  }
}
