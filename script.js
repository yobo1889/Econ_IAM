function getValues() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1d8zUH-JMpL3NZ4QUswsM9fNKd8h8Pzt7-QNbv3WtUpc',
    range: 'Economic Module!B66:B200',
  }).then((response) => {
    const result = response.result;
    const numRows = result.values ? result.values.length : 0;
    console.log(`${numRows} rows retrieved.`);

    // Check if there are values and update the content of the HTML element
    if (result.values && result.values.length > 0) {
      let dataContent = result.values.map(row => row.join(', ')).join('<br>');
      document.getElementById('iam_data').innerHTML = dataContent;
    } else {
      document.getElementById('iam_data').textContent = "No data found.";
    }
  }).catch((err) => {
    console.error("Error fetching data: ", err);
    document.getElementById('iam_data').textContent = `Error: ${err.message}`;
  });
}

getValues();
