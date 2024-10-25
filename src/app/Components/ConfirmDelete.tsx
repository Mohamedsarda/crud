import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmDelete = ({
  HandleSetDeleteFalse,
  id,
}: {
  HandleSetDeleteFalse: () => void;
  id: number;
}) => {
  const deleteUser = async () => {
    console.log(id);

    // try {
    //   const response = await fetch(`/api/users?id=${id}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   if (!response.ok) {
    //     toast.error('Failed to delete user');
    //     return;
    //   } else {
    //     const data = await response.json();
    //     console.log(data);

    //     toast.success(data.message);
    //   }
    // } catch (error) {
    //   toast.error('Error deleting user');
    //   return;
    // }
  };

  return (
    <div className="ConfirmDeleteContainer">
      <ToastContainer />
      <div className="ConfirmDelete">
        <img src="https://iili.io/HXkqF3l.png" alt="" />
        <p>Are You Sure You Want To Delete This User</p>
        <div className="btns">
          <button className="cancel" onClick={() => HandleSetDeleteFalse()}>
            Cancel
          </button>
          <button className="delete" onClick={() => deleteUser()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
