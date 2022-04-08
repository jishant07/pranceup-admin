import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    email_id: new FormControl(),
    password: new FormControl(),
    company_name: new FormControl(),
    is_active: new FormControl()
  });
  UpdateUserData(){}
}
