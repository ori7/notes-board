import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  note: Note;

  constructor(private notesService: NotesService) {

    this.note = <Note>{};
  }

  ngOnInit() { }

  saveNote() {

    const checkNote = this.notesService.checkNote(this.note);
    this.checkNoteComments(checkNote);
    if (checkNote === "good"){
      this.notesService.saveNote(this.note);
      this.note.task = this.note.date = this.note.time = null;
    }
  }

  checkNoteComments(check) {

    if (check === "taskLes")
      document.getElementById('taskHelp').style.visibility = "visible";
    else if (check === "dateWrong") {
      document.getElementById('taskHelp').style.visibility = "hidden";
      document.getElementById('dateHelp').style.visibility = "visible";
    }
    else if (check === "timeWrong") {
      document.getElementById('taskHelp').style.visibility = "hidden";
      document.getElementById('dateHelp').style.visibility = "hidden";
      document.getElementById('timeHelp').style.visibility = "visible";
    }
    else {
      document.getElementById('taskHelp').style.visibility = "hidden";
      document.getElementById('dateHelp').style.visibility = "hidden";
      document.getElementById('timeHelp').style.visibility = "hidden";
    }
  }

}
