import { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { getShow, deleteShow } from "../../services/shows";
import { addToWatchlist } from "../../services/users";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./ShowDetail.css";

function ShowDetail({ user, watchlistShows }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchShow = async () => {
      const anime = await getShow(id);
      console.log(anime)
      setShow(anime);
      setIsLoaded(true);
    };
    fetchShow();
  }, [id]);

  useEffect(() => {
    const checkWatchlist = () => {
      const show = watchlistShows.find(show => (show.id === id))
      if (show) {
        setInWatchlist(true)
      }
    };
    checkWatchlist();
  }, [id, watchlistShows]);
  

  const handleWatchlist = (e) => {
    e.preventDefault();
    console.log(user.id, show._id);
    addToWatchlist(user.id, show._id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteShow(show._id);
    history.push("/shows");
  };

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Layout user={user}>
        <div className="show-detail">
          <img className="anime-image" src={show.imgURL} alt={show.title} />
          <div className="detail">
              <div className="info-container">
                <div className="title">{show.title}</div>
                <div className="duration">
                  <strong>({`${show.duration}`})</strong>
                </div>
                  <div className="plot">{show.plot}</div>
              </div>
            <div className="button-container">
              {user && !inWatchlist ? <Button id="watchlist-button" onClick={handleWatchlist}>
                +Watchlist
              </Button> : null}
              <Button id="edit-button" className="edit-button" onClick={() => { history.push(`/shows/${show._id}/edit`) }}  >
                {/* <Link className="edit-link" to={`/shows/${show._id}/edit`}> */}
                  Edit
                {/* </Link> */}
              </Button>
              <Button id="delete-button" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ShowDetail;
