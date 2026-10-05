import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "./Card";

const Home = () => {
  const [input, setInput] = useState("");
  const [res, setRes] = useState([]);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [cache, setCache] = useState({});

  const timer = useRef(null);
  const controller = useRef(null);

  const fetchApi = async (query) => {
    if (!query) {
      setRes([]);
      return;
    }

    if (cache[query]) {
      setRes(cache[query]);
      return;
    }

    setLoad(true);
    setErr("");

    if (controller.current) {
      controller.current.abort();
    }
    controller.current = new AbortController();

    try {
      const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${query}"&limit=20`;
      const res = await axios.get(url, { signal: controller.current.signal });
      
      const items = res.data.results || [];
      setRes(items);
      setCache((prev) => ({ ...prev, [query]: items }));
    } catch (e) {
      if (axios.isCancel(e)) {
        return;
      }
      if (e.response && e.response.status === 404) {
        setRes([]);
      } else {
        setErr("Something went wrong with search.");
      }
    } finally {
      setLoad(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      fetchApi(val);
    }, 500);
  };

  return (
    <div className="home-container">
      <h2>MediBuddy Search</h2>
      <input 
        type="text" 
        value={input} 
        onChange={handleChange} 
        placeholder="Search medicine brand..." 
        className="search-box"
      />

      {load && <p>Loading...</p>}
      {err && <p className="err">{err}</p>}

      {!load && !err && res.length === 0 && input && (
        <p>No results found for "{input}"</p>
      )}

      <div className="card-list">
        {res.map((item, idx) => (
          <Link key={idx} to={`/medicine/${item.id}`} state={{ item }}>
            <Card item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
