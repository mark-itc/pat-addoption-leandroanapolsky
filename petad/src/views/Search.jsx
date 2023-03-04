import { useState, useEffect } from "react";
import "./Search.css";
import "../components/Button.css";
import Modal from "../components/Modal";

function Search() {
  const [advance, setAdvance] = useState(false);

  const [searchObj, setSearchObj] = useState({
    type: "",
    status: "",
    height: 0,
    weight: 0,
    name: "",
  });

  const search = () => {
    // console.log(type);
    console.log(searchObj, advance);
  };

  const toggleAdvance = () => {
    setAdvance(!advance);
  };

  return (
    <div  className="search-form">
      <Modal />
      <h1>Search pets</h1>
      {advance ? (
        <div  className="search-form">
          <label className="label">Type</label>
          <select
            onChange={(e) =>
              setSearchObj({ ...searchObj, type: e.target.value })
            }
          >
            <option value="-">-</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
          <label className="label">Adoption Status</label>
          <select
            onChange={(e) =>
              setSearchObj({ ...searchObj, status: e.target.value })
            }
          >
            <option value="-">-</option>
            <option value="available">available</option>
            <option value="fostered">Fostered</option>
            <option value="adopted">Adopted</option>
          </select>
          <label className="label">Height</label>
          <input
            type="text"
            onChange={(e) =>
              setSearchObj({ ...searchObj, height: e.target.value })
            }
          />
          <label className="label">Weight</label>
          <input
            type="text"
            onChange={(e) =>
              setSearchObj({ ...searchObj, weight: e.target.value })
            }
          />
          <label className="label">Name</label>
          <input
            type="text"
            onChange={(e) =>
              setSearchObj({ ...searchObj, name: e.target.value })
            }
          />
        </div>
      ) : (
        <div>
          <label className="label">Type</label>
          <select
            onChange={(e) =>
              setSearchObj({ ...searchObj, type: e.target.value })
            }
          >
            <option value="-">-</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      <div>
        <label className="label">Advanced search</label>
        <input type="checkbox" onChange={(e) => toggleAdvance()} />
      </div>

      <button onClick={search} className="main">
        Search
      </button>
    </div>
  );
}

export default Search;
