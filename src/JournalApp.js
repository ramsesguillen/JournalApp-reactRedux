import React from 'react'
import { Provider } from 'react-redux'; //* redux
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store';


export const JournalApp = () => {
    return (
        //* redux
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
