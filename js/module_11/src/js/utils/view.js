import noteTemplate from '../../templates/note.hbs';

export const getRefs = () => ({
  form: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
  search: document.querySelector('form.search-form'),
  modalForm: document.querySelector('button[data-action="open-editor"]'),
});

export function renderNoteList(listRef, notes) {
  /*listRef.innerHTML = '';*/
  let listNotes = notes.map(note => noteTemplate(note));
  listRef.insertAdjacentHTML('beforeend', listNotes.join(''));
}