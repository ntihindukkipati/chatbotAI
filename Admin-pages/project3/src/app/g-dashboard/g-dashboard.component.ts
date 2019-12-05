import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-g-dashboard',
  templateUrl: './g-dashboard.component.html',
  styleUrls: ['./g-dashboard.component.css']
})
export class GDashboardComponent implements OnInit {
  addOrgForm: FormGroup;
  @ViewChild('orgName', {static: false}) orgName: ElementRef;
  @ViewChild('city', {static: false}) city: ElementRef;
  @ViewChild('state', {static: false}) state: ElementRef;
  @ViewChild('zip', {static: false}) zip: ElementRef;
  @ViewChild('dorgName', {static: false}) dorgName: ElementRef;
  addShown: boolean = false;
  editShown: boolean = false;
  delShown: boolean = false;
  showOrg: boolean = false;
  showButton: boolean = true;
  oName: any;
  delOrgName: any;
  ocity: any;
  ostate: any;
  ozip: any;
  editOrgForm: FormGroup;
  delOrgForm: FormGroup;
  updatedOrg = {};
  deletedOrg = {};
  orgDet : any;
  orgList : {};
  takeSelected: string;
  takeDelSelected: string;
  /*delSelected: string;*/
  selectedOrg: string;
  selectedDelOrg: string;
  selectedValue: string;
  selectedDelValue: string;
  all: string;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addOrgForm = this.formBuilder.group({
      'g_orgName': [null, Validators.required],
      'g_city': [null, Validators.required],
      'g_state': [null, Validators.required],
      'g_zip': [null, Validators.required]
    });

    this.editOrgForm = this.formBuilder.group({
      'eorgName': [null, Validators.required],
      'e_city': [null, Validators.required],
      'e_state': [null, Validators.required],
      'e_zip': [null, Validators.required]
    });

    this.delOrgForm = this.formBuilder.group({
      'dorgName': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.addOrgForm.reset();
    this.editOrgForm.reset();
    this.delOrgForm.reset();
  }

  showAddOrg() {
    this.addShown = ! this.addShown;
    this.editShown = false;
    this.delShown = false;
  }

  showDelOrg() {
    this.delShown = ! this.delShown;
    this.editShown = false;
    this.addShown = false;
  }
  addOrg(addForm) {
    this.oName = this.orgName.nativeElement.value;
    this.ocity = this.city.nativeElement.value;
    this.ostate = this.state.nativeElement.value;
    this.ozip = this.zip.nativeElement.value;
    if (this.oName.length <= 0 || this.ocity.length <= 0 || this.ostate.length <= 0 || this.ozip.length <= 0 ) {
      alert('Please fill all the fields');
    } else {
      console.log('orgName:' + this.oName);
      alert('Organisation added successfully');

    }
    console.log("in submit method")
    this.api.addGlobalOrg(addForm)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/g-dashboard']);
        this.addOrgForm.reset();
        this.addOrgForm.markAsPristine();
        this.addOrgForm.markAsUntouched();
      }, (err) => {
        console.log(err);
      });
  }

  showEditOrg() {
    this.editShown = ! this.editShown;
    this.addShown = false;
    this.delShown = false;
    this.all = "all";
    this.api.getAllOrgs()
      .subscribe(res => {
        console.log(res);
        this.orgList = res;
        console.log("orglist is:", this.orgList);
      }, (err) => {
        console.log(err);
      });
  }

  getSelected(){
    this.selectedValue=this.selectedOrg;
    console.log('value is ',this.selectedValue);
    this.takeSelected = this.selectedValue;
    this.api.getGlobalOrgs(this.selectedValue)
      .subscribe(res => {
       /* let id = res['_id'];
        this.router.navigate(['/g-dashboard', id]);*/
       console.log(res);
       this.orgDet = res;
      }, (err) => {
        console.log(err);
      });
  }

  editOrg(){
    this.showOrg = ! this.showOrg;
    this.showButton = false;
  }


  saveOrganisation(editForm) {
    alert("Organisation saved successfully");
    this.showOrg = false;
    this.showButton = true;
    console.log("form",editForm);
    console.log("value", this.takeSelected);
    this.api.updateGlobalOrgs(this.takeSelected, this.orgDet)
      .subscribe(res => {
        console.log(res);
        this.updatedOrg = res;
        this.editOrgForm.reset();
        this.editOrgForm.markAsPristine();
        this.editOrgForm.markAsUntouched();
      }, (err) => {
        console.log(err);
      });

  }
  deleteSelected(){
    this.selectedDelValue=this.selectedDelOrg;
    console.log('value is ',this.selectedDelValue);
    this.takeDelSelected = this.selectedDelValue;
    this.api.getGlobalOrgs(this.selectedDelValue)
      .subscribe(res => {
        console.log(res);
        this.orgDet = res;
      }, (err) => {
        console.log(err);
      });
  }


  delOrg() {
    /*this.delOrgName = this.dorgName.nativeElement.value;*/
    console.log('deleted' + this.selectedDelValue);
    this.api.deleteGlobalOrg(this.selectedDelValue)
      .subscribe(res => {
        console.log(res);
        this.deletedOrg = res;
        this.delOrgForm.reset();
        this.delOrgForm.markAsPristine();
        this.delOrgForm.markAsUntouched();
      }, (err) => {
        console.log(err);
      });
    alert('Deleted Successfully');
  }
  logout(){
    localStorage.removeItem('name');
    localStorage.setItem('loginFlag', 'false');
    this.router.navigate(['/login']);
    var name = localStorage.getItem('name');
    console.log('localstorage name',name);
  }
}
