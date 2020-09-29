const errorMsgElement = document.getElementById('ErrorMsg');
const base64 = document.getElementById('base64')
const configPadrao = {
    audio: false,
    video: {
        facingMode: "user",
        width: { max: 1920 },
        height: { max: 1080 }
    }
}

if (navigator.mediaDevices === undefined) {// Para navegadores mais antigos

} else {
    navigator.mediaDevices.enumerateDevices() // Para novos navegadores
        .then(devices => { })
        .catch(err => {
            console.log(err.name, err.message);
        })
}

navigator.mediaDevices.getUserMedia(configPadrao)
    .then(function (mediaStreamObj) {
        let video = document.querySelector('#video')
        if ("srcObject" in video) {
            video.srcObject = mediaStreamObj
        } else {
            video.src = window.URL.createObjectURL(mediaStreamObj)
        }

        video.onloadedmetadata = function (event) {
            // Mostra o que esta gravando 
            video.play();
        }

        let snap = document.getElementById('record');
        let videoDisplay = document.getElementById('videoDisplay');
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];


        snap.addEventListener('click', (ev) => {
            setTimeout(() => {
                mediaRecorder.stop();
            }, 8200)
            mediaRecorder.start();

        })

        mediaRecorder.ondataavailable = function (ev) {
            chunks.push(ev.data)
        }

        mediaRecorder.onstop = (ev) => {
            let blob = new Blob(chunks, { 'type': 'video/mp4' })
            chunks = []
            console.log(blob)
            let videoURL = window.URL.createObjectURL(blob)
            console.log("video ",videoURL)
            convertToFormData(videoURL)
            videoDisplay.src = videoURL
        }

    }).catch(function (err) {
        console.log(err.name, err.message);
    })


function convertToFormData(video){
    let formData = new FormData();
    formData.append('file', video);
    console.log(formData)
}

function sendVideo(video){
    axios.post('https://localhost:3000/sendVideo',{
        name:"Marllon"
    })
}
