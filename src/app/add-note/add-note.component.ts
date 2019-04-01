import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  note: Note;

  constructor() { 

    this.note = <Note>{};
  }

  ngOnInit() { }

  saveNote() {
    console.log(this.note);
  }

}
