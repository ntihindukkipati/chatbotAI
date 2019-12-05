import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-l-dashboard',
  templateUrl: './l-dashboard.component.html',
  styleUrls: ['./l-dashboard.component.css']
})
export class LDashboardComponent implements OnInit {

  @ViewChild('prof', {static: false}) prof: ElementRef;
  @ViewChild('address', {static: false}) address: ElementRef;
  @ViewChild('phone', {static: false}) phone: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('dProfName', {static: false}) dProfName: ElementRef;
  @ViewChild('eqSet', {static: false}) eqSet: ElementRef;
  @ViewChild('q1', {static: false}) q1: ElementRef;
  @ViewChild('q2', {static: false}) q2: ElementRef;
  @ViewChild('q3', {static: false}) q3: ElementRef;
  @ViewChild('q4', {static: false}) q4: ElementRef;
  @ViewChild('q5', {static: false}) q5: ElementRef;
  @ViewChild('dqSet', {static: false}) dqSet: ElementRef;
  addShown: boolean = false;
  editShown: boolean = false;
  qaddShown: boolean = false;
  quesButtonShow: boolean = false;
  qeditShown: boolean = false;
  delQShown: boolean = false;
  delShown: boolean = false;
  selectedOrg: string;
  orgList : {};
  showEditButton: boolean = true;
  questionShow: boolean = false;
  showProfDet: boolean = false;
  buttonShow: boolean = true;
  showProfOptions: boolean = false;
  showQuesOptions: boolean = false;
  aEmail: any;
  delProfForm: FormGroup;
  editProfForm: FormGroup;
  aProf: any;
  aAddress: any;
  aPhone: any;
  addProfForm: FormGroup;
  editQuesForm: FormGroup;
  takeSelected: string;
  takeSelectedQues: string;
  profDet: any;
  quesDet: any;
  delSelected: string;
  updatedProf = {};
  updatedQues = {};
  profList = {};
  selectedValue: string;
  selectedProf: string;
  selectedDelProf: string;
  selectedDelValue: string;
  selectedQues: string;
  selectedEditQues: string;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addProfForm = this.formBuilder.group({
      'eorgName': [null, Validators.required],
      'a_prof': [null, Validators.required],
      'a_address': [null, Validators.required],
      'a_phone': [null, Validators.required],
      'a_email': [null, Validators.required]
    });

    this.editQuesForm = this.formBuilder.group({
      'qSet': [null, Validators.required],
      'q1': [null, Validators.required],
      'q2': [null, Validators.required],
      'q3': [null, Validators.required],
      'q4': [null, Validators.required],
      'q5': [null, Validators.required]
    });

    this.editProfForm = this.formBuilder.group({
      'e_prof': [null, Validators.required],
      'e_address': [null, Validators.required],
      'e_phone': [null, Validators.required],
      'e_email': [null, Validators.required]
    });

    this.delProfForm = this.formBuilder.group({
      'dProfName': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.delProfForm.reset();
    this.editProfForm.reset();
    this.addProfForm.reset();
    this.editQuesForm.reset();
  }

  showAddProf() {
    this.addShown = ! this.addShown;
    this.editShown = false;
    this.delShown = false;
    this.api.getAllOrgs()
      .subscribe(res => {
        console.log(res);
        this.orgList = res;
        console.log('orglist is:', this.orgList);
      }, (err) => {
        console.log(err);
      });
  }
  showEditProf() {
    this.editShown = ! this.editShown;
    this.addShown = false;
    this.delShown = false;
    this.api.getAllProfs()
      .subscribe(res => {
        console.log('professors',res);
        this.profList = res;
        console.log("profList is:", this.profList);
      }, (err) => {
        console.log(err);
      });


  }
  showDelProf() {
    this.delShown = ! this.delShown;
    this.editShown = false;
    this.addShown = false;
    this.api.getAllProfs()
      .subscribe(res => {
        console.log('professors',res);
        this.profList = res;
        console.log("profList is:", this.profList);
      }, (err) => {
        console.log(err);
      });
  }
  addProf(profForm) {
    this.aProf = this.prof.nativeElement.value;
    this.aAddress = this.address.nativeElement.value;
    this.aEmail = this.email.nativeElement.value;
    this.aPhone = this.phone.nativeElement.value;
    if (this.aProf.length <= 0 || this.aAddress.length <= 0 || this.aEmail.length <= 0 || this.aPhone.length <= 0 ) {
      alert('Please fill all the fields');
    } else {
      console.log('profName:' + this.aProf);
      alert('Professor added successfully');
    }
    this.api.addProf(profForm)
      .subscribe(res => {
        let id = res['_id'];
        console.log("in add prof");
        this.addProfForm.reset();
        this.addProfForm.markAsPristine();
        this.addProfForm.markAsUntouched();
      }, (err) => {
        console.log(err);
      });
  }


  getSelectedValue(){
    this.selectedValue=this.selectedProf;
    console.log('value is ',this.selectedValue);
    this.takeSelected = this.selectedValue;
    this.api.getProf(this.selectedValue)
      .subscribe(res => {
        console.log(res);
        this.profDet = res;
      }, (err) => {
        console.log(err);
      });
  }

  editProf() {
    this.showProfDet = ! this.showProfDet;
    this.showEditButton = false;
  }
  saveProfessor(editProfForm) {
    this.showEditButton = true;
    this.showProfDet = false;
    alert("Professor saved successfully");
    console.log("form ",editProfForm);
    console.log("value", this.takeSelected);
    this.api.updateProf(this.takeSelected, this.profDet)
      .subscribe(res => {
        console.log(res);
        this.updatedProf = res;
        this.editProfForm.reset();
        this.editProfForm.markAsPristine();
        this.editProfForm.markAsUntouched();
      }, (err) => {
        console.log(err);
      });
  }

  showProf() {
    this.showProfOptions = ! this.showProfOptions;
    this.showQuesOptions = false;
    this.qeditShown = false;
    this.delQShown = false;
    this.qaddShown = false;
    this.quesButtonShow= false;
  }
/*On click of Questions tab*/
  showQues() {
    this.qeditShown = true;
    this.questionShow = false;
    this.quesButtonShow= true;
    this.showProfOptions= false;
    this.delShown = false;
    this.editShown = false;
    this.addShown = false;
    /*this.showQuesOptions = ! this.showQuesOptions;
    this.showProfOptions = false;
    this.editShown = false;
    this.delShown = false;
    this.addShown = false;*/
  }

  deleteSelectedOption(){
    this.selectedDelValue=this.selectedDelProf;
    console.log('selected professor to be deleted',this.selectedDelProf);
    /*this.delSelected = this.selectedDelProf;*/
  }

  delProf() {
    /*this.aProf = this.aProf.nativeElement.value;*/
    console.log('to be deleted' + this.selectedDelValue);
    this.api.deleteProf(this.selectedDelValue)
      .subscribe(res => {
        console.log(res);
        this.updatedProf = res;
        this.delProfForm.reset();
        this.delProfForm.markAsPristine();
        this.delProfForm.markAsUntouched();
      }, (err) => {
        console.log(err);
      });
    alert('Deleted Successfully');
  }
  showAddQues() {
    this.qaddShown = ! this.qaddShown;
    this.qeditShown = false;
    this.delQShown = false;
  }
  showEditQues() {
    this.qeditShown = ! this.qeditShown;
    this.qaddShown = false;
    this.delQShown = false;
  }
  showDelQues() {
    this.delQShown = ! this.delQShown;
    this.qeditShown = false;
    this.qaddShown = false;
  }

  getSelectedQuestionValue(){
    this.selectedEditQues=this.selectedQues;
    console.log('value is ',this.selectedQues);
    this.takeSelectedQues = this.selectedEditQues;
    this.api.getQues(this.selectedEditQues)
      .subscribe(res => {
        console.log('response is: ',res);
        this.quesDet = res;
        console.log('quesdet',this.quesDet);
      }, (err) => {
        console.log(err);
      });
  }
  /*addQuestions() {
    if (this.eqSet.nativeElement.value.length <= 0 || this.q1.nativeElement.value.length <= 0
    || this.q2.nativeElement.value.length <= 0 || this.q2.nativeElement.value.length <= 0
    || this.q3.nativeElement.value.length <= 0 || this.q4.nativeElement.value.length <= 0 || this.q5.nativeElement.value.length <= 0) {
      alert('Fill all the questions');
    } else {
      alert('Questions added successfully');
    }

  }*/

  editQuestions() {
      this.questionShow = ! this.questionShow;
      this.buttonShow = false;
      this.quesButtonShow = false;
    /*console.log("SEnding email ");
    this.api.sendEmail()
      .subscribe(res => {
        console.log(res);
        this.sentMail = res;
      }, (err) => {
        console.log(err);
      });*/
  }
hello(editQuesForm){
    console.log('hai');
  this.questionShow = false;
  alert("Questions saved successfully");
  console.log("questionForm ",editQuesForm);
  console.log("value", this.takeSelectedQues);
  this.api.updateQues(this.takeSelectedQues, this.quesDet)
    .subscribe(res => {
      console.log(res);
      this.updatedQues = res;
      this.editQuesForm.reset();
      this.editQuesForm.markAsPristine();
      this.editQuesForm.markAsUntouched();
    }, (err) => {
      console.log(err);
    });
}
  saveQuestion(editQuesForm) {
    alert("hi");
    /*this.buttonShow = true;*/
    this.questionShow = false;
    alert("Questions saved successfully");
    console.log("questionForm ",editQuesForm);
    console.log("value", this.takeSelectedQues);
    this.api.updateQues(this.takeSelectedQues, this.quesDet)
      .subscribe(res => {
        console.log(res);
        this.updatedQues = res;
      }, (err) => {
        console.log(err);
      });
  }

  logout(){
    localStorage.removeItem('name');
    localStorage.setItem('loginFlag', 'false');
    this.router.navigate(['/login']);
    var name = localStorage.getItem('name');
    console.log('localstorage name',name);
  }
  /*delQuestions() {
    if (this.dqSet.nativeElement.value.length <= 0){
      alert('Select a question set');
    } else {
      alert('Questions under this Question Set deleted successfully');
    }

  }*/

}
