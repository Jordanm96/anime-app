import Layout from "../../components/shared/Layout/Layout";
import "./Watchlist.css";
import Show from "../../components/Show/Show";
import { useState, useEffect } from "react";
import { getUserWatchlist } from "../../services/users";
import "./Watchlist.css";

const Watchlist = ({ user, watchlistShows, setWatchlistShows }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const shows = await getUserWatchlist(user.id);
      setWatchlistShows(shows);
      setIsLoaded(true);
    };
    fetchWatchlist();
  }, [setWatchlistShows, user.id]);

  const showJSX = watchlistShows.map((show, index) => (
    <Show
      _id={show._id}
      title={show.title}
      imgURL={show.imgURL}
      user={user}
      setWatchlistShows={setWatchlistShows}
      key={index} />
  ));

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout user={user}>
      <h3 className="watchlist-title">Watchlist</h3>
      <div className="shows">
        {showJSX}
      </div>
    </Layout>
  );
};

export default Watchlist;
