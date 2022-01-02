import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
function Countries() {
  const [data, setData] = useState([]);
  const [sortData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [rangValue, setRangeValue] = useState(40);
  const [selectedRadio, SetSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];
  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
        )
        .then((res) => {
          setData(res.data);
          setPlayOnce(false);
        });
    }
    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj.sort((a, b) => {
        return b.population - a.population;
      });
      sortedArray.length = rangValue;
      setSortedData(sortedArray);
    };

    sortedCountry();
  }, [data, rangValue, playOnce]);

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          min="1"
          max="250"
          value={rangValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <ul>
          {radios.map((radio) => {
            return (
              <li key={radio}>
                <input
                  type="radio"
                  value={radio}
                  id={radio}
                  checked={radio === selectedRadio}
                  onChange={(e) => SetSelectedRadio(e.target.value)}
                />

                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cancel">
        {selectedRadio && (
          <h5 onClick={() => SetSelectedRadio("")}>Reset Filter</h5>
        )}
      </div>
      <ul className="countries-list">
        {sortData
          .filter((country) => country.region.includes(selectedRadio))
          .map((country, ind) => {
            return (
              <div key={ind}>
                <Card country={country} />
              </div>
            );
          })}
      </ul>
    </div>
  );
}

export default Countries;
