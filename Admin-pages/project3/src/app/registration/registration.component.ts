import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  login_accType : String;
  login_username : String;
  login_password : String;
  login_confirmPassword : String;
  login_email : String;
  login_phone : String;
  @ViewChild('confirmpassword', {static: false}) confirmpassword: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;
  @ViewChild('uname', {static: false}) uname: ElementRef;
  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('actType', {static: false}) actType: ElementRef;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      'login_accType': [null, Validators.required],
      'login_username': [null, Validators.required],
      'login_password': [null, Validators.required],
      'login_confirmPassword': [null, Validators.required],
      'login_email': [null, Validators.required],
      'login_phone': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.addRegistration(form)
      .subscribe(res => {
         this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
      });
  }
  register() {
    if (this.name.nativeElement.value.length <= 0 || this.email.nativeElement.value.length <= 0
      || this.password.nativeElement.value.length <= 0 || this.confirmpassword.nativeElement.value.length <= 0) {
      alert('Please fill all the mandatory fields');
    } else {
      if (this.password.nativeElement.value != this.confirmpassword.nativeElement.value) {
        alert('Password does not match');
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
