import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import Show from "../../components/Show/Show";
import { useState, useEffect } from "react";
import { getShows } from "../../services/shows";
import "./AllShows.css";

const AllShows = ({ user }) => {
  const [search, setSearch] = useState("");
  const [queriedShows, setQueriedShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const shows = await getShows();
      setQueriedShows(shows);
    };
    fetchShows();
  }, []);
  
  const filteredImages = queriedShows.filter((val2) => {
    return val2.title.toLowerCase().includes(search.toLowerCase());
  });
  
  const showJSX = filteredImages.map((show, index) => (
    <Show _id={show._id} title={show.title} imgURL={show.imgURL} key={index} />
  ));

  return (
      <Layout user={user}>
        <label id="search">
        Search: {" "}
        <input
        className="search-input"
          type="text"
          placeholder="Anime title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
          </label>
        <div className="shows">{showJSX}</div>
      </Layout>
  );
};

export default AllShows
