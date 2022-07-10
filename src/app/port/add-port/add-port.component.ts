import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { PortsModel } from 'src/app/_models/model';
import { GlobalService } from 'src/app/_services/global.service';
import { MasterService } from 'src/app/_services/master.service';

@Component({
  selector: 'app-add-port',
  templateUrl: './add-port.component.html',
  styleUrls: ['./add-port.component.css']
})
export class AddPortComponent implements OnInit {
  formGroup: FormGroup;
  action: string = this.globalService.lblAdd;
  id: string;
  portModel: PortsModel;
  isLoading: boolean;

  constructor(
    private globalService: GlobalService,
    private masterService: MasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    //get query string    
    this.id = this.activatedRoute.snapshot.params['id'];

    //check for action = Add/Edit( if id is null then "Add" else "Edit")
    if (!this.id){
      this.action = this.globalService.lblAdd;
    } 
    else{
      //action = Edit, getData
      this.fnGetData();
    }
  }

  initializeForm(){
    this.formGroup = new FormGroup({
      portId: new FormControl(null, this.id? [Validators.required]:null),
      portName: new FormControl(null,[Validators.required]),
      state: new FormControl(null,[Validators.required]),
      country: new FormControl(null,[Validators.required]),
      express: new FormGroup({
        gen: new FormControl(null,[Validators.required]),
        haz: new FormControl(null,[Validators.required])
      }),
      normal: new FormGroup({
        gen: new FormControl(null,[Validators.required]),
        haz: new FormControl(null,[Validators.required])
      }),
      isActive: new FormControl(null,[Validators.required]),
    });
  }

  fnGetData(){
    this.action = this.globalService.lblEdit;
    this.isLoading = true;
    this.masterService.getPort(this.id)
      .subscribe((res:any) => {
        if(res.status == 'success'){
          this.portModel = res.message;
          this.formGroup.patchValue(this.portModel);
          this.formGroup.patchValue({
            portId: this.id
          });
          this.isLoading = false;
        }
        else{
          this.isLoading = false;
        }
      });
  }

  fnAdd(){
    if(!this.formGroup.valid){
      return;
    }
    this.masterService.addPort(this.formGroup.value).subscribe((res: any) => {
      if(res != null && res.status == 'success'){
       this.globalService.openSnackBar(this.globalService.msgRecordAdded);
       this.router.navigate(["/port-list"])
      }
      else{
       this.globalService.openSnackBar(this.globalService.msgTechnicalIssue)
      }
     },error=>{
       this.globalService.openSnackBar("Error: "+ this.globalService.msgTechnicalIssue);
       this.globalService.openSnackBar(error);
     });
  }

  fnEdit(){    
    if(!this.formGroup.valid){
      return;
    }
    this.masterService.editPort(this.formGroup.value).subscribe((res: any) => {
      if(res != null && res.status == 'success'){
       this.globalService.openSnackBar(this.globalService.msgRecordEdited);
       this.router.navigate(["/port-list"])
      }
      else{
       this.globalService.openSnackBar(this.globalService.msgTechnicalIssue)
      }
     },error=>{
      this.globalService.openSnackBar("Error: "+ this.globalService.msgTechnicalIssue);
       this.globalService.openSnackBar(error);
     });
  }
  
  fnSubmit(){
    if(this.action == this.globalService.lblAdd){
      this.fnAdd();
    }
    else if(this.action == this.globalService.lblEdit){
      this.fnEdit();
    }
  }
}
