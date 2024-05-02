import { useState } from "react";
import Header from "../components/Header";
import { ProfileInfo } from "../types";

const Profile = () => {
  const [info, setInfo] = useState<ProfileInfo>({
    firstName: "Veljko",
    lastName: "Knezevic",
    email: "veljkoBitno@gmail.com",
    password: "password",
  });

  const [editing, setEditing] = useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    const { firstName, lastName, email, password } = e.target;
  };

  return (
    <>
      <Header />

      <main>
        <h2>Profile</h2>
        <button onClick={() => setEditing(true)}>Edit</button>
        <form onSubmit={handleSubmit} className="grid">
          <fieldset disabled={editing}>
            <label htmlFor="firstName">
              First Name:
              <input
                value={info.firstName}
                type="text"
                id="firstName"
                name="firstName"
              />
            </label>
            <label htmlFor="lastName">
              Last Name:
              <input
                value={info.lastName}
                type="text"
                id="lastName"
                name="lastName"
              />
            </label>
            <label htmlFor="email">
              Email:
              <input value={info.email} type="text" id="email" name="email" />
            </label>
            <label htmlFor="password">
              Password:
              <input
                value={info.password}
                type="password"
                id="password"
                name="password"
              />
            </label>
          </fieldset>

          {editing && <button type="submit">Confirm editing</button>}
        </form>
      </main>
    </>
  );
};

export default Profile;
