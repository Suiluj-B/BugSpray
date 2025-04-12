// FrontEnd/src/app/api.service.ts
// This is the Angular service that will be used to make HTTP requests to the backend
// It uses HttpClient to make GET requests to the backend API
// The API URL is hardcoded for simplicity, but in a real application, it should be stored in an environment variable
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
  private http = inject(HttpClient);
  bugsUrl = "http://localhost:3000/bugs"
  // This service can now make HTTP requests via `this.http`.
    postBugs(postMessage: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })

        this.http.post(this.bugsUrl,postMessage, {headers}).subscribe()
        console.log("Reached api.service")
    }

    getBugs() {
        const allBugs = this.http.get(this.bugsUrl)
        return allBugs
    }


}

//Example from YT to look at should I need help with syntax.
//export class ApiService {
//    constructor(private http: HttpClient) { }
//
//    postSanitizer<K extends string>(
//        o: Record<K, string>, key: K
//    ) {
//        const sanitizedToString: string = o[key]
//        return sanitizedToString
//    }
//    getMessage() {
//        return this.http.get(
//            'http://localhost:3000/api/message');
//    }
//
//    postMessage(anyObject) {
//        this.postSanitizer(anyObject, )
//        return this.http.post(
//            'http://localhost:3000/api/message', message
//        )
//    }
//}
