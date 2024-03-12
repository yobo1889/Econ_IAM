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
    "spreadsheetId": "1d8zUH-JMpL3NZ4QUswsM9fNKd8h8Pzt7-QNbv3WtUpc",
    "range": "Economic Module!B66:B200",
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
  gapi.auth2.init({client_id: "226866111695-b1jbpbp06sqhp7uouge84g84l8fmr817.apps.googleusercontent.com"});
});
