import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import "./style/style.scss";

import image from "../../utils/images/product-1.png";
import image2 from "../../utils/images/product-2.png";
import image3 from "../../utils/images/product-3.png";
import coin from "../../utils/images/coin.png";
import coin1 from "../../utils/images/coin-1.png";
import coin2 from "../../utils/images/coin-2.png";
import coin3 from "../../utils/images/coin-3.png";
import dispense3 from "../../utils/images/door-juice.png";
import dispense1 from "../../utils/images/door-water.png";
import dispense2 from "../../utils/images/door-soda.png";
import cristal from "../../utils/images/crital.png";

let formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

function VendorMachine() {
  const [list, setList] = useState([]);
  const [machineChange, setMachineChange] = useState([
    { coin: 0.05, qnty: 50 },
    { coin: 0.1, qnty: 50 },
    { coin: 0.25, qnty: 50 },
    { coin: 1, qnty: 50 },
  ]);
  const [coinsTotal, setCoinsTotal] = useState(0);
  //const [insertedCoin, setInsertedCoin] = useState();
  const [dispense, setDispense] = useState();
  const [inputSelector, setInputSelector] = useState("");
  const [updateObject, setupdateObject] = useState({
    data: "",
    index: "",
    qnty: 0,
  });
  const [errorType, setErrorType] = useState();

  const baseURL = "http://localhost:8100/api/products/";

  useEffect(() => {
    fetchData();
    handleCoinChange();
  }, []);

  //Fecha data to set the initial state
  const fetchData = async () => {
    axios
      .get(baseURL)
      .then((response) => {
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error + "Error on get data function");
      });
  };

  //Set the post object to be sendet on axios post request
  const setPost = (item, index, qnty) => {
    setupdateObject({ item, index: index, qnty: qnty });
    setupdateObject((state) => {
      return state;
    });
  };

  //Seting item object and selector code
  const handleSelector = (selector, data, index, qnty) => {
    setPost(data, index, qnty);
    setInputSelector(selector);
    setInputSelector((state) => {
      return state;
    });
  };

  //Update stock axios request
  const createPost = (item, index, qnty) => {
    let cart = item.stock - qnty;
    if (item.stock !== 0) {
      axios
        .put(`${baseURL}${item.id}`, {
          stock: cart,
        })
        .then((response) => {
          let prevState = [...list];
          prevState[index] = response.data.data;
          setList(prevState);
          setCoinsTotal(0);
          setInputSelector("");
        })
        .catch((error) => {
          console.log(error + "Error on put data function");
        });

      if (inputSelector === "F01") setDispense("F01");
      else if (inputSelector === "F02") setDispense("F02");
      else if (inputSelector === "F03") setDispense("F03");
    }
  };

  //Coin addition handeling
  const coinCount = (e) => {
    let coins = parseFloat(e.target.value);
    let total = coinsTotal + coins;
    console.log(e.target.value);
    let prevState = [...machineChange];

    if (e.target.value === "0.05" && machineChange[0].coin === 0.05) {
      prevState[0] = { coin: 0.05, qnty: machineChange[0].qnty + 1 };
      setMachineChange(prevState);
    }
    if (e.target.value === "0.10" && machineChange[1].coin === 0.1) {
      prevState[1] = { coin: 0.1, qnty: machineChange[1].qnty + 1 };
      setMachineChange(prevState);
    }
    if (e.target.value === "0.25" && machineChange[2].coin === 0.25) {
      prevState[2] = { coin: 0.25, qnty: machineChange[2].qnty + 1 };
      setMachineChange(prevState);
    }
    if (e.target.value === "1" && machineChange[3].coin === 1) {
      prevState[3] = { coin: 1, qnty: machineChange[3].qnty + 1 };
      setMachineChange(prevState);
    }

    setCoinsTotal(total);
    setCoinsTotal((state) => {
      return state;
    });
  };

  const handleDispense = () => {
    if (dispense === "F01") setDispense("Done");
    if (dispense === "F02") setDispense("Done");
    if (dispense === "F03") setDispense("Done");
    cancelSelection();
  };

  //Setting enviroment for coin object handeling
  const handleCoinChange = (amount, price) => {
    let coins = [];
    machineChange.forEach((element) => {
      coins.push(element.coin);
    });

    let prevState = [...machineChange];
    let p = amount - price;
    console.log(p);
    let res = p.toFixed(2);

    while (res > 0) {
      if (res >= 1) {
        let x = res - 1;
        let change = x.toFixed(2);
        prevState[3] = { coin: 1, qnty: machineChange[3].qnty - 1 };
        setMachineChange(prevState);
        console.log(change);
        res = change;
      } else if (res < 1 && res >= 0.25) {
        let x = res - 0.25;
        let change = x.toFixed(2);
        prevState[2] = { coin: 0.25, qnty: machineChange[2].qnty - 1 };
        setMachineChange(prevState);
        console.log(change);
        res = change;
      } else if (res < 0.25 && res >= 0.1) {
        let x = res - 0.1;
        let change = x.toFixed(2);
        prevState[1] = { coin: 0.1, qnty: machineChange[1].qnty - 1 };
        setMachineChange(prevState);
        console.log(change);
        res = change;
      } else if (res <= 0.1 && res >= 0.05) {
        let x = res - 0.05;
        let change = x.toFixed(2);
        prevState[0] = { coin: 0.05, qnty: machineChange[0].qnty - 1 };
        setMachineChange(prevState);
        console.log(change);
        res = change;
      }
    }
    setMachineChange((state) => {
      console.log(state);
      return state;
    });
  };

  const cancelSelection = () => {
    setCoinsTotal(0);
    setInputSelector("");
    setupdateObject({});
    setDispense("");
  };

  if (!list) return null;

  return (
    <>
      <div className="container">
        {/*PRODUCT CARD*/}
        <div className="section-left">
          <div className="vendor-machine">
            {list.length <= 0 ? (
              <CircularProgress />
            ) : (
              list.map((data) => (
                <div key={data.id} className="item">
                  {data.id === 1 ? (
                    <img src={image3} alt="" width="125px" height="100px" />
                  ) : data.id === 2 ? (
                    <img src={image} alt="" width="100px" height="100px" />
                  ) : data.id === 3 ? (
                    <img src={image2} alt="" width="40px" height="100px" />
                  ) : null}

                  <h2 key={data.name}>{data.name}</h2>
                  <h3 key={data.price}>{data.price} €</h3>
                  <h3 id={data.selector}>{data.selector}</h3>
                </div>
              ))
            )}
          </div>
          <div className="door-container">
            {dispense === "Done" ? (
              <div
                className="door"
                style={{ backgroundImage: `url(${cristal})` }}
              ></div>
            ) : dispense === "F01" ? (
              <div
                className="door"
                style={{ backgroundImage: `url(${dispense2})` }}
                onClick={() => handleDispense()}
              ></div>
            ) : dispense === "F02" ? (
              <div
                className="door"
                style={{ backgroundImage: `url(${dispense3})` }}
                onClick={() => handleDispense()}
              ></div>
            ) : dispense === "F03" ? (
              <div
                className="door"
                style={{ backgroundImage: `url(${dispense1})` }}
                onClick={() => handleDispense()}
              ></div>
            ) : (
              <div
                className="door"
                style={{ backgroundImage: `url(${cristal})` }}
              ></div>
            )}
          </div>
        </div>
        <div className="section-right">
          {/*SELECTOR*/}
          <div className="selectors">
            <input
              placeholder="Choose product"
              value={inputSelector}
              readOnly
              onChange={() => console.log("ok")}
            />
          </div>

          {/*BUY FUNCTIONALITY*/}
          <div className="select-button">
            {list.length <= 0 ? (
              <>
                <button>F01</button>
                <button>F02</button>
                <button>F03</button>
              </>
            ) : (
              list.map((data, index) => (
                <button
                  onClick={() => handleSelector(data.selector, data, index, 1)}
                  key={index}
                >
                  {data.selector}
                </button>
              ))
            )}
          </div>

          <div className="coin-total">
            <h2>{formatter.format(coinsTotal)}</h2>
          </div>

          {/*SELECTOR BUTTONS*/}
          <div className="actions">
            <button
              key="Button1"
              onClick={coinCount}
              value="0.05"
              style={{ backgroundImage: `url(${coin})` }}
            />
            <button
              key="Button2"
              onClick={coinCount}
              value="0.10"
              style={{ backgroundImage: `url(${coin1})` }}
            />
            <button
              key="Button3"
              onClick={coinCount}
              value="0.25"
              style={{ backgroundImage: `url(${coin2})` }}
            />
            <button
              key="Button4"
              onClick={coinCount}
              value="1"
              style={{ backgroundImage: `url(${coin3})` }}
            />
          </div>
          <div className="buy-button">
            {coinsTotal <= 0 && !inputSelector ? (
              <>
                <button onClick={() => setErrorType("er1")}>Buy</button>
                {errorType === "er1" ? (
                  <p>Sorry, insert coins and select a drink</p>
                ) : null}
              </>
            ) : !inputSelector ? (
              <>
                <button onClick={() => setErrorType("er2")}>Buy</button>
                {errorType === "er2" ? <p>Sorry, select a drink</p> : null}
              </>
            ) : coinsTotal <= 0 ? (
              <>
                <button onClick={() => setErrorType("er3")}>Buy</button>
                {errorType === "er3" ? <p>Sorry, insert coins</p> : null}
              </>
            ) : updateObject.item.price > coinsTotal ? (
              <>
                <button onClick={() => setErrorType("er4")}>Buy</button>
                {errorType === "er4" ? (
                  <p>
                    Sorry, not enough coins, insert{" "}
                    {formatter.format(updateObject.item.price - coinsTotal)}
                    more
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    createPost(updateObject.item, updateObject.index, 1)
                  }
                >
                  Buy
                </button>
              </>
            )}
          </div>
          <button className="cancel-button" onClick={() => cancelSelection()}>
            cancel
          </button>
        </div>
        {/*CHANGE*/}
        <button onClick={() => handleCoinChange(coinsTotal, list[1].price)}>
          See Change
        </button>
      </div>
    </>
  );
}

export default VendorMachine;
