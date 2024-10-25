import React from 'react';
import { UserData } from '../Types/UserData';

const User = ({
  user,
  HandleSetDeleteTrue,
  openEdit,
  closeEdit,
}: {
  user: any;
  HandleSetDeleteTrue: (id: number) => void;
  openEdit: (id: number) => void;
  closeEdit: (id: number) => void;
}) => {
  return (
    <div className="user">
      <p>
        <img
          src={user.avatar ? `/images/${user.avatar}` : '/images/default.jpeg'}
          alt="Avatar"
        />
      </p>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>
        <span className={user.status}>{user.status}</span>
      </p>
      <div className="btns">
        <button className="edit" onClick={() => openEdit(user.id)}>
          Edit
        </button>
        <button className="delete" onClick={() => HandleSetDeleteTrue(user.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default User;
