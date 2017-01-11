import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {ResponseExtractor} from "./utils/ResponseExtractor";
import {API} from "../api.config";

@Injectable()
export class LeaderboardService {
  constructor(private http: Http) {
  }

  private receiversUrl = API.URL + "leaderboard/receivers?";
  private sendersUrl = API.URL + "leaderboard/senders?";
  private endorsementUrl = API.URL + "leaderboard/"; //{{endorsement}

  getTopReceivers(periodInDays: string): Observable<any> {
    return this.http.get(this.receiversUrl, this.getRequestOptions(periodInDays))
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  getTopSenders(periodInDays: string): Observable<any> {
    return this.http.get(this.sendersUrl, this.getRequestOptions(periodInDays))
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  getTopByEndorsement(periodInDays: string, endorsement: string): Observable<any> {
    return this.http.get(this.endorsementUrl + endorsement + "?", this.getRequestOptions(periodInDays))
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  private getRequestOptions(periodInDays: string): RequestOptions {
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();

    if (periodInDays != '') {
      params.set('periodInDays', periodInDays.toString());
    }

    return new RequestOptions({headers: headers, withCredentials: true, search: params});
  }

}
