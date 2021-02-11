import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NoteAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch( startSaveNote( active ) );
    }

    const handlePicktureCluck = () =>{
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = e => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>5 de enero 2021</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display:'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button
                    onClick={ handlePicktureCluck }
                    className="btn"
                >
                    Picture
                </button>
                <button
                    onClick={ handleSave }
                    className="btn"
                >
                    Save
                </button>
            </div>
        </div>
    )
}
