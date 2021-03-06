
const path = require('path');
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const publicPath = path.join(__dirname, '..', '/weather-api/public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, function() {
  console.log(`Server is up and running on port ${port}!`);
});
