import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Home = () => {
  //Locations need to be fetched from the backend location list of hotels
  const [location, setLocation] = useState<string>("");

  return (
    <>
      <header>
        <form>
          <label htmlFor="location">Current location</label>
          <select name="location" id="location">
            <option value="Spain">Spain</option>
            <option value="Australia">Australia</option>
          </select>
        </form>
      </header>
      <main>
        <Sidebar />
      </main>
    </>
  );
};

export default Home;
