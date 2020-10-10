let picture = document.getElementById('picture');
var logar = document.getElementById('login');
const configPadrao = {
    video: {
        width: 1920,
        height: 1920
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
        let canvasImage = document.getElementById('pictureDisplay').toDataURL
            ("image/png")
        
        logar.style.transition = "opacity 5s"
        logar.style.opacity = "1.0"
        if(logar.getAttribute('listener') !== 'true'){
            logar.addEventListener('click', EntrarSistema)
            
        }

        function EntrarSistema() {
            logar.setAttribute('listener','true')
            const foto = convertBase64(canvasImage)
            sendPhoto(foto)
        }
    }, 3500)


    function convertBase64(base64){

        let formData = new FormData()
        for(let i of formData){
            console.log(i[0],i[1])
        }
        let imagem = atob(base64.split(',')[1])
        const convertImagem = new Array(imagem.length)
        for(let i = 0; i<convertImagem.length; i++){
            convertImagem[i] = imagem.charCodeAt(i)
        }
        imagem = new Uint8Array(convertImagem)
        imagem = new Blob([imagem],{type:'image/png'})
        imagem = new File([imagem], "imagemUsuario.png", { type: "image/png" })
        formData.append('imagemUsuario', imagem)
        for(let i of formData){
            console.log(i[0],i[1])
        }

        return formData
        
    }
    async function sendPhoto(foto) {
        const response = await axios({
            method: 'post',
            url: 'https://localhost:5000/login',
            data: foto
        }).then(res => {
            console.log(res.data);
        }).catch(err => console.log(err))

    }
}

