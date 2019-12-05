import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  quesSets = {};
  quesSelForm: FormGroup;
  takeSelected: string;
  quesId: any;
  quesDet = {};
  constructor(public dialogRef: MatDialogRef<QuestionsComponent>, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.quesSelForm = this.formBuilder.group({
      'quesSet': [null, Validators.required]
    });

    this.api.getQuestions()
      .subscribe(res => {
        console.log(res);
        this.quesSets = res;
      }, (err) => {
        console.log(err);
      });
  }
  onSelectionChange(selectedValue:string){
    console.log('value is ',selectedValue);
    this.takeSelected = selectedValue;
    var det = new Array(selectedValue, "prof");
    var quesDet = det.join(",");
    console.log(quesDet);
    var jsonString = JSON.stringify(quesDet);
    console.log("json string",jsonString);
    var jsonKey = '{"selInfo":';
    console.log('jsonKey: '+jsonKey);
    var det1 = jsonKey.concat(jsonString);
    console.log('det1', det1);
    var det2 = det1.concat('}');
    console.log('det2: '+det2);
   var quesObj = JSON.parse(det2);
   console.log('json obj',quesObj);
    this.api.addSelQues(quesObj)
      .subscribe(res => {
        console.log(res);
        this.quesDet = res;
      }, (err) => {
        console.log(err);
      });
  }
  onClose() {
    this.dialogRef.close();
  }

  onFormSubmit(value: any) {

  }
}
