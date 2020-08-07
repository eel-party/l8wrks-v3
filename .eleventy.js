const fs = require("fs");

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// require moment.js 
const moment = require('moment');
 
moment.locale('en');

module.exports = function(eleventyConfig) {

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // aliases arent working
  // set layout aliases
  // eleventyConfig.addLayoutAlias("book", "secnd-lvl.njk");

  // this isn;t working
  // eleventyConfig.addLayoutAlias("page", "layout.njk");

  // The following copies to `_site/assets` and `_site/content`
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("content");
  // remember to add passthrough for css once we have some
  eleventyConfig.setTemplateFormats([
    "css"
  ]);

  // handle 404 page
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

  // configure date stuff
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });
 
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('MMMM, YYYY'); // E.g. May 31, 2019
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch(item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "item":
            case "items":
            case "book":
            case "books":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

};