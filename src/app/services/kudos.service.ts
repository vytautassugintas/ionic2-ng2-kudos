import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {ResponseExtractor} from "./utils/ResponseExtractor";
import {API} from "../api.config";
import {RequestHelper, Header} from "./utils/RequestHelper";

@Injectable()
export class KudosService {
  constructor(private http: Http) {
  }

  private giveUrl = API.URL + 'kudos/give';
  private historyUrl = API.URL + 'kudos/history';
  private historyGivenUrl = API.URL + 'kudos/history/given';
  private historyReceivedUrl = API.URL + 'kudos/history/received';
  private userHistory = API.URL + 'kudos/history/'; // {{userId}}
  private userHistoryGivenUrl = API.URL + 'kudos/history/given/'; // {{userId}}
  private userHistoryReceivedUrl = API.URL + 'kudos/history/received/'; // {{userId}}

  private endorsementsUrl = API.URL + 'kudos/endorsements';
  private userEndorsementsUrl = API.URL + 'kudos/endorsements/'; // {{userId}}

  private transactionsByEndorsementUrl = API.URL + 'kudos/transactions/by/endorsement/'; // {{endorsement}}
  private userTransactionsByEndorsementUrl = API.URL + 'kudos/transactions/by/endorsement/'; // {{userId}}/{{endorsement}}



  public giveKudos(receiverEmail: string, amount: number, message: string, endorsement: string): Observable<any> {
    let body = JSON.stringify({receiverEmail, amount, message, endorsement});
    return this.http.post(this.giveUrl, body, RequestHelper.getBasicRequestOptions())
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  public getHistory(page: number, pageSize: number): Observable<any> {
    return this.http.get(this.historyUrl, RequestHelper.getPageableRequestOptions(page, pageSize))
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  public getGivenHistory(page: number, pageSize: number): Observable<any> {
    return this.http.get(this.historyGivenUrl, RequestHelper.getPageableRequestOptions(page, pageSize))
      .map(ResponseExtractor.extractPage)
      .catch(ResponseExtractor.handleError);
  }

  public getReceivedHistory(page: number, pageSize: number): Observable<any> {
    return this.http.get(this.historyReceivedUrl, RequestHelper.getPageableRequestOptions(page, pageSize))
      .map(ResponseExtractor.extractPage)
      .catch(ResponseExtractor.handleError);
  }

  public getUserHistory(userId: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(this.userHistory + userId, RequestHelper.getPageableRequestOptions(page, pageSize))
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  public getUserGivenHistory(userId: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(this.userHistoryGivenUrl + userId, RequestHelper.getPageableRequestOptions(page, pageSize))
      .map(ResponseExtractor.extractPage)
      .catch(ResponseExtractor.handleError);
  }

  public getUserReceivedHistory(userId: string, page: number, pageSize: number): Observable<any> {
    return this.http.get(this.userHistoryReceivedUrl + userId, RequestHelper.getPageableRequestOptions(page, pageSize))
      .map(ResponseExtractor.extractPage)
      .catch(ResponseExtractor.handleError);
  }

  public getEndorsements(): Observable<any> {
    return this.http.get(this.endorsementsUrl, RequestHelper.getBasicRequestOptions())
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  public getUserEndorsements(userId: string): Observable<any> {
    return this.http.get(this.userEndorsementsUrl + userId, RequestHelper.getBasicRequestOptions())
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  public getTransactionsByEndorsement(endorsement: string, page: number, pageSize: number): Observable<any>{
    return this.http.get(this.transactionsByEndorsementUrl + endorsement, RequestHelper.getPageableRequestOptions(page, pageSize))
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  public getUserTransactionsByEndorsement(userId: string, endorsement: string, page: number, pageSize: number): Observable<any>{
    return this.http.get(this.userTransactionsByEndorsementUrl + userId + "/" + endorsement, RequestHelper.getPageableRequestOptions(page, pageSize))
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }


}
