import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Allusers.css'
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import AddForm from '../createsession/CreateSession'


const Allusers = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');  // Selected user's email
    const [userAvailability, setUserAvailability] = useState<any[]>([]); // Store availability
    const [errorMessage, setErrorMessage] = useState<string>(''); // For error messages
    const [selectedSession, setSelectedSession] = useState<string>("none");
   
    // Fetch all users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                setErrorMessage('Failed to fetch users');
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Fetch availability when a user is selected
    const handleUserSelect = async (email: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${email}`);
            setSelectedUser(email);
            setUserAvailability(response.data);  // Set availability of selected user
        } catch (error) {
            setErrorMessage('Failed to fetch availability');
            console.error('Failed to fetch user availability:', error);
        }
    };
    const col = [
        {
            name:"Start time",
            selector:(row:any) => {
            return <>{new Date(row.start.date).toLocaleTimeString()}</>}

        },    {
            name:"End time",
            selector:(row:any) => new Date(row.end.date).toLocaleTimeString()

        },   {
            name:"Duration",
            selector:(row:any) => row.duration

        },{
            name:"Action",
            selector:(row:any) => {
                return <>
                <Button variant="outline-info" onClick={handleSessionClick}>Create Session</Button>
               
              </>
            }

        },
    ]

    const handleSessionClick = ()=>{
        if(selectedSession==="none"){
            setSelectedSession("block")
        }else{
            setSelectedSession("none")
        }
    }

    return (
        <div className="allusers_container">
            <div className="allusers_sidebar">
                <ul>
                    <h1>All user</h1>
                    {users.map((user) => (
                        <li key={user.email}>
                            <button onClick={() => handleUserSelect(user.email)}>
                                {user.email}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="allusers_content">
                {selectedUser && (
                    <div>
                        <h2>Availability </h2>
                        <DataTable columns={col} data={[userAvailability]} striped={true} highlightOnHover={true} pointerOnHover={true} responsive={true}  />
                        <div style={{ display: selectedSession}}>
                           <AddForm/>
                         </div>
                    </div>
                )}
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Allusers;
