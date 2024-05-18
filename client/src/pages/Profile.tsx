import { SyntheticEvent, useState } from "react";
import Header from "../components/Header";
import { ProfileInfo } from "../types";

const Profile = () => {
  const [info, setInfo] = useState<ProfileInfo>({
    firstName: "Veljko",
    lastName: "Knezevic",
    email: "veljkoBitno@gmail.com",
    password: "password",
  });

  // Used to updated based on when
  // the form is submited insted of when input is changed,
  // to be able to cancel the changes

  const [updated, setUpdated] = useState<ProfileInfo>({ ...info });

  const [editing, setEditing] = useState<boolean>(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setInfo((prev) => ({
      ...prev,
      firstName: updated.firstName,
      lastName: updated.lastName,
      email: updated.email,
      password: updated.password,
    }));
  };

  return (
    <>
      <Header />

      <main>
        <h2>Profile</h2>
        <button onClick={() => setEditing(true)}>Edit</button>
        <form onSubmit={handleSubmit} className="grid">
          <label htmlFor="firstName">
            First Name:
            <input
              value={editing ? updated.firstName : info.firstName}
              disabled={!editing}
              onChange={(e) =>
                setUpdated((prev) => ({ ...prev, firstName: e.target.value }))
              }
              type="text"
              id="firstName"
              name="firstName"
            />
          </label>
          <label htmlFor="lastName">
            Last Name:
            <input
              value={editing ? updated.lastName : info.lastName}
              disabled={!editing}
              onChange={(e) =>
                setUpdated((prev) => ({ ...prev, lastName: e.target.value }))
              }
              type="text"
              id="lastName"
              name="lastName"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              value={editing ? updated.email : info.email}
              disabled={!editing}
              onChange={(e) =>
                setUpdated((prev) => ({ ...prev, email: e.target.value }))
              }
              type="text"
              id="email"
              name="email"
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              value={editing ? updated.password : info.password}
              disabled={!editing}
              onChange={(e) =>
                setUpdated((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              id="password"
              name="password"
            />
          </label>

          {editing && <button type="submit">Confirm editing</button>}
        </form>
      </main>
    </>
  );
};

export default Profile;
