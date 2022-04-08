import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PieceComponent } from 'src/app/features/piece/piece.component';
import { GlobalService } from 'src/app/_services/global.service';
import { TypeaheadService } from 'src/app/_services/typeahead.service';



@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {

   /* Properties */
   isActivityTypeSelected:boolean = false;
   isTransportModeSelected:boolean = false;
   isExport: boolean = false;
   isTrasnportTypeSea: boolean = false;
     
   countryList:any = []  
   destCountryList:any = []
   destPortsList:any = []
   destFilterPortsList:any = []
   destAirportsList:any = []
   destFilterAirportsList:any = []
   countryOfOriginList:any = []
   countryOfOriginPortsList:any = []
   countryOforiginFilterPortsList: any = []
   countryOfOriginAirportsList:any = []
   countryOfOriginFilterAirportsList:any = []
 
   chargableWeight:any = 0
   cbmWeight:any = 0
 
   updateOrderForm:FormGroup =  new FormGroup({
     modeOfTransport : new FormControl('',[Validators.required]),
     typeOfActivity : new FormControl('',[Validators.required]),
     destCountry : new FormControl(''),
     destCountryId : new FormControl(''),
     destinationPort: new FormControl(''),
     destinationAirport: new FormControl(''),
     countryOfOrigin: new FormControl(''),
     countryOfOriginId: new FormControl(''),
     portOfOrigin: new FormControl(''),
     airportOfOrigin: new FormControl(''),
     incoTerms: new FormControl('',[Validators.required]),
     pieces: new FormArray([
        PieceComponent.makePieceItem()
     ]),
     deliveryType: new FormControl('',[Validators.required])
   });
 
   constructor(public global_service:GlobalService,private typeadhead_service:TypeaheadService) {
     console.log(global_service.typeOfActivity);
     console.log(global_service.modeOfTransport);
    }
 
   ngOnInit(): void {
     this.typeadhead_service.getCountries().subscribe((res:any) =>{
       this.countryList = res.message;
       this.destCountryList = res.message;
       this.countryOfOriginList = res.message;
     })
   }
 
   activityChanged(event:any){
     this.isActivityTypeSelected=true;
     if(event.value == 'Export'){
       this.isExport = true;
       this.updateOrderForm.get('countryOfOrigin')?.removeValidators(Validators.required);
       this.updateOrderForm.get('countryOfOriginId')?.removeValidators(Validators.required);
       this.updateOrderForm.get('countryOfOrigin')?.reset();
       this.updateOrderForm.get('countryOfOriginId')?.reset();
       this.updateOrderForm.get('destCountry')?.addValidators(Validators.required)
       this.updateOrderForm.get('destCountryId')?.addValidators(Validators.required)
       if(this.updateOrderForm.value.modeOfTransport == 'SEA'){
         this.updateOrderForm.get('destinationAirport')?.removeValidators(Validators.required)
         this.updateOrderForm.get('destinationAirport')?.reset();
         this.updateOrderForm.get('destinationPort')?.addValidators(Validators.required)
       }else{
         this.updateOrderForm.get('destinationPort')?.removeValidators(Validators.required)
         this.updateOrderForm.get('destinationPort')?.reset();
         this.updateOrderForm.get('destinationAirport')?.addValidators(Validators.required)
       }
       this.updateOrderForm.updateValueAndValidity();
     }else{
       this.isExport = false;
       this.updateOrderForm.get('destCountry')?.removeValidators(Validators.required);
       this.updateOrderForm.get('destCountryId')?.removeValidators(Validators.required)
       this.updateOrderForm.get('destCountry')?.reset();
       this.updateOrderForm.get('destCountryId')?.reset();
       this.updateOrderForm.get('countryOfOrigin')?.addValidators(Validators.required)
       this.updateOrderForm.get('countryOfOriginId')?.addValidators(Validators.required)
       if(this.updateOrderForm.value.modeOfTransport == 'SEA'){
         this.updateOrderForm.get('airportOfOrigin')?.removeValidators(Validators.required)
         this.updateOrderForm.get('airportOfOrigin')?.reset();
         this.updateOrderForm.get('portOfOrigin')?.addValidators(Validators.required)
       }else{
         this.updateOrderForm.get('portOfOrigin')?.removeValidators(Validators.required)
         this.updateOrderForm.get('portOfOrigin')?.reset();
         this.updateOrderForm.get('airportOfOrigin')?.addValidators(Validators.required)
       }
       this.updateOrderForm.updateValueAndValidity();
     }
   }
 
   get pieceArray(){
     return this.updateOrderForm.get('pieces') as FormArray;
   }
 
   addNewPackageType(){
     this.pieceArray.push(PieceComponent.makePieceItem())  
   }
 
   destCountryTypeAhead(){
     let term = this.updateOrderForm.value.destCountry
     term = term.toLowerCase();
     this.destCountryList = this.countryList.filter(function(item:any){
       return item.countryName.toLowerCase().indexOf(term) == -1 ? false : true
     })
   }
   
   countryOfOriginTypeahead(){
     let term = this.updateOrderForm.value.countryOfOrigin
     term = term.toLowerCase();
     this.countryOfOriginList = this.countryList.filter(function(item:any){
       return item.countryName.toLowerCase().indexOf(term) == -1 ? false : true
     })
   }
 
   calculateChargableWeight(type:string){
     this.chargableWeight = 0;
     this.cbmWeight = 0;
     if(type == "AIR"){
       this.pieceArray.controls.forEach(control =>{
         let controlWeight = control.value.grossWeight * control.value.noOfPieces;
         this.chargableWeight = this.chargableWeight + (controlWeight)
       })
     }else{
       this.pieceArray.controls.forEach(control =>{
         let controlWeight = control.value.grossWeight * control.value.noOfPieces;
         this.cbmWeight = this.cbmWeight + (controlWeight)
       })
     }
   }
 
   destinationCountrySelected(event:any){
     let value = event.option.value
     this.updateOrderForm.patchValue({
       destCountryId: value.id,
       destCountry: value.countryName
     })
     this.typeadhead_service.getAirportByCountry(value.id).subscribe((res:any) =>{
       this.destAirportsList = res.message
       this.destFilterAirportsList = res.message
     })
     this.typeadhead_service.getPortsByCountry(value.id).subscribe((res:any) =>{
       this.destPortsList = res.message
       this.destFilterPortsList = res.message
     })
   }
 
   countryOfOriginSelected(event:any){
     let value = event.option.value
     this.updateOrderForm.patchValue({
       countryOfOriginId: value.id,
       countryOfOrigin: value.countryName
     })
     this.typeadhead_service.getAirportByCountry(value.id).subscribe((res:any) =>{
       this.countryOfOriginAirportsList = res.message
       this.countryOfOriginFilterAirportsList = res.message
     })
     this.typeadhead_service.getPortsByCountry(value.id).subscribe((res:any) =>{
       this.countryOfOriginPortsList = res.message
       this.countryOforiginFilterPortsList = res.message
     })
   }
 
   destAirportTypeAhead(){
     let term = this.updateOrderForm.value.destinationAirport
     term = term.toLowerCase();
     this.destFilterAirportsList = this.destAirportsList.filter(function(item:any){
       console.log(item);
       return item.airportName.toLowerCase().indexOf(term) == -1 ? false : true
     })
   }
 
   destPortTypeAhead(){
     let term = this.updateOrderForm.value.destinationPort
     term = term.toLowerCase();
     this.destFilterPortsList = this.destPortsList.filter(function(item:any){
       console.log(item);
       return item.portName.toLowerCase().indexOf(term) == -1 ? false : true
     })
   }
 
   countryOfOriginAirportTypeahead(){
     let term = this.updateOrderForm.value.airportOfOrigin
     term = term.toLowerCase();
     this.countryOfOriginFilterAirportsList = this.countryOfOriginAirportsList.filter((item:any) =>{
       return item.airportName.toLowerCase().indexOf(term) == -1 ? false : true
     })
   }
 
   countryOfOriginPortTypeahead(){
     let term = this.updateOrderForm.value.portOfOrigin
     term = term.toLowerCase();
     this.countryOforiginFilterPortsList = this.countryOforiginFilterPortsList.filter((item:any) =>{
       return item.portName.toLowerCase().indexOf(term) == -1 ? false : true;
     })
   }
 
   estimateSubmit(){
     if(this.updateOrderForm.value.modeOfTransport == 'AIR'){
       this.calculateChargableWeight("AIR");
     }else{
       this.calculateChargableWeight("SEA")
     }
     let temp:any = {}
     Object.keys(this.updateOrderForm.value).forEach(key =>{
       if(this.updateOrderForm.value[key] != "" && this.updateOrderForm.value[key] != null)temp[key] = this.updateOrderForm.value[key];
     })
     console.log(temp)
   }
   transportModeChanged(event:any){
     this.isTransportModeSelected=true;
     if(event.value.toLowerCase() =='sea'){
       this.isTrasnportTypeSea=true;
     }
     else{
       this.isTrasnportTypeSea=false;
     }
   }

}
