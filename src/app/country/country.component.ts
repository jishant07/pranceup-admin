import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  countryForm = new FormGroup({
    country: new FormControl(),
    isActive: new FormControl(''),
  })

  AddCountry(){

  }
}
