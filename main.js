"use strict";

const menubar = require("menubar");
const osascript = require("osascript").file;
const request = require("request");
const cheerio = require("cheerio");

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
    let url = "http://www.azlyrics.com/lyrics/" + cleanUp(artist) + "/" + cleanUp(song) + ".html";
    request(url, (error, response, html) => {
        let $ = cheerio.load(html);
        let lyricsHtml = $(".col-xs-12.col-lg-8.text-center div:not([class])").html();
        let lyrics = lyricsHtml || "Couldn't find any lyrics for this one...";
        return callback(error, lyrics);
    });
}

let mb = menubar();

mb.on("ready", function ready () {
  console.log("app is ready");
});

mb.on("show", () => {
    getSongInfo((songInfo) => {
      getLyrics(songInfo.title, songInfo.artist, (error, lyrics) => {
        if (error) {
          throw error;
        }
        let songDetails = {
            artist: songInfo.artist,
            title: songInfo.title,
            lyrics: lyrics
        };
        mb.window.webContents.send("lyrics", songDetails);
      });
  });
});
