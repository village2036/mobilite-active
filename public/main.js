var img, video, screenshot;
var enable = false;
const canvas = document.createElement('canvas');

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

        data = document.getElementById('data');



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

    img.src = canvas.toDataURL('image/png',0.01);
    img.style.display = 'block'
    screenshot.disabled=true


  // envoi de 'image au serveur'
    var data={
       name: "image from client",
       img: img.src

    }

    var xmlHttp=new XMLHttpRequest();
    xmlHttp.open("POST", "submit_response");
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(data));
    console.log("sent")


}

document.addEventListener('DOMContentLoaded', init)
