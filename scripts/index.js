/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    for (let song of player.songs){
     document.getElementById(song.id).style.background="white"
     if(song.id===songId){
        document.getElementById(song.id).style.background="lightblue"
     }
 }
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const titleEL=createElement("p",[title],["titleOfSong"])
    const albumEL=createElement("p",[album])
    const artistEL=createElement("p",["Artist: "+artist])
    const durationEL=createElement("p",[toCorrectDuration(duration)],["durationOfSongs"])
    const coverArtURL=coverArt
    const coverArtEL=createElement("img",[],["coverArtOfSong"],{ src : coverArtURL})
    const textElement=createElement("div",[titleEL, albumEL, artistEL, durationEL],[])
    const children = [coverArtEL, textElement]
    const classes = ["song"]
    const attrs = { onclick: `playSong(${id})`,cursor:"pointer",id: id }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
 function createPlaylistElement({ id, name, songs }) {
    const nameEL=createElement("p",[name],["NameOfPlaylist"])
    const songsEl=createElement("p",["Number of songs in playlist: "+songs.length])
    const durationOfPlaylist=toCorrectDuration(playlistDuration(songs))
    const durationEL=createElement("p",[durationOfPlaylist],["durationOfSongs"])
    const children = [nameEL, songsEl, durationEL]
    const classes = ["playlist"]
    const attrs = {id: id}
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */

function createElement(tagName, children = [], classes = [], attributes = {}) {
    let el = document.createElement(tagName)
    //Adding children
    for(const child of children){
        el.append(child);
    }
    //Adding classes
    for(const cls of classes){
        el.classList.add(cls);
    }
    //Adding attributes
    for(const attr in attributes){
        el.setAttribute(attr, attributes[attr])
    }
    return  el
}


function toCorrectDuration(seconds){ //transform duration for people
    let mm;
    if(Math.floor(seconds/60)<10){
        mm=`0${Math.floor(seconds/60)}`;
    }
    else mm=`${Math.floor(seconds/60)}`;
    let ss;
    if(Math.floor(seconds%60)<10){
         ss=`0${Math.floor(seconds%60)}`;
    }
    else ss=`${Math.floor(seconds%60)}`;
    return mm+":"+ss;
  }

function playlistDuration(arrSongsId) {
    let sumDuration=0;
    for(let i=0;i<arrSongsId.length; i++){
        sumDuration+=player.songs[songIndex(songById(arrSongsId[i]))].duration;
    }
    return sumDuration;
}

function songById(id){
    let songObj=player.songs.find(x=> x.id===id);
    if (songObj===undefined){
      throw "Not a Valid ID"
    }
    return songObj;
}

function songIndex(song){
    let index=player.songs.indexOf(song);
    return index
}

function sortArray(songA, songB){
      return songA.title.localeCompare(songB.title);
}

// player.songs.sort(sortArray);
// const headingSong=createElement("h1")
// headingSong.textContent="Songs:"
// const listOfSongs=document.getElementById("songs");
// listOfSongs.appendChild(headingSong)
// for(let i=0;i<player.songs.length;i++){
//     listOfSongs.appendChild(createSongElement(player.songs[i]))
// }
// const headingPlaylists=createElement("h1")
// headingPlaylists.textContent="Playlists:"
// const listOfPLaylists=document.getElementById("playlists")
// listOfSongs.appendChild(headingPlaylists)
// for(let i=0;i<player.playlists.length;i++){
//     listOfPLaylists.appendChild(createPlaylistElement(player.playlists[i]))
// }
const songsListEl=document.getElementById("songs")
player.songs.sort(sortArray)
for(const song of player.songs){
    const songEl=createSongElement(song)
    songsListEl.append(songEl)
}
const playlistsListEl=document.getElementById("playlists")
for(const playlist of player.playlists){
    const playlistEl=createPlaylistElement(playlist)
    playlistsListEl.append(playlistEl)
}