import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api';
const gapiUrl = '/gapi';
const papiUrl = '/papi';
const qapiUrl = '/qapi';
const sapiUrl = '/sapi';
const uapiUrl = '/uapi';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  selectedQuestion: any;
  professorName : any;
  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  addRegistration(data): Observable<any> {
    console.log(data)
    return this.http.post(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addGlobalOrg(data): Observable<any> {
    console.log(data)
    return this.http.post(gapiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllOrgs(): Observable<any> {
    const url = `${gapiUrl}`;
    console.log("url", url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getGlobalOrgs(orgName: string): Observable<any> {
    const url = `${gapiUrl}/${orgName}`;
    console.log("url", url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateGlobalOrgs(orgName: string, data): Observable<any> {
    const url = `${gapiUrl}/${orgName}`;
    console.log("update url", url);
    return this.http.put(url, data, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  deleteGlobalOrg(orgName: string): Observable<{}> {
    const url = `${gapiUrl}/${orgName}`;
    console.log("delete url", url);
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addProf(data): Observable<any> {
    console.log(data);
    console.log("url", papiUrl);
    return this.http.post(papiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllProfs(): Observable<any> {
    const url = `${papiUrl}`;
    console.log("url", url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getProf(profName: string): Observable<any> {
    const url = `${papiUrl}/${profName}`;
    console.log("url", url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateProf(profName: string, data): Observable<any> {
    const url = `${papiUrl}/${profName}`;
    console.log("update url", url);
    return this.http.put(url, data, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  deleteProf(profName: string): Observable<{}> {
    const url = `${papiUrl}/${profName}`;
    console.log("delete url", url);
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getQues(quesName: string): Observable<any> {
    const url = `${qapiUrl}/${quesName}`;
    console.log("url", url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateQues(quesName: string, data): Observable<any> {
    const url = `${qapiUrl}/${quesName}`;
    console.log("update url", url);
    return this.http.put(url, data, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  sendEmail(emailIds: string): Observable<any> {
    const url = `${qapiUrl}/${emailIds}`;
    console.log("email url", url);
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getQuestions(): Observable<any> {
    const url = `${qapiUrl}`;
    console.log("get url", url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  addSelQues(selQuesInfo){
    console.log('selected question set',selQuesInfo);
    const url = `${sapiUrl}`;
    console.log("url", url);
    return this.http.post(url, selQuesInfo, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));

  }
  getLoginDet(loginName: string): Observable<any> {
    const url = `${apiUrl}/${loginName}`;
    console.log("url", url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getUserData(): Observable<any> {
    const url = `${uapiUrl}`;
    console.log("get url", url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
