
let picture = document.getElementById('picture') || document.getElementById('record');
const configPadrao = {
    video: {
        width: 300,
        height: 300
    }
}

const errorMsgElement = document.querySelector('#ErrorMsg')

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
        picture.addEventListener('click', takePicture)



    }).catch(function (err) {
        errorMsgElement.innerHTML = `Ocorreu o seguinte erro: ${err.name, err.message}`
    })

function takePicture() {
    const { video: { width, height } } = configPadrao
    const base64 = document.getElementById('base64')
    let pictureDisplay = document.getElementById('pictureDisplay');
    const context = pictureDisplay.getContext('2d')

    context.font = "50px Roboto";
    let time = 1
    let contador = setInterval(() => {
        pictureDisplay.style.transition = "none";
        pictureDisplay.style.transform = "";
        pictureDisplay.style.border = "10px double black";
        pictureDisplay.style.borderRadius = "30px"
        if (time > 3) {
            clearInterval(contador)
            return
        }
        pictureDisplay.getContext('2d').clearRect(0, 0, pictureDisplay.width, pictureDisplay.height)

        context.fillText(time, 130, 90);
        time++

    }, 1000)

    setTimeout(async () => {
        pictureDisplay.getContext('2d').clearRect(0, 0, pictureDisplay.width, pictureDisplay.height)
        context.drawImage(video, 0, 0, 300, 150)
        setTimeout(() => {
            pictureDisplay.style.transition = "all 0.4s"
            pictureDisplay.style.transform = "scaleX(-1)";
        }, 500)
        const canvasImage = document.getElementById('pictureDisplay').toDataURL("image/png").replace("image/jpg", "image/octet-stream");

        sendPhoto(canvasImage)
    }, 3500)


    function _imageEncode(arrayBuffer) {
        let u8 = new Uint8Array(arrayBuffer)
        let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''))
        let mimetype = "image/jpeg"
        return "data:" + mimetype + ";base64," + b64encoded
    }


    async function sendPhoto(base64) {
        body = {
            name: "marllon",
            file: base64
        }
        const response = await axios({
            method: 'post',
            url: 'https://localhost:3000/sendPhoto',
            data: body
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

    }
    // getTouch();



}

