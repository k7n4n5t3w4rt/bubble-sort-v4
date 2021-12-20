// @flow
import { test, testPromise, should } from "../server/testy.js";
import staticCache from "../server/static_cache.js";
import requestPromise from "../server/request_promise.js";
import fs, { read } from "fs";

test("Cache | Clearing the cache", () /*: void */ => {
  should(staticCache.clearCache()).be.exactly(true);
});

testPromise(
  "Cache | Writing to and reading from /index.html",
  () /*: Promise<any> */ => {
    const cachedFilePath /*: string */ = "/";

    return staticCache
      .writeToCache(cachedFilePath, "Testy test")
      .then((result) => {
        should(result).be.exactly(true);
        return result;
        // Clean up the file
      })
      .then((result) => {
        should(staticCache.readFromCache(cachedFilePath, 0, true)).be.exactly(
          "Testy test",
        );
        fs.unlink("./public" + cachedFilePath + "index.html", (
          e /*: Error | null | typeof undefined */,
        ) /*: void */ => {
          if (e) {
            console.error(e);
          }
        });
        return true;
      })
      .catch((e) /*: void */ => {
        console.error(e);
      });
  },
);

testPromise(
  "Cache | Writing to and reading from the deep cache",
  () /*: Promise<any> */ => {
    const cachedFilePath /*: string */ =
      "/this/is/a/test/of/the/cache/script/testytest";

    return staticCache
      .writeToCache(cachedFilePath, "Testy test")
      .then((result) => {
        should(result).be.exactly(true);
        return result;
        // Clean up the file
      })
      .then((result) => {
        should(staticCache.readFromCache(cachedFilePath, 0, true)).be.exactly(
          "Testy test",
        );
        // $FlowFixMe
        fs.rmdirSync("./public/this", { recursive: true });
      })
      .catch((e) /*: void */ => {
        console.error(e);
      });
  },
);
