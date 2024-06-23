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

  // When set to true input info can be changed
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

    setEditing(false);
  };

  const cancelEditing = () => {
    setEditing(false);
    // Returns the input to the previous state
    setUpdated({ ...info });
  };

  return (
    <>
      <Header />

      <main className="mx-6 mt-10 rounded-md border-2 border-primary-blue p-3">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold text-text-black">Profile</h2>
          {!editing && (
            <button
              className="text-base font-bold text-secondary-blue"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className={`mt-4 grid ${!editing && "pb-3"}`}
        >
          <label
            className="text-base font-medium text-secondary-blue"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            value={editing ? updated.firstName : info.firstName}
            disabled={!editing}
            onChange={(e) =>
              setUpdated((prev) => ({ ...prev, firstName: e.target.value }))
            }
            type="text"
            id="firstName"
            name="firstName"
          />

          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            value={editing ? updated.lastName : info.lastName}
            disabled={!editing}
            onChange={(e) =>
              setUpdated((prev) => ({ ...prev, lastName: e.target.value }))
            }
            type="text"
            id="lastName"
            name="lastName"
          />

          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            value={editing ? updated.email : info.email}
            disabled={!editing}
            onChange={(e) =>
              setUpdated((prev) => ({ ...prev, email: e.target.value }))
            }
            type="text"
            id="email"
            name="email"
          />

          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            value={editing ? updated.password : info.password}
            disabled={!editing}
            onChange={(e) =>
              setUpdated((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            id="password"
            name="password"
          />

          {editing && (
            <div className="mt-4 flex justify-around">
              <button
                className="rounded bg-primary-blue p-2 text-base font-medium text-[#fff]"
                type="submit"
              >
                Confirm editing
              </button>
              <button
                className="rounded bg-secondary-grey p-2 text-base font-medium text-text-black"
                onClick={cancelEditing}
                type="button"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </main>
    </>
  );
};

export default Profile;
