import {Injectable}    from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NetworkService {

  constructor(private http: Http) {
  }

  get(url: string, headers?: Headers): Observable<any> {
    return this.http.get(url, {headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  post(url: string, params: Object, headers?: Headers): Observable<any> {
    return this.http.post(url, params, {headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  delete(url: string, headers?: Headers): Observable<any> {
    return this.http.delete(url, {headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
