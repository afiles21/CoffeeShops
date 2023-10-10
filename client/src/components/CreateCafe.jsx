import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateCafe = ({loggedUser, allCafes, setAllCafes}) => {

    const [ name, setName ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ isRoaster, setIsRoaster ] = useState(false);
    const [ cafeErrors, setCafeErrors ] = useState([]);
    const navigate = useNavigate();

    const newCafeHandler = e => {
        e.preventDefault();
        const newCafe = {
            name,
            location,
            isRoaster
        };
        axios.post('http://localhost:8000/api/cafes', newCafe)
            .then( res => {
                console.log(res);
                setAllCafes([...allCafes, newCafe]);
                navigate('/dashboard');
            })
            .catch( err => {
                const errArray = [];
                console.log(errArray);
                console.log(err)
                for(const key of Object.keys(err.response.data.errors)) {
                    errArray.push(err.response.data.errors[key].message)
                }
                setCafeErrors(errArray);
            })
    }

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
            <div className='d-flex justify-content-evenly'>
                <div>
                    <h1>Add a Cafe</h1>
                    <form className='' onSubmit={newCafeHandler}>
                        <div style={{ color: "red" }}>
                            {
                                cafeErrors.map( (err, idx) => {
                                    return(
                                        <p key={idx}>{err}</p>
                                    )
                                })
                            }
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Name</label>
                            <input type='text' className='form-control' value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Location</label>
                            <input type='text' className='form-control' value={location} onChange={e => setLocation(e.target.value)}/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Does this coffee shop roast their own beans?</label>
                            <input type='checkbox' checked={isRoaster} onChange={e => setIsRoaster(e.target.checked)}/>
                        </div>
                        <button className='btn btn-primary btn-lg'>Add Cafe</button>
                    </form>
                </div>
                <img src='https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=1600' className='border rounded' style={{width: "500px"}}/>
            </div>
            </> }
        </div>
    );
}

export default CreateCafe;