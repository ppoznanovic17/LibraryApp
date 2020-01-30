import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(
    private basicAuthServiceService:AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    //let username = 'ppoznanovic17'
   // let password = 'sesirce12'
    //let basicAuthHeaderString = 'Basic ' + window.btoa(username+":"+password)
    let basicAuthHeaderString = this.basicAuthServiceService.getauthToken()
    let username = this.basicAuthServiceService.getAuthUser()

    if(basicAuthHeaderString && username){

      request = request.clone({
        setHeaders : {
          auth : basicAuthHeaderString
        }
      })
    }



    return next.handle(request)
  }
}
