import Notepad from "../index";

const initialNotes = [
    {
      id: 'id-1',
      title: 'JavaScript essentials',
      body:
        'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
      priority: Notepad.Priority.HIGH,
    },
    {
      id: 'id-2',
      title: 'Refresh HTML and CSS',
      body:
        'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
      priority: Notepad.Priority.NORMAL,
    },
  ];
 
    describe("Notepad", () => {
        let notepad;
  
    beforeEach(() => {
        notepad = new Notepad(initialNotes);
    });

    afterEach(() => {
        notepad = null;
    });
  
    it("initialize the notes", () => {
        expect(notepad.notes).toEqual(initialNotes); 
    });
  
    it("finds note by id", () => {
        const id = "id-2";
        const note = {
            id: "id-2",
            title: "Refresh HTML and CSS",
            body:
            "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
            priority: 1
        };
        expect(notepad.findNoteById(id)).toEqual(note); 
    });
  
    it("save new notes", () => {
        const note = {
            id: "id-3",
            title: "Get comfy with Frontend frameworks",
            body:
            "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
            priority: Notepad.Priority.NORMAL
        };
        expect(notepad.saveNote(note)).toEqual(note); 
    });
  
    it("delete the note", () => {
        const id = "id-2";
        expect(notepad.deleteNote(id)).toBeUndefined(); 
    });
  
    it("update note content", () => {
        const id = "id-1";
        const note = {
            id: "id-1",
            title: "Winter clothes",
            body:
            "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
            priority: Notepad.Priority.HIGH
        };
        expect(notepad.updateNoteContent(id, note)).toEqual(note); 
    });
  
    it("updates priority", () => {
        const id = "id-1";
        const priority = Notepad.Priority.LOW;
        const note = {
            id: "id-1",
            title: "Winter clothes",
            body:
            "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
            priority: 0
        };
        expect(notepad.updateNotePriority(id, priority)).toEqual(note); 
    });
  
    it("filter note by keyword", () => {
        const query = "Winter clothes";
        const newNote = [
        {
            id: "id-1",
            title: "Winter clothes",
            body:
            "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
            priority: 0
        }
        ];
        expect(notepad.filterNotesByQuery(query)).toEqual(newNote); 
    });
  
    it("filter note by priority", () => {
        const priority = Notepad.Priority.NORMAL;
        const newNote = [
        {
            id: "id-3",
            title: "Get comfy with Frontend frameworks",
            body:
            "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
            priority: 1
        }
        ];
        expect(notepad.filterNotesByPriority(priority)).toEqual(newNote); 
    });
  });