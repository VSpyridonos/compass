import React, { useEffect, useState } from "react";
import './App.css';
import ResponsiveDrawer from "./components/Drawer";
import axios from 'axios';

const App = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://${process.env.REACT_APP_DIGITAL_OCEAN_DROPLET_IP_ADDRESS}:5000/users/all-users`,
      );
      //console.log(result.data)
      setData(result.data);
    };

    fetchData();
  }, []);

  if (!data) return <pre>Loading data...</pre>

  return (
    <div>
      <ResponsiveDrawer data={data} />
    </div>
  );

}
export default App;
