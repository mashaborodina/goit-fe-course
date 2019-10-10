import * as api from '../service/api'

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  
  get notes() {
    return api.getNotes().then(serverNotes => {
      this._notes.push(...serverNotes);
      return this._notes
      })
  }
  
  findNoteById(id) {
    return this._notes.find(obj => obj.id === id)
  }
  
  saveNote(note) {
    return api.saveNote(note).then(newNote => {
      this._notes.push(newNote);
      return newNote;
    })
  }

  deleteNote(id) {
    api.deleteNote(id).then(() => {
      const index = this._notes.indexOf(this.findNoteById(id));
      this._notes.splice(index, 1);
    })
  }

  updateNoteContent(id, updatedContent) {
    return api.updateNoteContent(id, updatedContent).then(updatedNote => {
      if (this.findNoteById(id)) {
        return Object.assign(this.findNoteById(id), updatedNote);
      }
    })
  }

  updateNotePriority(id, priority) {
    return api.updateNoteContent(id, priority).then(updatedObj => {
      const updatedNote = this.findNoteById(id);
      updatedNote.priority = priority;
      return updatedNote;
    })
  }

  filterNotesByQuery(query) {
    return new Promise(resolve => {
      resolve(this._notes.filter(obj => obj.title.toLowerCase().includes(query.toLowerCase()) || obj.body.toLowerCase().includes(query.toLowerCase())))
    })
  }

  filterNotesByPriority(priority) {
    return new Promise(resolve => {
      resolve(this._notes.filter(obj => obj.priority === priority));
    })
  }
}