import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string ) { }
    
  private url(requestParameter: Partial<RequestParameters>):string{

    return `${requestParameter.baseUrl ? requestParameter.baseUrl: this.baseUrl}/${requestParameter.
      controllers}${requestParameter.action ? `/${requestParameter.action}`: "" }`;

  }

  //GET id and all
    get<T>(requestParameter: Partial<RequestParameters> , id?: string) : Observable<T>{
      let url: string= "";

      if(requestParameter.fullEndPoint){
        url=requestParameter.fullEndPoint;
      }else{
        url= `${this.url(requestParameter)}${id ? `/${id}` : ""}`;

      }
      return this.httpClient.get<T>(url,{headers: requestParameter.headers})
    }

    //POST
    post<T>(requestParameter: Partial<RequestParameters> , body: Partial<T>): Observable<T>{
      let url : string = "";
      if(requestParameter.fullEndPoint){
        url=requestParameter.fullEndPoint;
      }else{
        url= `${this.url(requestParameter)}`
      }
      return this.httpClient.post<T>(url,body,{headers: requestParameter.headers});

    }

    //PUT
    put<T>(requestParameter: Partial<RequestParameters> , body: Partial<T>):Observable<T>{
      let url: string="";
      if(requestParameter.fullEndPoint){
        url=requestParameter.fullEndPoint;
      }else
        url= `${this.url(requestParameter)}`;
        return this.httpClient.put<T>(url,body,{headers: requestParameter.headers})
    }

    //DELETE
    delete<T>(requestParameter: Partial<RequestParameters> ,id: string): Observable<T>{
      let url: string="";
      if(requestParameter.fullEndPoint){
        url=requestParameter.fullEndPoint;
      }else
        url= `${this.url(requestParameter)}/${id}`;
     return this.httpClient.delete<T>(url,{headers:requestParameter.headers})
    }

  } 


export class RequestParameters{
controllers?: string;
action?: string;
headers:HttpHeaders;
baseUrl?: string;
fullEndPoint?:string;
}


