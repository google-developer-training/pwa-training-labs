module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.css",
    "index.html",
    "js/animation.js",
    "images/home/*.jpg",
    "images/icon/*.svg",
    "pages/offline.html",
    "pages/404.html"
  ],
  "swSrc": "src/sw.js",
  "swDest": "build/sw.js",
  "globIgnores": [
    "../workbox-config.js"
  ]
};
