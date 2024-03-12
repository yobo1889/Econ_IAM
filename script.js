function getValues() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1d8zUH-JMpL3NZ4QUswsM9fNKd8h8Pzt7-QNbv3WtUpc',
    range: 'Economic Module!B66:B200',
  }).then((response) => {
    const result = response.result;
    const numRows = result.values ? result.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
    // Do something with response, e.g., call a callback or update the UI
  }).catch((err) => {
    console.error("Error fetching data: ", err);
    document.getElementById('content').innerText = `Error: ${err.message}`;
  });
}

getValues()
