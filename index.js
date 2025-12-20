const express = require('express');
const app = express();
const port = 3000;

// Mock exchange rate data for now
const exchangeRates = {
  'USD': 1.0,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 150.0,
  'TRY': 32.0
};

// Endpoint to get exchange rate against USD
app.get('/exchange-rate', (req, res) => {
  const currencyCode = req.query.currency;

  if (!currencyCode) {
    return res.status(400).json({ error: 'Currency code is required' });
  }

  const upperCaseCurrencyCode = currencyCode.toUpperCase();

  if (exchangeRates[upperCaseCurrencyCode]) {
    res.json({
      baseCurrency: 'USD',
      targetCurrency: upperCaseCurrencyCode,
      rate: exchangeRates[upperCaseCurrencyCode]
    });
  } else {
    res.status(404).json({ error: `Exchange rate for ${upperCaseCurrencyCode} not found` });
  }
});

app.listen(port, () => {
  console.log(`Exchange rate service listening at http://localhost:${port}`);
});
