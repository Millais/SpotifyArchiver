# Discover Weekly Archiver

This is a simple Node.js program to automatically archive Spotify's Discover Weekly playlist. 

I'm currently running it with a cron job to save all of Spotify's recommendations as they come out each week. It makes use of the [request-promise](https://github.com/request/request-promise) library to make an asynchronous language synchronous (and to reduce nested callbacks).

## Usage

To backup your Discover Weekly playlist, adjust the variables at the top of the `spotify.js` file.

`<USER-ID>` is the name on your Spotify profile e.g *Millais*

Create an app on [Spotify Developer](https://developer.spotify.com) to get a `<CLIENT-ID>` and `<CLIENT-SECRET>`.

Generate a `<REFRESH-TOKEN>` by [authorising with Spotify](https://developer.spotify.com/web-api/authorization-guide/). Make sure to use the *playlist-read-private* and *playlist-modify-private* scopes. The refresh token can pretty much be considered as [valid forever](http://stackoverflow.com/a/30375475).

`<DISCOVER-PLAYLIST-ID>` is your Discover Weekly playlist URI e.g *37i9dQZEVXcM6Vy4lcP1Nn*

`<ARCHIVE-PLAYLIST-ID>` is the URI of your archive playlist.

---
Almost there...

```
npm install
```
then
```
node spotify.js
```
