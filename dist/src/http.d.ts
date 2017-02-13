import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { HalLinkObject, HalObject, HalObjectSerializer } from './object';
/**
 *
 */
export declare class HalHttp {
    private objectSerializer;
    private http;
    constructor(objectSerializer: HalObjectSerializer, http: Http);
    get(url: string): Observable<HalObject | HalObject[]>;
    delete(url: string): Observable<void>;
    post(url: string, body: HalObject | HalObject[]): Observable<HalLinkObject>;
    put(url: string, body: HalObject | HalObject[]): Observable<HalLinkObject>;
}
