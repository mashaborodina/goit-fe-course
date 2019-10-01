// Imports JS
  
import Notepad from './utils/notepad-model.js';
import {refs, renderNoteList, addListItem} from './utils/view.js';
import initialNotes from '../assets/notes.json';
import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from './utils/constants.js';

// Modules
const shortid = require('shortid')
const notepad = new Notepad(initialNotes);

//-------------------------------Ссылки на узел DOM--------------------------------//

const refs = {
    form: document.querySelector('.note-editor'), //новая заметка
    noteList: document.querySelector('.note-list'), //ul
    search: document.querySelector('form.search-form'), //фильтрация заметок
  }
  
  //----------------------------------Слушатели---------------------------------------//
  refs.form.addEventListener('submit', handleSubmitForm);
  refs.noteList.addEventListener('click', removeListItem);
  refs.search.addEventListener('input', filterNotes);
  
  //---------------------------------Обработчики--------------------------------------//
  
  // форма отправки
  function addListItem(listRef, note) {
    listRef.append(createListItem(note));
  }
  
  function handleSubmitForm(event) {
    event.preventDefault();
    let [title, body] = document.querySelectorAll('.note-editor__input');
    if (!title.value || !body.value) {
      return alert(`Необходимо заполнить все поля!`);
    }

    // добавление новой заметки
    let addNewNote = notepad.saveNote({
      id: shortid.generate(),
      title: title.value,
      body: body.value,
      priority: 0,
    });
    addListItem(refs.noteList, addNewNote);
    event.target.reset();
  }
  
  // удаление заметки
  function removeListItem(event) {
    if (event.target.closest('.action').dataset.action === 'delete-note') {
      notepad.deleteNote(event.target.closest('.note-list__item').dataset.id);
      event.target.closest('.note-list__item').remove();
    } else {
      return;
    }
  }
  
  // фильтрация заметки
  function filterNotes(event) {
    refs.noteList.innerHTML = '';
    renderNoteList(refs.noteList, notepad.filterNotesByQuery(event.target.value));
  }
