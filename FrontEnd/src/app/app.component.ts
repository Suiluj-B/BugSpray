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
  constructor(private apiService: ApiService) {}

  //Used for user input.
  bugTitle = signal<string>('')
  bugDescription = signal<string>('')
  bugPriority = signal<string>('Select')

  //Used to display all bugs in DB after GET.
  bugsDisplay = signal<any>([])

  //Display Messages as Feedback to User.
  errorMessageVisible = false;
  successMessageVisible = false;
  bugReported = false;
  doubleEntryMessageVisible = false;



  //////////////////////////////////////
  //Tracks text fields. the second to last line is my favorite in the whole project.
  //////////////
  onTextInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    const id = (event.target as HTMLInputElement).id;
    //Chefs kiss - I can use (this as any) and feed the string of .id to it, to update my variables. Much cleaner than multiple if-statements.
    //I suspect it might change the structure of the variable compared to setting it via x.set(). But it works for now.
    (this as any)[id] = value
    console.log((this as any)[id])
  }

  //Tracks select field input.
  onSelectionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.bugPriority.set(value)
    console.log(this.bugPriority())
  }

  
  // I'll reuse this structure: 
  // https://stackoverflow.com/questions/61720971/how-to-extract-data-from-an-observable-in-angular
  // #Update: I dont think I did follow this in the end.
  postBug() {
    const continueWithReport = this.checkFieldsForContent()
    if (continueWithReport == false){
      return Error("Provide all fields")}

    else{
    const bugReport = {title: this.bugTitle.toString(), description: this.bugDescription.toString(), priority: this.bugPriority().toString()}
    console.log(this.bugTitle.toString())
    const jsonPayload = JSON.stringify(bugReport)
    this.apiService.postBugs(jsonPayload)
    return}
    }
    
  checkFieldsForContent() {
    // Check if all fields have content.
    if (this.bugPriority()==='Please Select' || this.bugTitle.toString()==="[Signal: ]" || this.bugDescription.toString() === "[Signal: ]"){
      this.errorMessageVisible = true
      this.successMessageVisible = false
      return false

    // Check if the same bug was already reported (by this user). Might need to be fixed again after refactoring.
    } else if(this.bugReported == true){
      this.doubleEntryMessageVisible = true  
      return false

    //If everything is fine, hide errors and continue.
    } else {(this.bugPriority()!='Select' && this.bugTitle.length > 0 && this.bugDescription.length > 0)
      console.log('Success')
      this.errorMessageVisible = false
      this.successMessageVisible = true
      this.bugReported = true
      return true
    }
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


  }
}
