var menubar = require("menubar");
var osascript = require("osascript").file;
var request = require("request");
var cheerio = require("cheerio");

function getSongInfo(callback) {
    osascript("songInfo.applescript", (err, songInfo) => {
        if (err) throw err;
        return callback(JSON.parse(songInfo));
    });
}

function cleanUp(string) {
    return string = string.toLowerCase().replace(/\s+/g, '');
}

function getLyrics(song, artist, callback) {
    var url = "http://www.azlyrics.com/lyrics/" + cleanUp(artist) + "/" + cleanUp(song) + ".html";
    request(url, function(error, response, html) {
        var $ = cheerio.load(html);
        var lyrics = $(".col-xs-12.col-lg-8.text-center div:not([class])");
        return callback(error, lyrics.html());
    });
}

var mb = menubar();

mb.on("ready", function ready () {
  console.log("app is ready");
});

mb.on("show", () => {
    getSongInfo((songInfo) => {
      getLyrics(songInfo.song, songInfo.artist, function(error, lyrics) {
        if (error) {
          throw error;
        }
        mb.window.webContents.send("lyrics", lyrics);
      });
  });
});
