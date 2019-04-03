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

  constructor(private notesService: NotesService) { }

  ngOnInit() {

    this.notesList = this.notesService.getFromlocalStorage(); console.log(this.notesList);
  }

  deleteNote(id) {

    this.notesService.deleteNote(id);
    let NoteArray = document.querySelectorAll('.m-3');
    this.deliteNoteByfadeOut(NoteArray[id]);
  }

  deliteNoteByfadeOut(elementToFadeOut) {

    elementToFadeOut.classList.add('fadeOut');
    setTimeout(function () {
      elementToFadeOut.parentNode.removeChild(elementToFadeOut);
    }, 200);
  }

}