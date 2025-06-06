const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 8080;
const app = express();

app.get("/", (req, res) => {
  return res.json({ result: "Xin chào" });
});

app.listen(PORT, () => {
  console.log("Server đang lắng nghe");
});
