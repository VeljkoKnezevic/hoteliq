import { useState } from "react";
import Header from "../components/Header";
import { Authorities, TProfile } from "../types";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { getUser } = useAuth();

  const authority: Authorities = getUser()?.user.guest.authorities[0]
    .authority as Authorities;

  const [info, setInfo] = useState<TProfile>({
    firstName: getUser()?.user.guest.firstName ?? "",
    lastName: getUser()?.user.guest.lastName ?? "",
    email: getUser()?.user.guest.email ?? "",
  });

  // Used to updated based on when
  // the form is submited insted of when input is changed,
  // to be able to cancel the changes
  const [updated, setUpdated] = useState<TProfile>({ ...info });

  // When set to true input info can be changed
  const [editing, setEditing] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setInfo((prev) => ({
      ...prev,
      firstName: updated.firstName,
      lastName: updated.lastName,
      email: updated.email,
    }));

    setEditing(false);
  };

  const cancelEditing = () => {
    setEditing(false);
    // Returns the input to the previous state
    setUpdated({ ...info });
    console.log(authority);
  };

  return (
    <>
      <Header />
      <main className="mx-6 mt-10 rounded-md border-2 border-primary-blue p-3 md:mx-10 lg:mx-auto lg:max-w-[800px] xl:max-w-[1000px]">
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
        {authority === "STAFF" && (
          <div className="flex justify-end text-primary-blue underline">
            <Link to={"/staff"}>Go to staff page</Link>
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;
