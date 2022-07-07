import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/_services/global.service';
import { MasterService } from 'src/app/_services/master.service';

@Component({
  selector: 'app-add-port',
  templateUrl: './add-port.component.html',
  styleUrls: ['./add-port.component.css']
})
export class AddPortComponent implements OnInit {

  constructor(
    private globalService: GlobalService,
    private masterService: MasterService,
    private router: Router) { }

  ngOnInit(): void {
  }

  formGroup = new FormGroup({
    portName: new FormControl(null,[Validators.required]),
    state: new FormControl(null,[Validators.required]),
    country: new FormControl(null,[Validators.required]),
    isActive: new FormControl(null,[Validators.required])
  });

  fnAddPort(){
    if(!this.formGroup.valid){
      return;
    }

    let formData: any = {};
    Object.keys(this.formGroup.value).forEach(key => {
      if (this.formGroup.value[key] != "" && this.formGroup.value[key] != null) {
        if (key == 'isActive') {   
          //do not add isActive key        
        }
        else {
          formData[key] = this.formGroup.value[key];
        }
      }
    });

    this.masterService.addPort(formData).subscribe((res: any) => {
      if(res != null && res.status == 'success'){
       this.globalService.openSnackBar("Port added successfully");
       this.router.navigate(["/port-list"])
      }
      else{
       this.globalService.openSnackBar("There is some technical problem, try again later")
      }
     },error=>{
       this.globalService.openSnackBar("Error: There is some technical problem, try again later");
       this.globalService.openSnackBar(error);
     });
  }

}
