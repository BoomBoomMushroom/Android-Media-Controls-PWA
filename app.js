const navigator = window.navigator

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
}


const audioPlayer = document.getElementById('audioPlayer');
const audioStatus = document.getElementById('audioStatus');

if ('mediaSession' in navigator){
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Colorblind',
        artist: 'Beach Bunny',
        album: 'Honeymoon',
        artwork: [
            { src: 'https://dummyimage.com/96x96', sizes: '96x96', type: 'image/png' }
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

function audioSourceDefault(){
    audioPlayer.pause()
    navigator.mediaSession.playbackState = "none";
    audioStatus.innerText = "Status: none"
}
audioSourceDefault()

function playMusic(){
    audioPlayer.play();
    navigator.mediaSession.playbackState = "playing";
}

function pauseMusic(){
    audioPlayer.pause();
    navigator.mediaSession.playbackState = "paused";
}