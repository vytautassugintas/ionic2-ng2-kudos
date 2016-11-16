import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {ResponseExtractor} from "./utils/ResponseExtractor";
import {API} from "../api.config";

@Injectable()
export class WisdomWallService {
    constructor(private http: Http) {
    }

    private randomIdeaUrl = API.URL +  "wisdomwall/randomIdea";
    private addIdeaUrl = API.URL + "wisdomwall/add";

    addNewIdea(author: string, phrase: string): Observable<string> {
        let body = JSON.stringify({author, phrase});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.addIdeaUrl, body, options)
            .map(ResponseExtractor.extractCallback)
            .catch(ResponseExtractor.handleError);
    }

    getRandomIdea(): Observable<string> {
        return this.http.get(this.randomIdeaUrl, this.getRequestOptions())
            .map(ResponseExtractor.extractJson)
            .catch(ResponseExtractor.handleError);
    }

    private getRequestOptions(): RequestOptions {
        let headers = new Headers();
        return new RequestOptions({headers: headers, withCredentials: true});
    }

}