import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { useAuth } from "../context/AuthContext";
import { TProfile } from "../types";

type TStaffGuests = {
  userSearch: string;
  setUserSearch: React.Dispatch<SetStateAction<string>>;
};

const StaffGuests = ({ userSearch, setUserSearch }: TStaffGuests) => {
  const queryClient = useQueryClient();

  const { getUser } = useAuth();

  // Guests
  const getGuests = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/guests`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getUser()?.user.jwt}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  };

  const {
    error: guestsError,
    isLoading: guestsLoading,
    data: guestsData,
  } = useQuery<TProfile[]>({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  const deleteGuest = async (id: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/guests/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getUser()?.user.jwt}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };

  const deleteGuestMutation = useMutation({
    mutationFn: deleteGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      console.log("Guest deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting guest:", error);
    },
  });

  const handleDeleteClick = (id: number | null) => {
    if (id) {
      if (confirm(`Are you sure you want to delete user with id: ${id} `)) {
        deleteGuestMutation.mutate(id);
      } else {
        return;
      }
    }
  };

  if (guestsError) {
    return <p>Error loading guests: {guestsError.message}</p>;
  }

  if (guestsLoading) {
    return <p>Loading guests</p>;
  }

  return (
    <>
      <div className="mt-6 flex justify-between">
        <h3 className="text-2xl text-secondary-blue">Guests</h3>
      </div>
      <section>
        <input
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          type="text"
          className=" mb-5 mt-5 w-full rounded-lg border-2 border-secondary-grey bg-[url('/search.svg')] bg-[center_left_0.5rem] bg-no-repeat py-3 pl-8 text-sm font-medium xl:mt-6"
          placeholder="Search Users by Email"
        />

        {guestsData &&
          guestsData
            .filter((guest: TProfile) =>
              guest.email?.toLowerCase().includes(userSearch.toLowerCase())
            )
            .slice(0, 6)
            .map((guest: TProfile) => {
              return (
                <div
                  className="mb-2 rounded-lg border-2 border-secondary-grey "
                  key={guest.id}
                >
                  <div className="flex justify-between px-2">
                    <span className="font-normal">
                      {guest.firstName ?? "_____"} {guest.lastName ?? "_____"},{" "}
                      {guest.email}
                    </span>
                    <button
                      onClick={() =>
                        handleDeleteClick(guest.id ? guest.id : null)
                      }
                      className="text-[#f00]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
      </section>
    </>
  );
};

export default StaffGuests;
