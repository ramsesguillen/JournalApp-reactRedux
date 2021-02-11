//* redux
import { types } from "../types/types";
import Swal from 'sweetalert2'
import { firebase, gooleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";
// se llama en el componenete
export const startLoginPassword = ( email, password) => {
    return (dispatch ) => {

        dispatch( startLoading()  );

        firebase.auth().signInWithEmailAndPassword( email, password)
        .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) );

                dispatch( finishLoading() );
            })
            .catch(e => {
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            });
    }
}


// se llama en el componenete
export const startRegisterWithEmailAndPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async ({user}) => {
                await user.updateProfile({ displayName: name });
                dispatch( login( user.uid, user.displayName ) );
            })
            .catch( e => {
                Swal.fire('Error', e.message, 'error');
            });
    }
}


// se llama en el componenete
export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( gooleAuthProvider )
            .then( ({user}) => {
                dispatch( login( user.uid, user.displayName ) );
            });
    }
}

export const startLogout = () => {
    return async  ( dispatch ) => {
        await firebase.auth().signOut();
        dispatch( logout() );
        dispatch( noteLogout() );
    }
}


//** GENERADOR DE ACCIONES: una funcion que devuelve el action */
export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    }
});


const logout = () => ({
    type: types.logout
})

