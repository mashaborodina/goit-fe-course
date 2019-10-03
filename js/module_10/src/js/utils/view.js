import {ICON_TYPES, NOTE_ACTIONS} from './constants';

/*const notepad = new Notepad(initialNotes);*/

export const getRefs = () => ({
  form: document.querySelector('.note-editor'), //новая заметка
  noteList: document.querySelector('.note-list'), //ul
  search: document.querySelector('form.search-form'), //фильтрация заметок
});

export function createListItem({ id, title, body, priority }) {

  let noteListItem = document.createElement('li');
  noteListItem.classList.add('note-list__item');
  noteListItem.dataset.id = id;

  let noteContainer = document.createElement('div');
  noteContainer.classList.add('note');

  noteContainer.append(createNoteContent(title, body), createNoteFooter(priority));

  noteListItem.append(noteContainer);

  return noteListItem;
}

export function createNoteContent(title, body) {
  let noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  let noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  let noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;

  noteContent.append(noteTitle, noteBody);

  return noteContent;
}

export function createActionButton(action, type) {
  let button = document.createElement('button');
  button.classList.add('action');
  button.dataset.action = action;

  let icon = document.createElement('i');
  icon.classList.add('material-icons', 'action__icon');
  icon.textContent = type;

  button.append(icon);

  return button;
}

export function createNoteFooter(priority) {
  let noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  let noteSection = document.createElement('section');
  noteSection.classList.add('note__section');

  let editSection = noteSection.cloneNode(true);

  let notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = `Priority: ${priority}`

  noteSection.append(
    createActionButton(NOTE_ACTIONS.DECREASE_PRIORITY, ICON_TYPES.ARROW_DOWN), 
    createActionButton(NOTE_ACTIONS.INCREASE_PRIORITY, ICON_TYPES.ARROW_UP), notePriority);

  editSection.append(
    createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT),
    createActionButton(NOTE_ACTIONS.DELETE, ICON_TYPES.DELETE));

  noteFooter.append(noteSection, editSection);

  return noteFooter;
}

export function renderNoteList(listRef, notes) {
  listRef.innerHTML = '';
  let listNotes = notes.map(note => createListItem(note));
  listRef.append(...listNotes);
}

/*let list = document.querySelector('.note-list');

renderNoteList(list, notepad.notes);
*/