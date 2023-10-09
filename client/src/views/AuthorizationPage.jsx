import React from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

const AuthorizationPage = ({setLoggedUser}) => {
    return(
        <div>
            <h1>Welcome to Coffee Shop Tracker!</h1>
            <h5>Please login or create an account</h5>
            <div className='d-flex justify-content-evenly my-5'>
                <RegistrationForm setLoggedUser={setLoggedUser}/>
                <LoginForm setLoggedUser={setLoggedUser} />
            </div>
        </div>
    );
}

export default AuthorizationPage;