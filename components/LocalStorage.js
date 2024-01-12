import React, {useEffect } from "react";


const url = "https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json";

const Localdata = () => {

  const fetchApi = async (APIurl) => {
    const response = await fetch(APIurl);
    const data = await response.json();
    localStorage.setItem("apiData", JSON.stringify(data));
  };


  useEffect(() => {
    fetchApi(url);
  }, []);



  return (
    <div>
    </div>
  );
};

export default Localdata;
