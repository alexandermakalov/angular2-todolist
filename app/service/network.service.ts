import {Injectable}    from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NetworkService {

  constructor(private http: Http) {
  }

  get(url: string, headers?: Headers): Promise<any> {
    return this.http.get(url, {headers})
      .toPromise().catch(this.handleError);
  }

  post(url: string, params: Object, headers?: Headers): Promise<any> {
    return this.http.post(url, params, {headers})
      .toPromise().catch(this.handleError);
  }

  delete(url: string, headers?: Headers): Promise<any> {
    return this.http.delete(url, {headers})
      .toPromise().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('[NetworkService Error]An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
