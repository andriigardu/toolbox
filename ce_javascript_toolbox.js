function convert() {
            const amount = document.getElementById('amount').value;
            const input_currency = document.getElementById('input_currency').value;
            const output_currency = document.getElementById('output_currency').value;
            const apiUrl = `https://api.exchangerate.host/latest?base=${input_currency}&symbols=${output_currency},USD`;
            fetch(apiUrl)
              .then(response => response.json())
              .then(data => {
                const output_rate = data.rates[output_currency];
                const output_amount = amount * output_rate;
                document.getElementById('resultCE').value = `${output_amount.toFixed(2)} ${output_currency}`;
                document.getElementById('output_currency_name').innerHTML = output_currency;
              });
          }
          document.addEventListener('keydown', function (event) {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    convert();
  }
});