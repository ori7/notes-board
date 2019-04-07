import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notesArray: BehaviorSubject<any[]>;
  tempNotesArray: object[];


  constructor(private router: Router) {

    this.notesArray = new BehaviorSubject<any[]>(this.getFromlocalStorage());
    this.tempNotesArray=<object[]>[];
  }

  checkNote(note: Note) {

    let check = "good";
    if (note.task === "")
      check = "taskLes";
    else if (!/2019-([0]{1}[1-9]{1}|[1]{1}[0-2]{1})-([0-2]{1}[\d]{1}|[3]{1}[01]{1})/gm.test(note.date))
      check = "dateWrong";
    else if (!/([0-1]{1}[\d]{1}|2{1}[0-3]{1}):[0-5]{1}[\d]{1}/gm.test(note.time) && note.time !== "")
      check = "timeWrong";
    return check;
  }

  saveNote(note) {

    this.tempNotesArray = this.getFromlocalStorage();
    note.id = this.makeid(15);
    if (this.tempNotesArray === null) {
      this.tempNotesArray = [note];
    }
    else
      this.tempNotesArray.push(note);
    localStorage.setItem('notes', JSON.stringify(this.tempNotesArray));
    this.notesArray.next(this.getFromlocalStorage());
  }

  private getFromlocalStorage(): any[] {

    return JSON.parse(localStorage.getItem('notes'));
  }

  deleteNote(id) {

    let noteArray = this.getFromlocalStorage();
    noteArray = noteArray.filter(function (obj) {
      return obj.id !== id;
    });
    this.updateLocalStorage(noteArray);
    this.notesArray.next(noteArray);
  }

  updateLocalStorage(noteArray) {

    localStorage.setItem('notes', JSON.stringify(noteArray));
  }

  makeid(length) {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}