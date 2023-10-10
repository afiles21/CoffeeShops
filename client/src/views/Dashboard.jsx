import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Dashboard = ({loggedUser, setLoggedUser}) => {

    const [ allCafes, setAllCafes ] = useState([]);
    // const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        console.log(loggedUser);
        axios.get('http://localhost:8000/api/cafes', { withCredentials: true })
            .then( res => {
                //setIsLoggedIn(true);
                setAllCafes(res.data);
            })
            .catch( err => {
                // setIsLoggedIn(false);
                setLoggedUser(null);
            })
    }, [])

    const logoutHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/logout', { withCredentials: true })
            .then( res => {
                navigate('/');
            })
    }

    const deleteHandler = e => {
        e.preventDefault();
        const id = e.target.id;
        axios.delete('http://localhost:8000/api/cafes/' + id)
            .then( res => {
                const filteredCafes = allCafes.filter( cafe => cafe._id !== id);
                setAllCafes(filteredCafes);
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
                        <form onSubmit={logoutHandler}>
                            <button className='btn btn-secondary btn-sm'>Log Out</button>
                        </form>
                    </div>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Roaster</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allCafes.map( cafe => {
                                return(
                                    <tr key={cafe._id}>
                                        <td><Link to={'/coffee/view/' + cafe._id}>{cafe.name}</Link></td>
                                        <td>{cafe.location}</td>
                                        <td>{cafe.isRoaster ? "Yes" : "No"}</td>
                                        <td><Link to={'/coffee/edit/' + cafe._id}>Edit</Link> | <button className='btn btn-secondary btn-sm' onClick={deleteHandler} id={cafe._id}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className='d-flex justify-content-between'>
                    <div className="card" style={{ width: "18rem" }}>
                        <img src="https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1600" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Log a Cafe</h5>
                            <p className="card-text">Can't find the coffee shop you are looking for? Feel free to add your own!</p>
                            <Link to={'/coffee/new'} className="btn btn-secondary btn-lg mt-4">Add a Cafe</Link>
                        </div>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24900.298338780864!2d-121.1826176!3d38.72843105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1696881409147!5m2!1sen!2sus" style={{width: "600px", height: "450px"}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </>}
        </div>
    );
}

export default Dashboard;