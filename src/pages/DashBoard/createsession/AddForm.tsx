import React, { useState } from 'react';
import './ScheduledSlotsForm.css';

interface Attendee {
  name: string;
  email: string;
}

interface Slot {
  start: string;
  end: string;
  attendees: Attendee[];
}

const ScheduledSlotsForm: React.FC = () => {
  const [slot, setSlot] = useState<Slot>({
    start: '',
    end: '',
    attendees: [{ name: '', email: '' }],
  });

  const handleSlotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlot({ ...slot, [e.target.name]: e.target.value });
  };

  const handleAttendeeChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAttendees = [...slot.attendees];
    updatedAttendees[index] = { ...updatedAttendees[index], [e.target.name]: e.target.value };
    setSlot({ ...slot, attendees: updatedAttendees });
  };

  const addAttendee = () => {
    setSlot({ ...slot, attendees: [...slot.attendees, { name: '', email: '' }] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', slot);
    // Add API call here to submit form data
  };

  return (
    <form className="slot-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Start Time</label>
        <input
          type="datetime-local"
          name="start"
          value={slot.start}
          onChange={handleSlotChange}
          required
        />
      </div>
      <div className="form-group">
        <label>End Time</label>
        <input
          type="datetime-local"
          name="end"
          value={slot.end}
          onChange={handleSlotChange}
          required
        />
      </div>

      {slot.attendees.map((attendee, index) => (
        <div key={index} className="attendee-form">
          <h3>Attendee {index + 1}</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={attendee.name}
              onChange={(e) => handleAttendeeChange(index, e)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={attendee.email}
              onChange={(e) => handleAttendeeChange(index, e)}
              required
            />
          </div>
        </div>
      ))}

      <button type="button" onClick={addAttendee} className="add-attendee-btn">
        Add Attendee
      </button>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default ScheduledSlotsForm;
