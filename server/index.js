// @flow
import conf from "./config.js";
import http from "http";
import fs from "fs";
import finalHandler from "finalhandler";
import serveStatic from "serve-static";

const serveAsStatic = serveStatic(".", { index: false });

const requestHandler = (req, res) => {
  req.url = req.url.replace(/\/$/, "");
  const [urlPath /*: string */] = req.url.split("?");

  // Serve static assets (paths containing a dot)
  if (urlPath.match(/.+\..+$/) !== null) {
    serveAsStatic(req, res, finalHandler(req, res));
    return;
  }

  // SPA fallback: always serve index.html for app routes
  try {
    const index = fs.readFileSync("./index.html", "utf8");
    res.end(index);
  } catch (e) {
    res.statusCode = 500;
    res.end("Error loading index.html");
  }
};

const server = http.createServer(requestHandler);

server.listen(conf.PORT, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${conf.PORT}`);
});
