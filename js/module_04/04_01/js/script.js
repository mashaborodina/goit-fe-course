 'use strict';


//----------Task_01----------//


/*
Создай объект notepad для работы с массивом заметок. Каждая заметка это объект следующего формата:

id: string | integer
title: string
body: string
priority: integer [0-2]
id - уникальный идентификатор объекта, чтобы можно было найти его в коллекции, строка.
title - заголовок заметки, строка.
body - текст заметки, строка.
priority - значение приоритета, от 0 (низкий) до 2 (высокий).
Вот карта приоритетов, используй ее.
*/

const Priority = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

/*
Напиши код для работы методов данного объекта.
*/

const notepad = {
    notes: [],
    getNotes() {
        return this.notes;
    /*
    * Принимает: ничего
    * Возвращает: все заметки, значение свойства notes
    */
},
findNoteById(id) {
    for (let note of this.notes) {
        if (note.id === id) {
            return note
        }
    }
    /*
    * Ищет заметку в массиве notes
    * Принимает: идентификатор заметки
    * Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
    */
},
saveNote(note) {
    this.notes.push(note);
    return note;
    /*
    * Сохраняет заметку в массив notes
    * Принимает: объект заметки
    * Возвращает: сохраненную заметку
    */
},
deleteNote(id) {
    const index = this.notes.indexOf(this.findNoteById(id));
    this.notes.splice(index, 1);
    /*
    * Удаляет заметку по идентификатору из массива notes
    * Принимает: идентификатор заметки
    * Возвращает: ничего
    */
},
updateNoteContent(id, updatedContent) {
    if(this.findNoteById) {
        return Object.assign(this.findNoteById(id), updatedContent);
    }
    /*
    * Обновляет контент заметки
    * updatedContent - объект с полями вида {имя: значение, имя: значение}
    * Свойств в объекте updatedContent может быть произвольное количество
    * Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
    * Возвращает: обновленную заметку
    */
},
updateNotePriority(id, priority) {
    const updatedNote = this.findNoteById(id);
    updatedNote.priority = priority;
    return updatedNote;
    /*
    * Обновляет приоритет заметки
    * Принимает: идентификатор заметки и ее новый приоритет
    * Возвращает: обновленную заметку
    */
},
filterNotesByQuery(query) {
    const queryNotes = [];
    for (let note of this.notes) {
        if(note.title.toLowerCase().includes(query.toLowerCase()) || note.body.toLowerCase().includes(query.toLowerCase())) {
            queryNotes.push(note);
            return queryNotes;
        }
    }
    /*
    * Фильтрует массив заметок по подстроке query.
    * Если значение query есть в заголовке или теле заметки - она подходит
    * Принимает: подстроку для поиска в title и body заметки
    * Возвращает: новый массив заметок, контент которых содержит подстроку
    */
},
filterNotesByPriority(priority) {
    const priorityNotes = [];
    for (let note of this.notes) {
        if (note.priority === priority) {
            priorityNotes.push(note);
        }
    }
    /*
    * Фильтрует массив заметок по значению приоритета
    * Если значение priority совпадает с приоритетом заметки - она подходит
    * Принимает: приоритет для поиска в свойстве priority заметки
    * Возвращает: новый массив заметок с подходящим приоритетом
    */
},
};
    /*
    Далее идет код для проверки работоспособности объекта, вставь его в конец скрипта. Твоя реализация методов объекта notepad должна проходить этот тест.
    Добавляю 4 заметки и смотрю что получилось
    */
notepad.saveNote({
id: 'id-1',
title: 'JavaScript essentials',
body:  
'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
priority: Priority.HIGH,
});

notepad.saveNote({
id: 'id-2',
title: 'Refresh HTML and CSS',
body:
  'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
priority: Priority.NORMAL,
});

notepad.saveNote({
id: 'id-3',
title: 'Get comfy with Frontend frameworks',
body:
  'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
priority: Priority.NORMAL,
});

notepad.saveNote({
id: 'id-4',
title: 'Winter clothes',
body:
  "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
priority: Priority.LOW,
});

console.log('Все текущие заметки: ', notepad.getNotes());

    /*
    * Зима уже близко, пора поднять приоритет на покупку одежды
    */
notepad.updateNotePriority('id-4', Priority.NORMAL);

console.log(
'Заметки после обновления приоритета для id-4: ',
notepad.getNotes(),
);

    /*
    * Решил что фреймворки отложу немного, понижаю приоритет
    */
notepad.updateNotePriority('id-3', Priority.LOW);

console.log(
'Заметки после обновления приоритета для id-3: ',
notepad.getNotes(),
);

    /*
    * Решил отфильтровать заметки по слову html
    */
console.log(
'Отфильтровали заметки по ключевому слову "html": ',
notepad.filterNotesByQuery('html'),
);

    /*
    * Решил отфильтровать заметки по слову javascript
    */
console.log(
'Отфильтровали заметки по ключевому слову "javascript": ',
notepad.filterNotesByQuery('javascript'),
);

    /*
    * Хочу посмотреть только заметки с нормальным приоритетом
    */
console.log(
'Отфильтровали заметки по нормальному приоритету: ',
notepad.filterNotesByPriority(Priority.NORMAL),
);

    /*
    * Обновим контент заметки с id-3
    */
notepad.updateNoteContent('id-3', {
title: 'Get comfy with React.js or Vue.js',
});

console.log(
'Заметки после обновления контента заметки с id-3: ',
notepad.getNotes(),
);

    /*
    * Повторил HTML и CSS, удаляю запись c id-2
    */
notepad.deleteNote('id-2');
console.log('Заметки после удаления с id -2: ', notepad.getNotes());
