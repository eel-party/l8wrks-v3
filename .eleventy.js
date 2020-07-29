const fs = require("fs");

module.exports = function(eleventyConfig) {
  // Input directory: src
  // Output directory: _site

  // The following copies to `_site/assets`
  eleventyConfig.addPassthroughCopy("assets");
  // remember to add passthrough for css once we have some
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          // res.writeHead(404, { "Content-Type": "text/html" });
          res.writeHead(404);
          res.end();
        });
      }
    }
  });
};