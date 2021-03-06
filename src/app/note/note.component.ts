import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../models/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;
  @Output() deleteNote: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  delete(){

    this.deleteNote.emit(this.note.id);
  }
}
