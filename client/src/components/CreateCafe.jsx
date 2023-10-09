import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateCafe = ({allCafes, setAllCafes}) => {

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
        }
        axios.post('http://localhost:8000/api/cafes', newCafe)
            .then( res => {
                setAllCafes(...allCafes, newCafe);
                navigate('/dashboard');
            })
            .catch( err => {
                const errArray = [];
                for(const key of Object.keys(err.response.data.errors)) {
                    errArray.push(err.response.data.errors[key].message)
                }
                setCafeErrors(errArray);
                console.log(err)
            })
    }

    return(
        <div>
            { loggedUser === null ? <div>
                <h1>Must be logged in!</h1>
                <Link to={'/'}>Return to Login</Link>
            </div>   : 
            <>
            <div>
                <h1>Add a Cafe</h1>
                <Link to={'/dashboard'}>Home</Link>
            </div>
            <form onSubmit={newCafeHandler}>
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
                    <label>Name</label>
                    <input type='text' value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className='mb-3'>
                    <label>Location</label>
                    <input type='text' value={location} onChange={e => setLocation(e.target.value)}/>
                </div>
                <div className='mb-3'>
                    <label>Does this coffee shop roast their own beans?</label>
                    <input type='checkbox' checked={isRoaster} onChange={e => setIsRoaster(e.target.checked)}/>
                </div>
                <button className='btn btn-secondary btn-lg'>Add Cafe</button>
            </form>
            </> }
        </div>
    );
}

export default CreateCafe;