function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/spreadsheets.readonly"})
      .then(() => console.log("Sign-in successful"))
      .catch(error => console.error("Error signing in", error));
}

function loadClient() {
  return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
      .then(() => console.log("GAPI client loaded for API"))
      .catch(error => console.error("Error loading GAPI client for API", error));
}

function execute() {
  return gapi.client.sheets.spreadsheets.values.get({
    "spreadsheetId": "your-spreadsheet-id",
    "range": "Sheet1!A1:D5",
  })
  .then(response => {
    const range = response.result;
    if (range.values.length > 0) {
      const output = range.values.map(row => `<div>${row.join(' | ')}</div>`).join('');
      document.getElementById("content").innerHTML = output;
    } else {
      console.log("No data found.");
    }
  })
  .catch(error => console.error("Error: " + error));
}

gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
});
