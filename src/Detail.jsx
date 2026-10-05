import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const Detail = () => {
  const {state} = useLocation();
  const nav = useNavigate();
  const {id} = useParams();

  const [info, setInfo] = useState(state?.item || null);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!info) {
      const fetchDirect = async () => {
        setLoad(true);

        try {
          const url = `https://api.fda.gov/drug/label.json?search=id:"${id}"`;
          const res = await axios.get(url);

          if (res.data.results && res.data.results.length > 0) {
            setInfo(res.data.results[0]);
          } else {
            setErr("Details not found");
          }
        } catch (e) {
          setErr("Failed to load details");
        } finally {
          setLoad(false);
        }
      };

      fetchDirect();
    }
  }, [id, info]);

  if (load) {
    return (
      <div className="detail-page">
        <p>Loading details...</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="detail-page">
        <p className="err">{err}</p>

        <button className="back-btn" onClick={() => nav("/")}>
          Go Back
        </button>
      </div>
    );
  }

  if (!info) return null;

  const fda = info.openfda || {};

  const getStr = (arr) => {
    if (!arr || arr.length === 0) {
      return "Not Available";
    }

    return arr.join(", ");
  };

  return (
    <div className="detail-page-new">

      <button
        onClick={() => nav(-1)}
        className="back-btn-new"
      >
        Back to Search
      </button>

      <h1 className="detail-title">
        {getStr(fda.brand_name)}
      </h1>

      {info.warnings && info.warnings.length > 0 && (
        <div className="warning-box">
          <p>{info.warnings[0]}</p>
        </div>
      )}

      {info.active_ingredient && info.active_ingredient.length > 0 && (
        <div className="detail-section">
          <h2>Active Ingredients</h2>
          <hr />

          <ul>
            {info.active_ingredient.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="detail-section">
        <h2>Purpose & Indications</h2>
        <hr />

        <p>
          {info.indications_and_usage
            ? info.indications_and_usage[0]
            : "Information not provided."}
        </p>
      </div>

      <div className="detail-section">
        <h2>Dosage and Administration</h2>
        <hr />

        <p>
          {info.dosage_and_administration
            ? info.dosage_and_administration[0]
            : "Information not provided."}
        </p>
      </div>

      <div className="detail-section">
        <h2>Additional Details</h2>
        <hr />

        <div className="details-grid">
          <p>
            <strong>Generic Name:</strong>{" "}
            {getStr(fda.generic_name)}
          </p>

          <p>
            <strong>Manufacturer:</strong>{" "}
            {getStr(fda.manufacturer_name)}
          </p>

          <p>
            <strong>Substance:</strong>{" "}
            {getStr(fda.substance_name)}
          </p>

          <p>
            <strong>Product Type:</strong>{" "}
            {getStr(fda.product_type)}
          </p>

          <p>
            <strong>Route:</strong>{" "}
            {getStr(fda.route)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;