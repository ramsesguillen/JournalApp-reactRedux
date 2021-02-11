import Swal from 'sweetalert2'
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

// react-journal
// https://api.cloudinary.com/v1_1/devexb0a6

export const startNewNote = () => {
    //* getState contiene todo el estado 
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );
        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote( doc.id, newNote ) );
    }
}

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const startSaveNote = note => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        if ( !note.url ) delete note.url;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore );

        dispatch( refreshNote( note.id, note) );
        Swal.fire('Saved', note.title, 'success');
    }
}

export const startUploading = file => {
    return async ( dispatch, getState ) => {
        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ) );

        Swal.close();
    }
}


export const startDeleting = id => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch( deleteNote( id ) );
    }
}

// GENERADORES DE ACCIONES
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNews,
    payload: {
        id, ...note
    }
})



export const setNotes = notes => ({
    type: types.notesLoad,
    payload: notes
})

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id, note: {
            id,
            ...note
        }
    }
})

export const deleteNote = id => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})