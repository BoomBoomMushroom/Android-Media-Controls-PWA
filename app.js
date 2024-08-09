
if ('serviceWorker' in navigator) {
    /*
    navigator.serviceWorker.register('./service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);

        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    */
}

window.onload = ()=>{
    audioPlayer.play()
    .then(()=>{
        mediaSession({title: "Colorblind", artist: "Beach Bunny", album: "Honeymoon"})
    })
    .catch((e)=>{
        console.error("Error playing audio! ", e)
    })
    
    setInterval(updatePositionState, 300);
}

//const audioPlayer = document.getElementById('audioPlayer');
//const audioStatus = document.getElementById('audioStatus');

function mediaSession(data){
    if (!('mediaSession' in navigator)) {
        console.error("Media Session API is not supported")
        return
    }

    try{
        navigator.mediaSession.metadata = new MediaMetadata({
            title: data.title,
            artist: data.artist,
            album: data.album,
            artwork: [
                {
                    src: 'https://dummyimage.com/36x36',
                    sizes: '36x36',
                    type: 'image/png',
                },
                // ... (remaining artwork definitions)
            ]
        });
        console.log("successfully made media session metadata")
    }
    catch(e){
        console.error("Error making media session metadata: ", e)
    }

    navigator.mediaSession.setActionHandler('play', () => {
        console.log("play")
        playMusic()
    });

    // ... (remaining action handler definitions)

    updatePlaybackState("playing");
    console.log("Media Session initialized with metadata: ", data)
}



function updatePlaybackState(state){
    navigator.mediaSession.playbackState = state
    audioStatus.innerText = "Status: " + state
}
function updatePositionState(){
    console.log("updatePositionState called!")
    navigator.mediaSession.setPositionState({
        duration: parseInt(audioPlayer.duration) | 100,
        position: parseInt(audioPlayer.currentTime) | 100
    })
}

function audioSourceDefault(){
    updatePlaybackState("none")
    updatePositionState()
}
//audioSourceDefault()


function playMusic(){
    audioPlayer.play();
    updatePlaybackState("playing")
    updatePositionState()
}

function pauseMusic(){
    audioPlayer.pause();
    updatePlaybackState("paused")
}