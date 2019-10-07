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
    return new Promise(resolve => {
      for (let note of this._notes) {
        if (note.id === id) {
          resolve(note);
        }
      }
    })
  }
  
  saveNote(note) {
    return new Promise(resolve => {
      this._notes.push(note);
      localStorage.setItem('notes', JSON.stringify(this._notes));
      resolve(note);
    });
  }

  deleteNote(id) { 
    return new Promise(resolve => {
      if (this.findNoteById(id)) {
        this._notes = this._notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(this._notes));
      }
      resolve(id)
    })
  }

  updateNoteContent(id, updatedContent) {
    return new Promise(resolve => {
      if (this.findNoteById(id)) {
        resolve(Object.assign(this.findNoteById(id), updatedContent));
      }
    })
  }

  updateNotePriority(id, priority) {
    return new Promise(resolve => {
      const updatedNote = this.findNoteById(id);
      updatedNote.priority = priority;
      resolve(updatedNote);
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