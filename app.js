if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
}

/*
if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission(status => {
        console.log('Notification permission status:', status);
    });
}
navigator.serviceWorker.ready.then(function(registration) {
    registration.showNotification('Playing music', {
        body: 'Now playing: Colorblind by Beach Bunny',
        icon: 'https://dummyimage.com/192x192',
        actions: [
            {action: 'pause', title: 'Pause'},
            {action: 'stop', title: 'Stop'}
        ]
    });
});
*/

const audioPlayer = document.getElementById('audioPlayer');
const audioStatus = document.getElementById('audioStatus');

function mediaSession(data){
    if (!('mediaSession' in navigator)) { return }
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
            {
                src: 'https://dummyimage.com/48x48',
                sizes: '48x48',
                type: 'image/png',
            },
            {
                src: 'https://dummyimage.com/72x72',
                sizes: '72x72',
                type: 'image/png',
            },
            {
                src: 'https://dummyimage.com/96x96',
                sizes: '96x96',
                type: 'image/png',
            },
            {
                src: 'https://dummyimage.com/144x144',
                sizes: '144x144',
                type: 'image/png',
            },
            {
                src: 'https://dummyimage.com/192x192',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'https://dummyimage.com/256x256',
                sizes: '256x256',
                type: 'image/png',
            },
            {
                src: 'https://dummyimage.com/384x384',
                sizes: '384x384',
                type: 'image/png',
            },
            {
                src: 'https://dummyimage.com/512x512',
                sizes: '512x512',
                type: 'image/png',
            }
        ]
    });

    navigator.mediaSession.setActionHandler('play', () => {
        console.log("play")
        playMusic()
    });

    navigator.mediaSession.setActionHandler('pause', () => {
        console.log("pause")
        pauseMusic()
    });

    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        console.log("seekbackward")
        console.log(details)
        //audioPlayer.currentTime = Math.max(audioPlayer.currentTime - (details.seekOffset || 10), 0);
    });

    navigator.mediaSession.setActionHandler('seekforward', (details) => {
        console.log("seekforward")
        console.log(details)
        //audioPlayer.currentTime = Math.min(audioPlayer.currentTime + (details.seekOffset || 10), audioPlayer.duration);
    });

    navigator.mediaSession.setActionHandler('seekto', (details) => {
        console.log("seekto")
        console.log(details)
        
        if (details.fastSeek && 'fastSeek' in audioPlayer) {
            audioPlayer.fastSeek(details.seekTime);
            return;
        }
        audioPlayer.currentTime = details.seekTime;
    });

    navigator.mediaSession.setActionHandler('nexttrack', (details) => {
        console.log("nexttrack")
        console.log(details)
        audioStatus.innerText = "Next track!"
    });    

    navigator.mediaSession.setActionHandler('previoustrack', (details) => {
        console.log("previoustrack")
        console.log(details)
        audioStatus.innerText = "Previous track!"
    });

    navigator.mediaSession.setActionHandler('stop', () => {
        console.log("stop")
        console.log(details)
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    });
}


function updatePlaybackState(state){
    navigator.mediaSession.playbackState = state
    audioStatus.innerText = "Status: " + state
}
function updatePositionState(){
    navigator.mediaSession.setPositionState({
        duration: audioPlayer.duration | 0,
        position: audioPlayer.currentTime | 0
    })
}
function audioSourceDefault(){
    audioPlayer.pause()
    updatePlaybackState("none")
    updatePositionState()
}
audioSourceDefault()
mediaSession({title: "Colorblind", artist: "Beach Bunny", album: "Honeymoon"})


function playMusic(){
    audioPlayer.play();
    updatePlaybackState("playing")
}

function pauseMusic(){
    audioPlayer.pause();
    updatePlaybackState("paused")
}
