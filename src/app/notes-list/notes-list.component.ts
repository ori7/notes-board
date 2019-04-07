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
  NoteArray: object;

  constructor(private notesService: NotesService) { }

  ngOnInit() {

    this.notesService.notesArray.subscribe(resArray => {
      this.notesList = resArray;
    })
    this.NoteArray = null;
  }

  deleteNote(id) {

    this.NoteArray = document.querySelectorAll('.m-3');
    for (let i = 0; i < this.notesList.length; i++) {
      if (id === this.notesList[i]['id']) {
        this.NoteArray[i].classList.add('fadeOut');
        break;
      }
    }
    setTimeout( () =>{
      this.notesService.deleteNote(id);
    }, 1900);
  }
}