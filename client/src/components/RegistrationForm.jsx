import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = ({setLoggedUser}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const registrationHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', { firstName, lastName, email, password, confirmPassword }, { withCredentials: true })
            .then( res => {
                const userToLogin = {
                    _id: res.data._id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email
                };
                setLoggedUser(userToLogin);
                navigate('/dashboard');
            })
    }

    return(
        <form onSubmit={registrationHandler}>
            <h3>Register</h3>
            <div className='mb-3'>
                <label className='form-label'>First Name</label>
                <input type='text' className='form-control' value={firstName} onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Last Name</label>
                <input type='text' className='form-control' value={lastName} onChange={e => setLastName(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type='email' className='form-control' value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type='password' className='form-control' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Confirm Password</label>
                <input type='password' className='form-control' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            </div>
            <button className='btn btn-secondary btn-lg'>Register</button>
        </form>
    );
}

export default RegistrationForm;