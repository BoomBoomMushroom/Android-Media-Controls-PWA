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
        audioPlayer.play();
    });

    navigator.mediaSession.setActionHandler('pause', () => {
        audioPlayer.pause();
    });

    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        audioPlayer.currentTime = Math.max(audioPlayer.currentTime - (details.seekOffset || 10), 0);
    });

    navigator.mediaSession.setActionHandler('seekforward', (details) => {
        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + (details.seekOffset || 10), audioPlayer.duration);
    });

    navigator.mediaSession.setActionHandler('stop', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    });
}

async function playAudioSource(){
    await audioPlayer.play()
    navigator.mediaSession.playbackState = "playing";
    audioStatus.innerText = "Status: playing"
}

async function pauseAudioSource(){
    audioPlayer.pause()
    navigator.mediaSession.playbackState = "paused";
    audioStatus.innerText = "Status: paused"
}

async function endAudioSource(){
    audioPlayer.pause()
    navigator.mediaSession.playbackState = "none";
    audioStatus.innerText = "Status: none"
}

endAudioSource()