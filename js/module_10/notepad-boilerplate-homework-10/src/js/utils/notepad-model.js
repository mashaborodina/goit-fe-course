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
      this.notes.find(obj => obj.id === id);
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
      const newArr = [];
  
      this.notes.filter(obj => {
        const titleLower = obj.title.toLowerCase();
        const bodyLower = obj.body.toLowerCase();
        if (titleLower.includes(query.toLowerCase()) || bodyLower.includes(query.toLowerCase())){
          newArr.push(obj);
        }
      });
      return newArr;
    };
  
    filterNotesByPriority = function(priority) {
      const newArr = [];
  
      this.notes.filter(obj => {
        if (obj.priority === priority) {
          newArr.push(obj);
        }
      });
      return newArr;
    };
  }