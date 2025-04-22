import React, { useEffect, useState } from 'react';
import './MainPage.css';

function MainPage() {
  const [amount, setAmount] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [rate, setRate] = useState(null);

  const currencies = ["USD", "EUR", "GBP", "JPY", "IRR"];

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/330d225c19290693ec966856/latest/${defaultCurrency}`)
      .then(res => res.json())
      .then(data => setRate(data.conversion_rates))
  }, [defaultCurrency]);

  if (!rate) {
    return (
      <div className="container">
        <p> در حال دریافت نرخ ارزها...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>صرافی آنلاین</h2>

      <div className="form">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />
        <select
          value={defaultCurrency}
          onChange={e => setDefaultCurrency(e.target.value)}
        >
          {currencies.map(curr => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>

      <div className="currencies">
        {currencies
          .filter(c => c !== defaultCurrency)
          .map(curr => (
            <div className="card" key={curr}>
              <p>
                {amount} {defaultCurrency} ={" "}
                <span>{(amount * rate[curr]).toFixed(2)}</span> {curr}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MainPage;
