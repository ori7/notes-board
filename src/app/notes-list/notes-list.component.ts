import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notesList: Note[];
  lastLengthOfArray: number;
  addFadeInClass: boolean;

  constructor(private notesService: NotesService) { }

  ngOnInit() {

    this.notesService.notesArray.subscribe(resArray => {

      if (this.lastLengthOfArray === undefined) {
        this.lastLengthOfArray = resArray.length;
      }

      if (resArray.length > this.lastLengthOfArray) {
        this.addFadeInClass = true;
      } 
      else
        this.addFadeInClass = false;
      this.lastLengthOfArray = resArray.length;

      this.notesList = resArray;
    });
  }

  deleteNote(id) {

    document.getElementById(id).parentElement.parentElement.classList.add('fadeOut');
    setTimeout(() => {
      this.notesService.deleteNote(id);
    }, 1900);
  }
}