import {Injectable}     from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable, Subject}     from 'rxjs';
import {ResponseExtractor} from "./utils/ResponseExtractor";
import {API} from "../api.config";

@Injectable()
export class ChallengesService {

    private challengeAcceptedSource = new Subject<any>();
    private challengeSentSource = new Subject<any>();

    challengeAccepted$ = this.challengeAcceptedSource.asObservable();
    challengeSent$ = this.challengeSentSource.asObservable();

    private sendChallengeUrl = API.URL + 'challenge/give';
    private newChallengesUrl = API.URL + 'challenge/sentAndReceived';
    private ongoingChallengesUrl = API.URL + 'challenge/ongoing';
    private challengesUrl = API.URL + 'challenge/';
    private challengesHistoryUrl = API.URL + 'challenge/history';
    private challengesAccomplishedHistoryUrl = API.URL + 'challenge/history/accomplished';
    private challengesFailedHistoryUrl = API.URL + 'challenge/history/failed';

    private userChallengesHistoryUrl = API.URL + 'challenge/history/';
    private userChallengesAccomplishedHistoryUrl = API.URL + 'challenge/history/accomplished/';
    private userChallengesFailedHistoryUrl = API.URL + 'challenge/history/failed/';

    private challengeCommentsUrl = API.URL + 'challenge/'; //{/{challengeId}/comments}


    constructor(private http: Http) {
    }

    challengeAccepted(mission: any) {
        this.challengeAcceptedSource.next(mission);
    }

    challengeSent(astronaut: any) {
        this.challengeSentSource.next(astronaut);
    }

    getUserChallengesHistory(id: string, page: number, pageSize: number, type: string){
        let headers = new Headers({'Content-Type': 'application/json'});
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page.toString());
        params.set('size', pageSize.toString());
        let options = new RequestOptions({headers: headers, withCredentials: true, search : params});

        return this.http.get(this.getUserHistoryUrl(type) + id, options)
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleError);
    }

    getComments(challengeId: string, page: number, pageSize: number) : Observable<any>{
        let headers = new Headers({'Content-Type': 'application/json'});
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page.toString());
        params.set('size', pageSize.toString());
        let options = new RequestOptions({headers: headers, withCredentials: true, search : params});

        return this.http.get(this.challengeCommentsUrl + challengeId + '/comments', options)
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleError);
    }

    sendChallenge(challengeForm: any): Observable<any>{
        let body = JSON.stringify(challengeForm);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.sendChallengeUrl, body, options)
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleSimpleError);
    }

    getNewChallenges(page: number, pageSize: number): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page.toString());
        params.set('size', pageSize.toString());
        let options = new RequestOptions({headers: headers, withCredentials: true, search : params});

        return this.http.get(this.newChallengesUrl, options)
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleError);
    }

    getOngoingChallenges(page: number, pageSize: number): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page.toString());
        params.set('size', pageSize.toString());
        let options = new RequestOptions({headers: headers, withCredentials: true, search : params});

        return this.http.get(this.ongoingChallengesUrl, options)
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleError);
    }

    getHistory(page: number, pageSize: number): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page.toString());
        params.set('size', pageSize.toString());
        let options = new RequestOptions({headers: headers, withCredentials: true, search : params});

        return this.http.get(this.challengesHistoryUrl, options)
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleError);
    }



    getAccomplishedHistory(page: number, pageSize: number): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page.toString());
        params.set('size', pageSize.toString());
        let options = new RequestOptions({headers: headers, withCredentials: true, search : params});

        return this.http.get(this.challengesAccomplishedHistoryUrl, options)
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleError);
    }

    getFailedHistory(page: number, pageSize: number): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page.toString());
        params.set('size', pageSize.toString());
        let options = new RequestOptions({headers: headers, withCredentials: true, search : params});

        return this.http.get(this.challengesFailedHistoryUrl, options)
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleError);
    }

    acceptChallenge(challengeId: string){
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.challengesUrl + challengeId + "/accept", null, options)
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleError);
    }

    declineChallenge(challengeId: string){
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.challengesUrl + challengeId + "/decline", null, options)
            .map(ResponseExtractor.extractSucces)
            .catch(ResponseExtractor.handleError);
    }

    cancelChallenge(challengeId: string){
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.challengesUrl + challengeId + "/cancel", null, options)
            .map(ResponseExtractor.extractSucces)
            .catch(ResponseExtractor.handleError);
    }

    completeChallenge(challengeId: string){
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.challengesUrl + challengeId + "/markAsCompleted", null, options)
            .map(ResponseExtractor.extractSucces)
            .catch(ResponseExtractor.handleError);
    }

    markAsFailedChallenge(challengeId: string){
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.challengesUrl + challengeId + "/markAsFailed", null, options)
            .map(ResponseExtractor.extractSucces)
            .catch(ResponseExtractor.handleError);
    }

    private getUserHistoryUrl(type:string){
        if (type == 'ACCOMPLISHED'){
            return this.userChallengesAccomplishedHistoryUrl;
        } else if (type == 'FAILED'){
            return this.userChallengesFailedHistoryUrl;
        } else {
            return this.userChallengesHistoryUrl;
        }
    }

}