document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        calculate();
      }
    });
    function calculate() {
      const loanAmount = Number(document.getElementById('loanAmount').value);
      const interestRate = Number(document.getElementById('interestRate').value) / 100;
      const years = Number(document.getElementById('years').value);
      const paymentFrequency = Number(document.getElementById('paymentFrequency').value);
      const downPayment = Number(document.getElementById('downPayment').value);
      const taxRate = Number(document.getElementById('taxRate').value) / 100;
      const startYear = Number(document.getElementById('startYear').value);
      let totalInterest = 0;
      let totalPayments = 0;
      let paymentAmounts = [];
      let principal = loanAmount - downPayment;
      const r = interestRate / 12;
      const n = years * 12;
      const annualPayment = principal * (r * (1 + r) ** n) / ((1 + r) ** n - 1);
      let paymentTable = '<table><tr><th>Payment Number</th><th>Payment Amount</th></tr>';
      let limit;
      switch (paymentFrequency) {
        case 1:
          limit = years * 12;
          break;
        case 2:
          limit = years * 4;
          break;
        case 4:
          limit = years * 2;
          break;
        case 12:
          limit = years;
          break;
        default:
          limit = 0;
          break;
      }
      for (let i = 1; i <= paymentFrequency * years * 12; i++) {
        let frequency = i % 12 === 0 ? 12 : i % 12;
        let interest = principal * (interestRate / 12);
        let annualTax = annualPayment * (taxRate / 12);
        let payment = interest + (principal / (paymentFrequency * years * 12)) + (annualTax / 12);
        let balance = principal - (payment - interest);
        totalInterest += interest;
        totalPayments += payment;
        principal = balance;
        paymentAmounts.push(payment);
        if (i % paymentFrequency === 0 && i <= limit * paymentFrequency) {
          let formattedPayment = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2}).format(payment * paymentFrequency);
          paymentTable += `<tr><td>${Math.ceil(i / paymentFrequency)}</td><td>${formattedPayment}</td></tr>`;
        }
      }
      let formattedTotalInterest = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2}).format(totalInterest);
      let formattedTotalPayments = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2}).format(totalPayments);
      paymentTable += '</table>';
      document.getElementById('totalInterest').value = `TI: ${formattedTotalInterest}`;
      document.getElementById('totalPayments').value = `TP: ${formattedTotalPayments}`;
      document.getElementById('paymentTable').innerHTML = paymentTable;
      // Show the Copy button
      document.getElementById('copyBtn').style.display = 'block';
    }
    function clearInputs() {
      document.getElementById('loanAmount').value = '';
      document.getElementById('interestRate').value = '';
      document.getElementById('years').value = '';
      document.getElementById('paymentFrequency').value = '1';
      document.getElementById('downPayment').value = '';
      document.getElementById('taxRate').value = '';
      document.getElementById('startYear').value = '';
      document.getElementById('totalInterest').value = '';
      document.getElementById('totalPayments').value = '';
      document.getElementById('paymentTable').innerHTML = '';
// Hide the Copy button
  document.getElementById('copyBtn').style.display = 'none';
    }
    function copyTable() {
      const copyText = document.getElementById('paymentTable');
      const range = document.createRange();
      range.selectNode(copyText);
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    }