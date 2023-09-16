import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  versions:any=  [
    {framework:'Angular', version: ['1.1.1', '1.2.1', '1.3.3']},
    {framework:'React', version: ['2.1.2', '3.2.4', '4.3.1']},
    {framework:'Vue', version: ['3.3.1', '5.2.1', '5.1.3']},
  ];
  versionElems:[];
  userForm:FormGroup;
  ngOnInit(): void {
    this.userForm= new FormGroup({
        username: new FormControl(null, [Validators.required, Validators.min(2)]),
        surname: new FormControl(null, [Validators.required, Validators.min(2)]),
        birthday: new FormControl(null, [Validators.required]),  
        frameworkControl:  new FormControl(null, [Validators.required]),
        frameworkVersion:  new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
        hobbies: new FormArray([])
      })
  }
  CheckFramework(f) {
    for(let i =0; i< this.versions.length; i++){
      if(f===this.versions[i].framework){
        this.versionElems = this.versions[i].version
      }
    }
  }

  onSubmit(){
    console.log(this.userForm.value)
    this.userForm.reset()
  }

  onAddHobby(){
    (<FormArray>this.userForm.get('hobbies')).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        duration: new FormControl(null, [Validators.required])
      })
    )
  }

  get controls(){
    return (<FormArray>this.userForm.get('hobbies')).controls
  }

  forbiddenEmails(control: FormControl):Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value ==='test@test.test'){
          resolve({'emailIsForbidden':true})
        }else{
          resolve(null)
        }
      },2000)
    })
    return promise;
  }


}
