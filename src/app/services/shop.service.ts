import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {ResponseExtractor} from "./utils/ResponseExtractor";
import {API} from "../api.config";
import {RequestHelper} from "./utils/RequestHelper";

@Injectable()
export class ShopService {
  constructor(private http: Http) {
  }

  private availablePointsUrl = API.URL + API.ENTRY_SHOP + "available";
  private itemsUrl = API.URL + API.ENTRY_SHOP + "items";
  private buyUrl = API.URL + API.ENTRY_SHOP + "buy/";
  private ordersUrl = API.URL + API.ENTRY_ORDERS + "get/";

  public buyItem(id: string): Observable<any>{
    return this.http.post(this.buyUrl + id, null, RequestHelper.getBasicRequestOptions())
      .map(ResponseExtractor.extractSuccess)
      .catch(ResponseExtractor.handleError);
  }

  public getAvailablePoints(): Observable<any> {
    return this.http.get(this.availablePointsUrl, RequestHelper.getBasicRequestOptions())
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  public getUserHistory(page: number, pageSize: number): Observable<any> {
    return this.http.get(this.itemsUrl, RequestHelper.getPageableRequestOptions(page, pageSize))
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

  public getUserOrders(id: string, page: number, pageSize: number): Observable<any>{
    return this.http.get(this.ordersUrl + id, RequestHelper.getPageableRequestOptions(page, pageSize))
      .map(ResponseExtractor.extractJson)
      .catch(ResponseExtractor.handleError);
  }

}
