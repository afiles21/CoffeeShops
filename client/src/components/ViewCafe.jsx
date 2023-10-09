import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ViewCafe = ({loggedUser}) => {

    const { id } = useParams();
    const [ thisCafe, setThisCafe ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/cafes/' + id)
            .then( res => {
                setThisCafe(res.data)
                console.log(res.data);
            })
            .catch( err => console.log(err))
    }, []);

    const logoutHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/logout', { withCredentials: true })
            .then( res => {
                navigate('/');
            })
    }

    return(
        <div>
            { loggedUser === null ? <div>
                <h1>Must be logged in!</h1>
                <Link to={'/'}>Return to Login</Link>
            </div>   : 
            <>
            <div className='d-flex justify-content-between navbar bg-body-tertiary px-5 py-3 mb-5 container'>
                <h1>Coffee Shops</h1>
                <div className='d-flex justify-content-between'>
                    <h4 className='px-4'>{loggedUser.firstName} {loggedUser.lastName}</h4>
                    <Link to={'/dashboard'} className='btn btn-secondary btn-sm mx-3'>Home</Link>
                    <form onSubmit={logoutHandler}>
                        <button className='btn btn-secondary btn-sm'>Log Out</button>
                    </form>
                </div>
            </div>
            <div>
                <h1>Shop Details</h1>
            </div>
            <h3>Name: {thisCafe.name}</h3>
            <h3>Location: {thisCafe.location}</h3>
            <h3>Do you even roast: {thisCafe.isRoaster ? "Yes" : "No"}</h3>
            </> }
        </div>
    );
}

export default ViewCafe;