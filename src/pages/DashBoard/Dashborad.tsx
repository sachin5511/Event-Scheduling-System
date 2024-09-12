import React, { useState} from 'react';
import Allusers from './alluser/Allusers';

// Content components
const AddUser = () => <div>Add User Content</div>;
const EditUser = () => <div>Edit User Content</div>;
const DeleteUser = () => <div>Delete User Content</div>;

const Sidebar: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('AllUsers');
  
   // Fetch all users when the component mounts

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'AllUsers':
        return <Allusers/>;
      case 'AddUser':
        return <AddUser />;
      case 'EditUser':
        return <EditUser />;
      case 'DeleteUser':
        return <DeleteUser />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="user-profile">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="avatar"
          />
          <div className="user-info">
            <p>Welcome</p>
            <h4>Sachin Gupta</h4>
            <div className="status">
              <p className="online_dot"></p> <span>Online</span>
            </div>
          </div>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Type to search..." />
        </div>

        <ul className="menu">
          <li className="menu-item" onClick={() => handleMenuClick('AllUsers')}>
            <span className="icon">📋</span> All Users
          </li>
          <li className="menu-item" onClick={() => handleMenuClick('AddUser')}>
          <i className="ri-user-add-line ri-lg" ></i> Add User
          </li>
          <li className="menu-item" onClick={() => handleMenuClick('EditUser')}>
          <i className="ri-edit-line"></i> Edit User
          </li>
          <li className="menu-item" onClick={() => handleMenuClick('DeleteUser')}>
            <span className="icon">📅</span> Delete User
          </li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Sidebar;
