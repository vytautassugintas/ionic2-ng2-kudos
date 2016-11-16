import {URLSearchParams, Headers, RequestOptions} from "@angular/http";

export class RequestHelper {

    static getPageParams(page: number, pageSize: number): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page.toString());
        params.set('size', pageSize.toString());
        return params;
    }

    static getHeaders(headerParams: any): Headers{
        return new Headers(headerParams);
    }

    static getSearchRequestOptions(headers: Headers, searchParams: URLSearchParams): RequestOptions {
        return new RequestOptions({
            withCredentials: true,
            headers: headers,
            search: searchParams
        })
    }

    static getPageableRequestOptions(page: number, pageSize: number){
        return new RequestOptions({
            withCredentials: true,
            headers: this.getHeaders(Header.CONTENT_JSON),
            search: this.getPageParams(page, pageSize)
        })
    }

    static getBasicRequestOptions(){
        return new RequestOptions({
            withCredentials: true,
            headers: this.getHeaders(Header.CONTENT_JSON)
        })
    }

}

export class Header {

    static readonly CONTENT_JSON = {'Content-Type': 'application/json'};

}