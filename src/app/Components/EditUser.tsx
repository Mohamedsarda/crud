import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../scss/EditUser.scss';

interface UserData {
  id: number;
  username?: string;
  email?: string;
  bio?: string;
  phone?: string;
  status?: string;
}

async function getUserDB(id: number): Promise<UserData> {
  const res = await fetch(`/api/users?id=${id}`, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }
  return res.json();
}

const EditUser = ({
  updateUserId,
  openEdit,
  closeEdit,
}: {
  updateUserId: number;
  openEdit: (id: number) => void;
  closeEdit: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (updateUserId === -1) return;

      setLoading(true);
      setError(null);

      try {
        const userData = await getUserDB(updateUserId);
        setUser(userData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        toast.error(
          "Error: You can't edit this user for now, please try again.",
        );
        closeEdit();
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [updateUserId]);

  if (loading) {
    return (
      <div className="EditUserContainer">
        <div className="EditUser">
          <div>Loading...</div>
        </div>
      </div>
    );
  }
  if (user) console.log(user);

  if (error) {
    return (
      <div className="EditUserContainer">
        <div className="EditUser">
          <div>Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="EditUserContainer">
      <ToastContainer />
      <div className="EditUser">
        <X className="close" onClick={closeEdit} />
        <img src="/images/default.jpeg" alt="avatar" />
        <div className="bottom">
          <div className="left">
            <div className="row">
              <label>User Name {user?.id}</label>
              <input
                type="text"
                value={user?.username || ''}
                onChange={(e) =>
                  setUser((prev) =>
                    prev ? { ...prev, username: e.target.value } : null,
                  )
                }
              />
            </div>
            <div className="row">
              <label>Bio</label>
              <textarea
                value={user?.bio || ''}
                onChange={(e) =>
                  setUser((prev) =>
                    prev ? { ...prev, bio: e.target.value } : null,
                  )
                }
              />
            </div>
          </div>
          <div className="right">
            <div className="row">
              <label>Email</label>
              <input
                type="email"
                value={user?.email || ''}
                onChange={(e) =>
                  setUser((prev) =>
                    prev ? { ...prev, email: e.target.value } : null,
                  )
                }
              />
            </div>
            <div className="row">
              <label>Phone Number</label>
              <input
                type="text"
                value={user?.phone || ''}
                onChange={(e) =>
                  setUser((prev) =>
                    prev ? { ...prev, phone: e.target.value } : null,
                  )
                }
              />
            </div>
            <div className="row">
              <div className="status">
                {['Available', 'On Break', 'Coding', 'Out of Office'].map(
                  (status) => (
                    <p
                      key={status}
                      className={status}
                      onClick={() =>
                        setUser((prev) => (prev ? { ...prev, status } : null))
                      }
                    >
                      {status}
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>
          <button className="EditButton" disabled={loading}>
            {updateUserId === -1 ? 'Submit' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
