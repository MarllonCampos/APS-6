let picture = document.getElementById('record');
const configPadrao = {
    video: {
        width: 300,
        height: 300
    }
}
if (navigator.mediaDevices === undefined) {// Para navegadores mais antigos
} else {
    navigator.mediaDevices.enumerateDevices() // Para novos navegadores
        .then(devices => { })
        .catch(err => {
            errorMsgElement.innerHTML = `Ocorreu o seguinte erro: ${err.name, err.message}`;
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

        let picture = document.getElementById('record');
        let videoDisplay = document.getElementById('videoDisplay');
        console.log(videoDisplay);
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];


        picture.addEventListener('click', (ev) => {
            setTimeout(() => {
                mediaRecorder.stop();
            }, 3000)
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
            console.log("video ", videoURL)
            videoDisplay.src = videoURL
        }

    }).catch(function (err) {
        console.log(err.name, err.message);
    })




