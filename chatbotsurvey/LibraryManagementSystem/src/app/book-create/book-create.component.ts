import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  bookForm: FormGroup;
  isbn: string = '';


  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }
  question: string;
  questions: string[] = [];
  messageArray = [{user: 'Bot', value: 'Hi!, Welcome to AI based Chat survey system'}];
  answers: string[] = [];
  answer: string;
  response: string;
  quesDet: any;
  index = 0;
  selInfoList = {};
  private record;
  private recording = false;
  private url;
  private error;

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn': [null, Validators.required],

    });

    this.api.getAllSelectedInfos()
      .subscribe(res => {
        console.log('selInfoObj',res);
        this.selInfoList = res;
        console.log("selInfoList is:", this.selInfoList);
        var string =  JSON.stringify(this.selInfoList);
        var result = string .split('(')[0];
        var result2 = string.substring(2,6);
        console.log("json split result", result);
        console.log("json substring result", result2);
        this.api.getQues(result2)
          .subscribe(res => {
            console.log('Questions',res);
            this.quesDet = res;
            console.log(this.quesDet.q1);
            this.questions.push(this.quesDet.q1);
            this.questions.push(this.quesDet.q2);
            this.questions.push(this.quesDet.q3);
            this.questions.push(this.quesDet.q4);
            this.questions.push(this.quesDet.q5);
            console.log(this.questions);
          }, (err) => {
            console.log(err);
          });
      }, (err) => {
        console.log(err);
      });

  }
  askQuestions(i) {
    setTimeout(() => {
      this.question = this.questions[i];
      this.messageArray.push({user: 'Bot', value: this.question});
    }, 2000);
    this.index++;
    if(this.index == 5 )
      this.questions.push("thank you for your feedback");
    if(this.index == 7 ) {
      console.log('thank you');
      this.router.navigate(['/books']);
    }

  }

  onFormSubmit(form: NgForm) {
    this.api.postBook(form)
      .subscribe(res => {
        let id = res['_id'];
       // this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
    this.response = this.answer;
    this.messageArray.push({user: 'You', value: this.response});
    this.answers[this.index] = this.answer;
    this.answer = '';
    console.log(this.index);
    this.askQuestions(this.index);
  }
}
