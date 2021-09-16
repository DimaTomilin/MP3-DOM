/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId){
    let selected = document.querySelectorAll('.selected');
    for(let elem of selected) {
        elem.classList.remove('selected');
    }
    document.getElementById(songId).classList.add('selected');
}


/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    let index=songIndex(songById(songId))
    for(let list of player.playlists){
        if(list.songs.includes(songId)){
            list.songs.splice((list.songs.indexOf(songId)),1)
        }
    }
    player.songs.splice(index,1)
    document.getElementById(songId).remove()
    let listOfPlaylists = document.querySelectorAll(".playlist");
    for(const playlist of listOfPlaylists){
        playlist.remove()
    }
    generatePlaylists();
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    addSongToPlayer(title, album, artist, duration, coverArt)
    let listOfSongs = document.querySelectorAll(".song");
    for(const song of listOfSongs){
        song.remove()
    }
    generateSongs();
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    const target=event.target
    const songId=parseInt(target.closest(".song").id)
    switch(target.className){
        case 'play-button':
            playSong(songId)
            break;
        case 'remove-button':
            removeSong(songId);
            break;
    }
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    const newSong={}
    const inputesElements=document.querySelectorAll("input")
    for(const input of inputesElements){
        let name=input.name
        if(name.includes("-")){
            name="coverArt"
        }
        let value=input.value
        newSong[name]=value;
        input.value="";
    }
    addSong(newSong);
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const titleEL=createElement("span",[title],["title"])
    const albumEL=createElement("span",[album],["album"])
    const artistEL=createElement("span",[artist],["artist"])
    const songDetailsEL=createElement("div",[titleEL, albumEL, artistEL],["song-details"])
    const coverArtURL=coverArt
    const coverArtEL=createElement("img",[],["cover-art"],{ src : coverArtURL})
    const leftpartEL=createElement("div",[coverArtEL, songDetailsEL],["left"],)
    const durationEL=createElement("div",[toCorrectDuration(duration)],["song-duration"])
    durationEL.style.color=reflectColor(duration);
    const buttonPlay=createElement("button",["Play"],["play-button"])
    const buttonRemove=createElement("button",["Remove"],["remove-button"])
    const songActionsEL=createElement("div",[buttonPlay, buttonRemove],["song-actions"])
    const rightpartEL=createElement("div",[durationEL, songActionsEL],["right"],)
    const children = [leftpartEL, rightpartEL]
    const classes = ["song"]
    const attrs = {cursor:"pointer",id: id }
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const nameEL=createElement("span",[name],["name"])
    const leftpartEL=createElement("div",[nameEL],["left"],)
    const songsEl=createElement("span",[songs.length+" songs"],["playlist-length"])
    const durationOfPlaylist=toCorrectDuration(playlistDuration(songs))
    const durationEL=createElement("span",[durationOfPlaylist],["playlist-duration"])
    const rightpartEL=createElement("div",[songsEl, durationEL],["right"],)
    const children = [leftpartEL, rightpartEL]
    const classes = ["playlist"]
    const attrs = {}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
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
    //Adding events
    for(const event in eventListeners){
        el.addEventListener(event, eventListeners[event])
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

function addSongToPlayer(title, album, artist, duration, coverArt) {
    let obj={
      id: newId(player.songs),
      title: title,
      album: album,
      artist: artist,
      duration: durationToSeconds(duration),
      coverArt: coverArt
    }
    player.songs.push(obj)
}

function durationToSeconds(str){
    let duration=(parseInt(str.slice(0,2))*60)+parseInt(str.slice((str.length-2),(str.length)));
    return duration;
}

function playlistDuration(arrSongsId) {
    let sumDuration=0;
    for(let i=0;i<arrSongsId.length; i++){
        sumDuration+=player.songs[songIndex(songById(arrSongsId[i]))].duration;
    }
    return sumDuration;
}

function newId(obj){ //I take the next max id of the object
    let maxId=0;
    for (let i of obj){
      if(i.id>maxId) maxId=i.id;
    }
    return maxId+1;
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

function sortSongs(songA, songB){
      return songA.title.localeCompare(songB.title);
}

function sortPlaylists(playlistA, playlistB){
    return playlistA.name.localeCompare(playlistB.name);
}

function reflectColor(duration){
    if(duration<=120){
        return "lime"
    }
    else if(duration>=420){
        return "red"
    }
    else{
        let r=0;
        let g=255;
        let b=0;
        let durationDifference=duration-120;
        r+=Math.floor(durationDifference*0.85)
        g-=Math.floor(durationDifference*0.85)
        let rgbColor = `rgb(${r},${g},${b})`
        return rgbColor
    }
}




/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    const songsListEl=document.getElementById("songs").querySelector("div")
    player.songs.sort(sortSongs)
    for(const song of player.songs){
        const songEl=createSongElement(song)
        songsListEl.append(songEl);
    }
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    const playlistsListEl=document.getElementById("playlists").querySelector("div")
    player.playlists.sort(sortPlaylists)
    for(const playlist of player.playlists){
        const playlistEl=createPlaylistElement(playlist)
        playlistsListEl.append(playlistEl)
}
}

// Creating the page structure
generateSongs()
generatePlaylists()
//Adding Event Delegation to parent element
songs.addEventListener("click", handleSongClickEvent)

 

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
