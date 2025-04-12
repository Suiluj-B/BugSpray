import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { filter, Observable } from 'rxjs';
import { CommonModule, formatDate, JsonPipe } from '@angular/common';
import { json } from 'express';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent {
  


  //message!: string
  bugTitle = signal<string>('')
  bugDescription = signal<string>('')
  bugPriority = signal<string>('Select')
  



  
  //////////////////////////////////////////
  bugs!: Object
  bugsDisplay = signal<any>([])
  //wholeBugs!: []

  constructor(private apiService: ApiService) {
    //this.jstoday = formatDate(this.bugDateReported, "toLocaleDateString", 'en-US', '+0530')
  }
  
  message = signal<string>('').toString()
  //////////////////////////////////////
  onTextInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    const id = (event.target as HTMLInputElement).id;
    //Chefs kiss - I can use (this as any) and feed the string of .id to it, to update my variables. Much cleaner than multiple if-statements.
    //I suspect it might change the structure of the variable compared to setting it via x.set(). But it works for now.
    (this as any)[id] = value
    console.log((this as any)[id])
  }

  onSelectionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.bugPriority.set(value)
    console.log(this.bugPriority())
  }

  // This is the URL of the backend API
  // I'll reuse this structure: 
  // https://stackoverflow.com/questions/61720971/how-to-extract-data-from-an-observable-in-angular
  postBug() {
    const bugReport = {title: this.bugTitle.toString(), description: this.bugDescription.toString(), priority: this.bugPriority().toString()}
    console.log(this.bugTitle.toString())
    const jsonPayload = JSON.stringify(bugReport)
    this.apiService.postBugs(jsonPayload)
    //this.apiService.postBugs(bugTitle, bugDescription, bugPriority).subscribe({

    }
  

  getBugs() {
    this.apiService.getBugs().subscribe({
      next: (response: any) =>{
        console.log("Bugs: ", response)
        // Transform the response to parse the `data` field
        this.bugsDisplay.set(
          response.allBugs.map((bug: any) => ({
            id: bug.id,
            ...JSON.parse(bug.data), // Parse the `data` field into an object
            time: bug.time
          }))
        )
        console.log("Transformed Bugs: ", this.bugsDisplay())        
      },
      error: (err) => {
        console.error("Error fetching bugs: ", err);
      }

    })
   // this.bugs.array.forEach((element: any) => {
   //   this.wholeBugs = element.allBugs.data
   // });
    
    //const incomingMessage = this.apiService.getBugs().subscribe()
    //const bugs = incomingMessage
    //console.log("Message: ",bugs)

  }
}
