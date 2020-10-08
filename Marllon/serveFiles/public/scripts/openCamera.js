
let picture = document.getElementById('picture');
var logar = document.getElementById('login');
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
        const canvasImage = document.getElementById('pictureDisplay').toDataURL("image/jpg")
        logar.style.transition = "opacity 5s"       
        logar.style.opacity = "1.0"
        logar.addEventListener('click',EntrarSistema)
        function EntrarSistema() {
            sendPhoto(canvasImage)
        } 
    }, 3500)

    async function sendPhoto(base64) {
        let imagem = base64.split(',')[1]
        imagem = new Blob([window.atob(imagem)],{type:'image/jpg'})
        imagem = new File([imagem], "imagemUsuario.jpg", { type: "image/jpeg" })
        let formData = new FormData()
        formData.append('imagemUsuario',imagem)
        const response = await axios({
            method: 'post',
            url: 'https://localhost:5000/login',
            data: formData
        }).then(res => {
            console.log(res.data);
        }).catch(err => console.log(err))

    }
}

