function initClient() {
  // Client initialization logic here
  gapi.client.init({
    'apiKey': 'AIzaSyCV5ia_3Wy_Ab4IpoB3rb4kSkfdW3_msxQ', // Replace with your API key
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    'clientId': '226866111695-b1jbpbp06sqhp7uouge84g84l8fmr817.apps.googleusercontent.com', // Uncomment if using OAuth
    // 'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly', // Uncomment if using OAuth
  }).then(function () {
    getValues("1d8zUH-JMpL3NZ4QUswsM9fNKd8h8Pzt7-QNbv3WtUpc", "Economic Module!B66:B200");
  }).catch(function (error) {
    console.error("Error during API client initialization:", error);
  });
}

function getValues(spreadsheetId, range) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
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

// Initialize the client and then fetch the data
gapi.load('client', initClient);
