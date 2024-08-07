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

if ('mediaSession' in navigator){
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Colorblind',
        artist: 'Beach Bunny',
        album: 'Honeymoon',
        artwork: [
            { src: 'colorblind-album-color.png', sizes: '1280x720', type: 'image/png' }
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