import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild('lname', {static: false}) lname: ElementRef;
  @ViewChild('lpassword', {static: false}) lpassword: ElementRef;
  name: any;
  password: any;
  loginName: string;
  loginPassword: string;
  loginDet: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'lname': [null, Validators.required],
      'lpassword': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
  }
  login() {
    console.log('username',this.loginName);
    /*localStorage.setItem('name', this.name.nativeElement.value);
    localStorage.setItem('password', this.password.nativeElement.value);
    localStorage.setItem('actType', this.actType.nativeElement.value),*/
    /*this.lname = this.name.nativeElement.value;
    this.lpassword = this.password.nativeElement.value;*/
    this.api.getLoginDet(this.loginName)
      .subscribe(res => {
        console.log(res);
        this.loginDet = res;
        localStorage.setItem('name', this.loginName);
        localStorage.setItem('loginFlag', 'true');
        var name = localStorage.getItem('name');
        console.log('localstorage name',name);
        if(this.loginDet.login_accType === 'Organisation Admin') {
          this.router.navigate(['/l-dashboard']);
        } else if (this.loginDet.login_accType === 'Global Admin') {
          this.router.navigate(['/g-dashboard']);
        } else if (this.loginDet.login_accType === 'Professor') {
          this.router.navigate(['/prof-dashboard']);
        }
        console.log('response for login is', this.loginDet);
      }, (err) => {
        console.log(err);
      });
    /*var name = localStorage.getItem('name');
    var pass = localStorage.getItem('password');*/

  }

  register() {
    this.router.navigate(['/register']);
  }

}
