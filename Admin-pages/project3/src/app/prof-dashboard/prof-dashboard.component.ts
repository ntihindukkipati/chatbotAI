import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { QuestionsComponent } from 'src/app/questions/questions.component';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts'; 
import * as dateformat from 'dateformat';


@Component({
    selector: 'app-prof-dashboard',
    templateUrl: './prof-dashboard.component.html',
    styleUrls: ['./prof-dashboard.component.css']
})
export class ProfDashboardComponent implements OnInit {
    sentMail = {};
    quesForm: FormGroup;
    usrDataList: {};
    lstTUsersLst: any;
    highchartsLine: any;
    chartOptionsLine: any;
    constructor(public dialog: MatDialog, private hc: HttpClient, private api: ApiService, private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.quesForm = this.formBuilder.group({
            'roles': [null, Validators.required],
            'eObj': [null, Validators.required],
            'duration': [null, Validators.required],
            'cName': [null, Validators.required],
            'sEmails': [null, Validators.required]
        });
        this.getUserInfo();
    }
    onFormSubmit(form: NgForm) {
        this.quesForm.reset(this.quesForm.value);
    }

    sendEmail(emailIds: string) {
        console.log("SEnding email ");
        console.log("email ids", emailIds);
        this.api.sendEmail(emailIds)
            .subscribe(res => {
                console.log(res);
                this.sentMail = res;
                alert("Email Sent");
                this.quesForm.reset();
                this.quesForm.markAsPristine();
                this.quesForm.markAsUntouched();
            }, (err) => {
                console.log(err);
            });
    }

    onAdd() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';
        this.dialog.open(QuestionsComponent, dialogConfig);
    }

    logout() {
        localStorage.removeItem('name');
        localStorage.setItem('loginFlag', 'false');
        this.router.navigate(['/login']);
        var name = localStorage.getItem('name');
        console.log('localstorage name', name);
    }

    public getUserInfo() {
        this.api.getUserData()
            .subscribe(res => {
                //console.log(res);
                //this.usrDataList = res;
                // console.log("usrDataList is:", this.usrDataList);

                // var lstData = data.filter(function(objDates,index){
                //     objDates.DisplayDate = new Date(objDates.updated_date)
                // })
                var dt="";
                var dtsList=[];
                this.lstTUsersLst = res.filter(function (objEmp) {
                    objEmp.text = objEmp.isbn;
                    objEmp.DisplayDate = dateformat(new Date(objEmp.updated_date),"dd-mmm-yyyy");

                    if(dt!=objEmp.DisplayDate){
                        dt=objEmp.DisplayDate;
                        dtsList.push(dt);
                    }

                    return objEmp
                });

                console.log(this.lstTUsersLst);

                this.loadpertgChart(this.lstTUsersLst,dtsList);

            }, (err) => {
                console.log(err);
            });
    }

    public loadpertgChart(data,dtsList) {
        console.log(dtsList);
        var lstPositive=[];
        var lstNuteral=[];
        var lstNegative=[];
        var chartdata={
            Positives:[],
            Nuterals:[],
            Negatives:[]
        };
        this.hc.put('http://sentimentanalysis34.herokuapp.com', data).subscribe(response =>{
            debugger;
            console.log(response);
            data.filter(function(objdts,index1){
                objdts.nuteralvals = response[index1];                
            }) 
            
            dtsList.filter(function(dt,idx){
                var filterresult = data.filter(function(objData){
                    return objData.DisplayDate == dt;
                })

                var totpositive=0;
                var totnuteral=0;
                var totnegative=0;
                filterresult.filter(function(objdata,index){
                    var lstnutvals = objdata.nuteralvals;
                    if(lstnutvals.length>=2){
                        totpositive = totpositive + parseFloat(lstnutvals[2]);
                        totnuteral = totnuteral + parseFloat(lstnutvals[1]);
                        totnegative = totnegative + parseFloat(lstnutvals[0]);
                    }

                    if(index == filterresult.length-1){
                        var postval = parseFloat(((totpositive/filterresult.length)*100).toFixed(2));
                        var nutetval = parseFloat(((totnuteral/filterresult.length)*100).toFixed(2));
                        var negatval = parseFloat(((totnegative/filterresult.length)*100).toFixed(2));

                        lstPositive.push(postval);
                        lstNuteral.push(nutetval);
                        lstNegative.push(negatval);
                    }
                })

                if(idx==dtsList.length-1){
                    chartdata.Positives = lstPositive;
                    chartdata.Nuterals = lstNuteral;
                    chartdata.Negatives = lstNegative;
                }
            })

            this.perLineChart(dtsList,chartdata);
        });        
    }

    perLineChart(dtsList,chartdata) {
        this.highchartsLine = Highcharts;
        this.chartOptionsLine = {
            chart: {
                type: "spline"
            },
            title: {
                text: "Feedback Analysis"
            },
            xAxis: {
                categories: dtsList
            },
            yAxis: {
                title: {
                    text: "Rating Analysis"
                }
            },
            tooltip: {
                valueSuffix: " Feedback"
            },
            series: [{
                name: 'Positive',
                data: chartdata.Positives //[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            },
            {
                name: 'Nuteral',
                data: chartdata.Nuterals    // [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            },
            {
                name: 'Negative',
                data: chartdata.Negatives       // [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }]
        };
    }


}
