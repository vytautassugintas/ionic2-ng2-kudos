import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {API} from "../api.config";
import {ResponseExtractor} from "./utils/ResponseExtractor";

@Injectable()
export class AuthenticationService {

    isAuthenticated:boolean;

    constructor(private http: Http) {
    }

    private loginUrl = API.URL + 'authentication/login';
    private registrationUrl = API.URL + 'authentication/register';
    private confirmationUrl = API.URL + 'authentication/confirm/';
    private resetUrl = API.URL + 'authentication/reset';
    private changePasswordUrl = API.URL + 'authentication/change/password';
    private checkUserUrl = API.URL;

    login(email: string, password: string): Observable<any> {
        let body = JSON.stringify({email, password});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.loginUrl, body, options)
            .map(ResponseExtractor.extractSucces)
            .catch(ResponseExtractor.handleSimpleError);
    }

    register(email: string, fullName: string, password: string): Observable<string> {
        let splittedName = fullName.split(' ');
        let firstName = splittedName[0];
        let lastName = splittedName[1];
        let confirmPassword = password;
        let body = JSON.stringify({firstName, lastName, password, confirmPassword, email});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.registrationUrl, body, options)
            .map(ResponseExtractor.extractSucces)
            .catch(ResponseExtractor.handleError);
    }

    confirmAccount(confirmationCode: string): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.confirmationUrl + confirmationCode, null, options)
            .map(ResponseExtractor.extractSucces)
            .catch(ResponseExtractor.handleError);
    }

    changePassword(newPassword: string): Observable<any> {
        let body = JSON.stringify({newPassword});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.changePasswordUrl, body, options)
            .map(ResponseExtractor.extractSucces)
            .catch(ResponseExtractor.handleError);
    }

    reset(email: string): Observable<any> {
        let body = JSON.stringify({email});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(this.resetUrl, body, options)
            .map(ResponseExtractor.extractSucces)
            .catch(ResponseExtractor.handleError);
    }

    isLogged(): Observable<boolean> {
        let headers = new Headers();
        let options = new RequestOptions({headers: headers, withCredentials: true});
        return this.http.get(this.checkUserUrl, options)
            .map(this.extractLogged)
            .catch(ResponseExtractor.handleError);
    }

    private extractLogged(response: Response) {
        if (!response.json().logged) {
            throw 'User not logged in';
        } else {
            return response.json().logged;
        }
    }

}