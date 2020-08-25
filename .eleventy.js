const fs = require("fs");

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const htmlmin = require("html-minifier");

// require moment.js 
const moment = require('moment');
moment.locale('en');

// lazy load images - this isn;t working
// const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

// const pluginLocalRespimg = require('eleventy-plugin-local-respimg');

// all eleventy config here
module.exports = function(eleventyConfig) {

  //nav config
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // The following copies to `_site/assets` and `_site/content`
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("content");

  // remember to add passthrough for css once we have some
  module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "css",
    "11ty.js"
  ]);

  // eleventyConfig.addPlugin(lazyImagesPlugin);

};


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

  // congigure tailwind.css
  eleventyConfig.setUseGitIgnore(false);
 
  eleventyConfig.addWatchTarget("./_tmp/style.css");
 
  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
 
  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });
 
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
 
    return content;
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
            case "group":
            case "tagList":
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

  // let's try respimg again
  // eleventyConfig.addPlugin(pluginLocalRespimg, {
  //   folders: {
  //     source: 'src', // Folder images are stored in
  //     output: '_site', // Folder images should be output to
  //   },
  //   images: {
  //     resize: {
  //       min: 250, // Minimum width to resize an image to
  //       max: 1500, // Maximum width to resize an image to
  //       step: 150, // Width difference between each resized image
  //     },
  //     gifToVideo: false, // Convert GIFs to MP4 videos
  //     sizes: '100vw', // Default image `sizes` attribute
  //     lazy: true, // Include `loading="lazy"` attribute for images
  //     additional: [
  //       // Globs of additional images to optimize (won't be resized)
  //       'images/icons/**/*',
  //     ],
  //     watch: {
  //       src: 'images/**/*', // Glob of images that Eleventy should watch for changes to
  //     },
  //     pngquant: {
  //       /* ... */
  //     }, // imagemin-pngquant options
  //     mozjpeg: {
  //       /* ... */
  //     }, // imagemin-mozjpeg options
  //     svgo: {
  //       /* ... */
  //     }, // imagemin-svgo options
  //     gifresize: {
  //       /* ... */
  //     }, // @gumlet/gif-resize options
  //     webp: {
  //       /* ... */
  //     }, // imagemin-webp options
  //     gifwebp: {
  //       /* ... */
  //     }, // imagemin-gif2webp options
  //   },
  // });

};