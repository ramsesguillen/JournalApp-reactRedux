import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note} = useSelector(state => state.notes);
    const [ values, handleInputChange, reset ] = useForm(note);
    const { body, title, id} = values;

    const activeId =  useRef( note.id );

    useEffect(() => {
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
    }, [note, reset]);


    useEffect(() => {
        dispatch( activeNote( values.id, { ...values } ) );
    }, [ values, dispatch ]);

    const handleDelecteClick = () => {
        // console.log( id );
        dispatch( startDeleting( id ) )
    }

    return (
        <div className="notes__main-content">

            <NoteAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes_title-input"
                    name="title"
                    onChange={ handleInputChange }
                    value={ title }
                />
                <textarea
                    type="text"
                    placeholder="What happened today"
                    className="notes_textarea"
                    name="body"
                    onChange={ handleInputChange }
                    value={ body }
                >
                </textarea>
                {
                    ( note.url ) &&
                        <div className="notes__image">
                            <img
                                alt="imag"
                                src={ note.url }
                            />
                        </div>
                }
            </div>
            <button
                className="btn btn-danger"
                onClick={ handleDelecteClick }
            >
                Delete
            </button>
        </div>
    )
}
