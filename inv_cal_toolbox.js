
function calculate() {
  let futureValue = 0;
  let totalContributions = 0;
  let dividends = [];
  let principal = isNaN(parseFloat(document.getElementById('principal').value)) ? 0 : parseFloat(document.getElementById('principal').value);
  let interestRate = isNaN(parseFloat(document.getElementById('interestRate').value)) ? 0 : parseFloat(document.getElementById('interestRate').value);
  let years = isNaN(parseFloat(document.getElementById('years').value)) ? 0 : parseFloat(document.getElementById('years').value);
  let contributions = isNaN(parseFloat(document.getElementById('contributions').value)) ? 0 : parseFloat(document.getElementById('contributions').value);
  let paymentFrequency = isNaN(parseFloat(document.getElementById('paymentFrequency').value)) ? 0 : parseFloat(document.getElementById('paymentFrequency').value);
  let inflationRate = isNaN(parseFloat(document.getElementById('inflationRate').value)) ? 0 : parseFloat(document.getElementById('inflationRate').value);
  let taxRate = isNaN(parseFloat(document.getElementById('taxRate').value)) ? 0 : parseFloat(document.getElementById('taxRate').value);
  let startYear = isNaN(parseFloat(document.getElementById('startYear').value)) ? 0 : parseFloat(document.getElementById('startYear').value);
  let endYear = isNaN(parseFloat(document.getElementById('endYear').value)) ? 0 : parseFloat(document.getElementById('endYear').value);
  if (!principal || !interestRate || !years || !contributions) {
    futureValue = 0;
  } else {
    let numPayments = years * paymentFrequency;
    for (let i = startYear; i <= endYear; i++) {
      let annualInterestRate = interestRate;
      let annualContributions = contributions;
      let annualDividend = 0;
      if (i > startYear) {
        futureValue += futureValue * (inflationRate / 100);
        annualInterestRate *= (1 - (taxRate / 100));
        annualContributions *= (1 - (taxRate / 100));
      }
      let periods = numPayments;
      let rate = annualInterestRate / paymentFrequency / 100;
      let periodicPayment = annualContributions / paymentFrequency;
      let futureValueFactor = (1 + rate) ** periods;
      let periodicPaymentFactor = (((1 + rate) ** periods) - 1) / (rate * (1 + rate / paymentFrequency)**(paymentFrequency-1));
      let presentValueFactor = 1 / ((1 + rate) ** (periods - 1));
      futureValue += periodicPayment * periodicPaymentFactor * futureValueFactor;
      totalContributions += annualContributions;
      if (i > startYear) {
        annualDividend = futureValue * (Math.random() * (0.02 - 0.005) + 0.005);
        dividends.push({year: i, dividend: annualDividend});
        futureValue += annualDividend;
      }
    }
  }
  let formattedFutureValue = new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(futureValue);
  let formattedTotalContributions = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalContributions);
  document.getElementById('futureValue').value = `FV: ${formattedFutureValue}`;
  document.getElementById('totalContributions').value = `TC: ${formattedTotalContributions}`;

  // Generate table with dividends
  let table = '<table><thead><tr><th>Year</th><th>Dividend</th></tr></thead><tbody>';
  for (let i = 0; i < dividends.length; i++) {
    table += `<tr><td>${dividends[i].year}</td><td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dividends[i].dividend)}</td></tr>`;
  }
  table += '</tbody></table>';
  document.getElementById('dividends').innerHTML = table;
  // Show the Copy button
  document.getElementById('copyBtn').style.display = 'block';
}
document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        calculate();
      }
    });
function clearInputs() {
      let inputs = document.querySelectorAll('input');
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
      document.getElementById('dividends').innerHTML = '';
      document.getElementById('copyBtn').style.display = 'none';
    }

    function copyTable() {
      let table = document.querySelector('table');
      let range = document.createRange();
      range.selectNode(table);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    }