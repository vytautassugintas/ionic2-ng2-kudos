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

    getTopReceivers(periodInDays: string): Observable<string> {
        return this.http.get(this.receiversUrl, this.getRequestOptions(periodInDays))
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleError);
    }

    getTopSenders(periodInDays: string): Observable<string> {
        return this.http.get(this.sendersUrl, this.getRequestOptions(periodInDays))
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