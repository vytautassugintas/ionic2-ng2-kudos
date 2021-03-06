import {Response} from "@angular/http";
import {Observable} from "rxjs";

export class ResponseExtractor{

  static extractSimpleResponse(res: Response){
    return res;
  }

    static extractString(res: Response){
        return res.toString();
    }

    static extractJson(res: Response) {
        return res.json();
    }

    static extractPage(res: Response) {
        return res.json().content;
    }

    static handleError(error: any) {
        return Observable.throw(JSON.parse(error._body));
    }

  static handleStringError(error: any) {
    return Observable.throw(error.toString());
  }

    static handleSimpleError(error: any){
        return Observable.throw(error);
    }

    static extractCallback(res: Response) {
        return res;
    }

    static extractSuccess(res: Response){
        if (res.status == 200){
            return res;
        }
    }

}
