import React, { use, useEffect, useState } from 'react';
import User from './User';
import { UserData } from '../Types/UserData';
import { Loader } from 'lucide-react';

interface UserDbInfo {
  id: number;
  username: string;
  avatar: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  bio: string;
}

async function getUsers() {
  const res = await fetch('/api/users', {
    method: 'GET',
  });
  const data = await res.json();
  return data;
}

const Table = ({
  HandleSetDeleteTrue,
  openEdit,
  closeEdit,
}: {
  HandleSetDeleteTrue: (id: number) => void;
  openEdit: (id: number) => void;
  closeEdit: () => void;
}) => {
  const [data, setData] = useState<UserDbInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletedUserID, setDeletedUserID] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getUsers();
        console.log(res);

        setData(res);
      } catch (err) {
        setError('Error : Failed To Fetch Users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    console.log(data);
  }, []);

  return (
    <div className="Table-gird">
      <div className="header">
        <p className="header-p">Avatar</p>
        <p className="header-p">User Name</p>
        <p className="header-p">Email</p>
        <p className="header-p">Phone Number</p>
        <p className="header-p">Status</p>
        <p className="header-p">Actions</p>
      </div>
      {loading ? (
        <div className="loading">
          <p>Loading . . .</p>
          <Loader className="loading-icon" />
        </div>
      ) : data ? (
        data.map((user) => (
          <User
            key={user.id}
            user={user}
            HandleSetDeleteTrue={HandleSetDeleteTrue}
            openEdit={openEdit}
            closeEdit={closeEdit}
          />
        ))
      ) : (
        <div>User Not Found</div>
      )}
    </div>
    // <div className="Table-gird">
    //   <p className="header-p">Avatar</p>
    //   <p className="header-p">User Name</p>
    //   <p className="header-p">Email</p>
    //   <p className="header-p">Phone Number</p>
    //   <p className="header-p">Status</p>
    //   <p className="header-p">Actions</p>
    //   {/* {data ? <User data={data} /> : } */}
    //   {/* <User
    //       id="5"
    //       username="msarda"
    //       email="msarda@gmail.com"
    //       phone="06784512"
    //       status="Active"
    //     /> */}
    //   <p>
    //     <img
    //       src="https://images.pexels.com/photos/28742945/pexels-photo-28742945/free-photo-of-femme-a-la-mode-avec-un-telephone-vintage-a-l-exterieur.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
    //       alt="Avatar"
    //     />
    //   </p>
    //   <p>username</p>
    //   <p>email</p>
    //   <p>phone</p>
    //   <p>status</p>
    //   <div className="btns">
    //     <button className="edit">Edit</button>
    //     <button className="delete" onClick={() => HandleSetDeleteTrue()}>
    //       Delete
    //     </button>
    //   </div>
    // </div>
  );
};

export default Table;
