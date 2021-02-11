import React from 'react'
import validator from 'validator';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailAndPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);

    const [ values, handleInputChange ] = useForm({
        name: 'Diana',
        email: 'laura@gmail.com',
        password: "qwert123#43",
        password2: "qwert123#43",
    });

    const { name, email,  password,  password2 } = values;

    const handleRegister = e => {
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailAndPasswordName( email, password, name ) );
        }
    }


    const isFormValid = () => {
        if ( name.trim().length === 0 ) {
            dispatch( setError('name is required') );
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email is not valid') );
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch( setError('Password should be at least 6 characters and mathc each other') );
            return false;
        }

        dispatch( removeError() );
        return true;
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form
                className="animate__animated animate__fadeIn animate__faster"
                onClick={ handleRegister }
            >
                {
                    ( msgError ) &&
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                }

                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    value={ name }
                />
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    value={ email }
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    onChange={ handleInputChange }
                    value={ password }
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    onChange={ handleInputChange }
                    value={ password2 }
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Login
                </button>

                <Link
                    className="link"
                    to="/auth/login"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
