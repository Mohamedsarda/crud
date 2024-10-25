'use client';
import { useState } from 'react';
import './scss/home.scss';
import './scss/table.scss';
import Header from './Components/Header';
import Table from './Components/Table';
import ConfirmDelete from './Components/ConfirmDelete';
import EditUser from './Components/EditUser';
import { UserData } from './Types/UserData';

export default function Home() {
  const [deleteBtn, setDeleteBtn] = useState<boolean>(false);
  const [deletedUserID, setDeletedUserID] = useState<number>(0);
  const [updateUserId, setupdateUserId] = useState<number>(0);
  const HandleSetDeleteTrue = (id: number) => {
    setDeleteBtn(true);
    setDeletedUserID(id);
  };
  const HandleSetDeleteFalse = () => {
    setDeleteBtn(false);
  };

  const [toggleEdit, setToggleEdit] = useState(0);

  const openEdit = (id: number) => {
    setToggleEdit(1);
    setupdateUserId(id);
    console.log(id);
  };
  const closeEdit = () => {
    setToggleEdit(0);
  };
  console.log(deleteBtn);

  return (
    <div className="Home">
      <Header openEdit={openEdit} />
      {toggleEdit && (
        <EditUser
          updateUserId={updateUserId}
          openEdit={openEdit}
          closeEdit={closeEdit}
        />
      )}
      <Table
        openEdit={openEdit}
        closeEdit={closeEdit}
        HandleSetDeleteTrue={HandleSetDeleteTrue}
      />
      {deleteBtn && (
        <ConfirmDelete
          HandleSetDeleteFalse={HandleSetDeleteFalse}
          id={deletedUserID}
        />
      )}
    </div>
  );
}
