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
    const song=arguments[0]
    const children = songChildrenlist(song)
    const classes = ["song"]
    const attrs = { onclick: `playSong(${id})`,cursor:"pointer",id: id }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
 function createPlaylistElement({ id, name, songs }) {
    const playlist=arguments[0]
    const children = playlistChildrenlist(playlist)
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
    let element = document.createElement(tagName)
    classes.forEach(сlass =>element.classList.add("class") )
    const attribute=Object.keys(attributes)
    for(let i=0;i<attribute.length;i++){
        element.setAttribute(attribute[i], attributes[attribute[i]])  
    }
    for(let i=0;i<children.length;i++){
        element.appendChild(children[i])
    }
    return  element
}


function songChildrenlist(song){
    const list=[]
    for(let key in song){
        if(key==="coverArt"){
            const img=document.createElement("img")
            img.src=song[key]
            list.push(img)
        }
        else if(key!=="id"){
            const li=document.createElement("p");
            if(typeof song[key] ==="number"){
                li.innerText=toCorrectDuration(song[key]);
                list.push(li)
            }
            else{
                li.innerText=song[key];
                list.push(li)
            }
        }
    }
    return list
}

function playlistChildrenlist(playlist){
    const list=[]
    for(let key in playlist){
        if(key==="songs") {
            const li=document.createElement("p")
            li.innerText=`Number of songs: ${playlist.songs.length}`
            list.push(li)
        }
        else if(key!=="id"){
            const li=document.createElement("p")
            li.innerText=playlist[key];
            list.push(li)
        }
    }
    const li=document.createElement("p")
    let sumDuration = toCorrectDuration(playlistDuration(playlist))
    li.innerText=sumDuration;
    list.push(li)
    return list 
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

function playlistDuration(playlist) {
    let sumDuration=0;
    for(let i=0;i<playlist.songs.length;i++){
      sumDuration+=player.songs[songIndex(songById(playlist.songs[i]))].duration;
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

player.songs.sort(sortArray);
const listOfSongs=document.getElementById("songs");
for(let i=0;i<player.songs.length;i++){
    listOfSongs.appendChild(createSongElement(player.songs[i]))
}
const listOfPLaylists=document.getElementById("playlists")
for(let i=0;i<player.playlists.length;i++){
    listOfPLaylists.appendChild(createPlaylistElement(player.playlists[i]))
}
