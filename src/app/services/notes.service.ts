import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private router: Router) { }

  checkNote(note: Note) {

    let check = "good";
    if (note.task === "")
      check = "taskLes";
    else if (!/2019-([0]{1}[1-9]{1}|[1]{1}[0-2]{1})-([0-2]{1}[\d]{1}|[3]{1}[01]{1})/gm.test(note.date))
      check = "dateWrong";
    else if (!/([0-1]{1}[\d]{1}|2{1}[0-3]{1}):[0-5]{1}[\d]{1}/gm.test(note.time) && note.time !== "")
      check = "timeWrong";
    console.log(check); return check;
  }

  saveNote(note) {

    const number = Object.keys(localStorage).length;
    note.id = number;
    localStorage.setItem('note ' + number, JSON.stringify(note));
    location.reload();
  }

  getFromlocalStorage() {

    const noteArray = [];
    for (let i = 0; ; i++) {
        const note = JSON.parse(localStorage.getItem('note ' + i));
        if (note === null)
            break;
        noteArray.push(note);
    }
    return noteArray;
  }

  deleteNote(id){

    let noteArray = this.getFromlocalStorage();
    noteArray.splice(id, 1);
    this.updatelocalStorage(noteArray);
    console.log(noteArray);
  }

  updatelocalStorage(noteArray){

    localStorage.clear();
    for(let i = 0; i < noteArray.length; i++){
      noteArray[i].id = i;
      localStorage.setItem('note ' + i, JSON.stringify(noteArray[i]))
    }

  }

  
}
