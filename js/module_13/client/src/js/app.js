//---------------------------------------------------------------------------------------------//
import MicroModal from 'micromodal';
import {Notyf} from 'notyf';  
import Notepad from './utils/notepad-model';
import {NOTIFICATION_MESSAGES} from './utils/constants.js';
import {renderNoteList, getRefs} from './utils/view';
import 'notyf/notyf.min.css';
import '../sass/libs/micromodal.scss';

//---------------------------------------------------------------------------------------------//

const notyf = new Notyf();
const refs = getRefs();
const notepad = new Notepad();

notepad.notes
  .then(initalNotes => renderNoteList(refs.noteList, initalNotes))
  .catch(console.log)


//---------------------------------------------------------------------------------------------//
refs.form.addEventListener('submit', handleSubmitForm);
refs.noteList.addEventListener('click', removeListItem);
refs.search.addEventListener('input', filterNotes);
refs.modalForm.addEventListener('click', openModal);

//---------------------------------------------------------------------------------------------//
function handleSubmitForm(event) {
  event.preventDefault();
  let [title, body] = document.querySelectorAll('.note-editor__input');
  if (!title.value || !body.value) {
    return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
  }

  notepad.saveNote({
    title: title.value,
    body: body.value,
    priority: 0,
  })
    .then(savedNote => {
      renderNoteList(refs.noteList, [savedNote]);
      notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
      MicroModal.close("note-editor-modal");
      event.target.reset();
    })
    .catch(console.log)
}

//---------------------------------------------------------------------------------------------//
function removeListItem(event) {
  if (event.target.nodeName === "I" && event.target.closest('.action').dataset.action === 'delete-note') {
    notepad.deleteNote(event.target.closest('.note-list__item').dataset.id);
    event.target.closest('.note-list__item').remove();
    notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
  } else {
    return;
  }
}

//---------------------------------------------------------------------------------------------//
function filterNotes(event) {
  refs.noteList.innerHTML = '';
  notepad.filterNotesByQuery(event.target.value)
  .then(result => renderNoteList(refs.noteList, result))
  .catch(console.log)
}

//---------------------------------------------------------------------------------------------//
function openModal(event) {
  if (event.target.closest('.action').dataset.action === "open-editor") {
    MicroModal.show("note-editor-modal")
  }
}