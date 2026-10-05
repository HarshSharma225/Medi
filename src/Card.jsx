const Card = ({ item }) => {
  const fda = item.openfda || {};

  const getStr = (arr) => {
    return arr && arr.length > 0 ? arr[0] : "NA";
  };

  return (
    <div className="card">
      <h3>{getStr(fda.brand_name)}</h3>
      <p><strong>Generic: </strong> {getStr(fda.generic_name)}</p>
      <p><strong> Maker:</strong> {getStr(fda.manufacturer_name)}</p>
      <p><strong>Type:</strong> {getStr(fda.product_type)}</p>
      <p><strong>Route: </strong> {getStr(fda.route)}</p>
    </div>
  );
};

export default Card;
