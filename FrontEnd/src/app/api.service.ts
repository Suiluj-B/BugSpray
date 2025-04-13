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
            //figuring this out took some time. Not necessarily this line, but using Express and putting the right headers to get all functions to work.
            'Content-Type': 'application/json',
        })
        //I did not .subscribe initially, which taught me how lazy Angular really is.
        this.http.post(this.bugsUrl,postMessage, {headers}).subscribe()
        console.log("Reached api.service")
    }

    getBugs() {
        const allBugs = this.http.get(this.bugsUrl)
        return allBugs
    }


}
