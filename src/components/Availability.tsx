import React, { useState } from 'react';
import axios from 'axios';

const Availability: React.FC = () => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [duration, setDuration] = useState<number>(30);

    const handleAddAvailability = async () => {
        const email = sessionStorage.getItem("email");
        try {
            await axios.post('http://localhost:5000/api/availability', {email, start, end, duration });
            // Optionally, update state or notify user
        } catch (error) {
            console.error('Failed to add availability:', error);
        }
        setStart("");
        setEnd("");
        setDuration((30));
    };

    return (
        <div className='availability-div'>
            <div className='availability-container'>
                <h1>Set Your Availability</h1>
                <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
                <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
                <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
                <button onClick={handleAddAvailability}>Add Slot</button>
            </div>
            
        </div>
    );
};

export default Availability;
