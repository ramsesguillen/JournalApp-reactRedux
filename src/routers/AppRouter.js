import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { startLoadingNotes } from '../actions/notes'


export const AppRouter = () => {

    // buscando la autenticacion
    const [checking, setChecking] = useState(true);
    const [isLoggeIn, setIsLoggeIn] = useState( false );

    const dispatch = useDispatch();
    useEffect(() => {

        firebase.auth().onAuthStateChanged( async (user) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggeIn( true );

                dispatch( startLoadingNotes( user.uid ) );
            } else {
                setIsLoggeIn( false );
            }

            // cuando termina de obtener informacion
            setChecking( false );
        });

    }, [ dispatch ]);

    if ( checking ) {
        return (
            <h1>Espere...</h1>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={ isLoggeIn }
                        path="/auth"
                        component={ AuthRouter }
                    />
                    <PrivateRoute
                        isAuthenticated={ isLoggeIn }
                        exact
                        path="/"
                        component={ JournalScreen }
                    />
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
