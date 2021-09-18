# MP3 DOM

This is my MP3 player that I did for this work I used Javascript, HTML and CSS. this is my weekend task of the course of FullStak developer. In this work I have some songs in my player but also it has function to add songs what you want. So in my project is three sections: Adding songs, Songs and Playlist. I trying to write comments in my test that will help to understand my logic and what I do in the code.


## Requirements!

This is requirements that I had.

- There is now a section for adding new songs to the player. Make it work!
- Add a play button to every song. Clicking it will play that song.
- Add a remove button to every song. Clicking it will remove the song from the playlist.
- There should be only one event listener on the entire songs list, that handles all play and remove events of songs.
-   The color of the durations of songs should reflect their length. A duration of less than 2 min will show green, and will be gradually redder until it is completely red for durations that are above 7 min.
-   When a song is removed, all playlists in the page will also be updated.
-   When adding a new song, the songs list will remain sorted by title.
-   A list of the `songs` in the player, sorted by their titles
-   A list of the `playlists` in the player, sorted by their names


### Songs

Each song list item display the following details:

-   song `title`
-   `album` name
-   `artist` name
-   an image with the album's cover art (`coverArt`)
-   song `duration` (in `mm:ss` format, of course)

One song can be played at a time. There is indication of the currently playing song.


### Playlists

Every playlist list item display the following information:

-   playlist `name`
-   the number of songs in the playlist
-   the total duration of the playlist


