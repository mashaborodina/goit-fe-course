'use strict';

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  }

  findNoteById(id) {
    for (let note of this.notes) {
      if (note.id === id) {
      return note;
      }
    }
  }

  saveNote(note) {
    this.notes.push(note);
    return note;
  }

  deleteNote(id) {
    const index = this.notes.indexOf(this.findNoteById(id));
    this.notes.splice(index, 1);
  }

  updateNoteContent(id, updatedContent) {
    if (this.findNoteById) {
    return Object.assign(this.findNoteById(id), updatedContent);
    }
  }

  updateNotePriority(id, priority) {
    const updatedNote = this.findNoteById(id);
    updatedNote.priority = priority;
    return updatedNote;
  }

  filterNotesByQuery(query) {
    const queryNotes = [];
    for (let note of this.notes) {
      if (note.title.toLowerCase().includes(query.toLowerCase()) || note.body.toLowerCase().includes(query.toLowerCase())) {
        queryNotes.push(note);
        return queryNotes;
      }
    }
  }

  filterNotesByPriority(priority) {
    const priorityNotes = [];
    for (let note of this.notes) {
      if (note.priority === priority) {
        priorityNotes.push(note);
        return priorityNotes
      }
    }
  }
};