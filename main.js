var img, video, screenshot, download;
var enable = false;
const canvas = document.createElement('canvas');
var format = '.png'

const init = () => {
    hasGetUserMedia()
    if (enable){
        document.getElementsByClassName('capture')[0].addEventListener('click', onCapture)

        screenshot = document.getElementById('screenshot');
        screenshot.addEventListener('click', onScreenshot)
        screenshot.disabled=true

        img = document.getElementsByTagName('img')[0];
        img.style.display = 'none'

        video = document.getElementsByTagName('video')[0];

        download = document.getElementsByClassName('download')[0]
        download.addEventListener('click', onDownload)
        download.disabled = true



    }
}

const hasGetUserMedia = () => {
    if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia){
        alert('Unable to enable camera.')
    } else {
        enable = true
    }
}

const onCapture = () => {
    navigator.mediaDevices
                .getUserMedia({video: true})
                .then(stream => {
                    video.srcObject = stream
                    video.style.display = "block"
                    screenshot.disabled = false;
                    img.style.display = 'none'
                })
                .catch(err=>alert('Error occurred: ' + err));
}

const onScreenshot = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    video.srcObject.getVideoTracks().forEach(track => track.stop())
    video.style.display = 'none'

    img.src = canvas.toDataURL('image/png');
    img.style.display = 'block'
    download.disabled = false
    screenshot.disabled=true

}


const onDownload = () => {
    download = document.createElement('a');
    download.href = img.src
    download.download = 'yourScreenshot' + format;
    download.style.display = 'none';undefined
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
};


document.addEventListener('DOMContentLoaded', init)
