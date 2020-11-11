let picture = document.getElementById('picture');
var logar = document.getElementById('login');
const configPadrao = {
    video: {
        width: 1920,
        height: 1920
    }
}

const errorMsgElement = document.querySelector('#ErrorMsg')

logar.addEventListener('click', EntrarSistema)

var cliqueFoto
var canvasImage

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
    cliqueFoto = true;
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
        canvasImage = document.getElementById('pictureDisplay').toDataURL
            ("image/png")

        logar.style.transition = "opacity 5s"
        logar.style.opacity = "1.0"



    }, 3500)




}

function EntrarSistema() {
    if (cliqueFoto) {
        logar.disabled = true
        logar.style.opacity = '0.5'
        const foto = convertBase64(canvasImage)
        sendPhoto(foto)
    }
}


function convertBase64(base64) {

    let formData = new FormData()
    let imagem = atob(base64.split(',')[1])
    const convertImagem = new Array(imagem.length)
    for (let i = 0; i < convertImagem.length; i++) {
        convertImagem[i] = imagem.charCodeAt(i)
    }
    imagem = new Uint8Array(convertImagem)
    imagem = new Blob([imagem], { type: 'image/png' })
    imagem = new File([imagem], "imagemUsuario.png", { type: "image/png" })
    formData.append('imagemUsuario', imagem)

    return formData

}


async function sendPhoto(foto) {
    const loadingEl = document.querySelector('#tela-carregamento')
    const loadingTextEl = document.querySelector('#loading-message')
    const erroTextEl = document.querySelector('#erro-message')
    loadingEl.style.display = 'flex'
    loadingTextEl.style.display = 'initial';
    erroTextEl.style.display = 'none';
    erroTextEl.innerText = '';
    const response = await axios({
        method: 'post',
        url: 'https://201.74.114.180:3333/login',
        data: foto
    }).then(response => {
        logar.style.opacity = '1'
        logar.disabled = false
        if (response.data.erro) {
            loadingTextEl.style.display = 'none';
            erroTextEl.style.display = 'initial';
            erroTextEl.innerText = response.data.erro
            setTimeout(() => {
                loadingEl.style.display = 'none'
            }, 5000)
        } else {
            const agrotoxicos = response.data;
            const nomeUsuario = agrotoxicos.nome.replace('-',' ')
            let lib = []

            loadingTextEl.innerText = `Ola ${nomeUsuario} você foi reconhecido e será logado`
            agrotoxicos.conteudo.map((e) => {
                lib.push({ 'nome': e[1], 'classe': e[2], 'tipoAplicacao': e[3], 'periculosidade': e[4] })
            })
            localStorage.setItem("conteudoAps", JSON.stringify(lib))
            localStorage.setItem("nomeConteudoAps", agrotoxicos.nome)
            setTimeout(() => {
                loadingEl.style.display = 'none'
                window.location.replace("pagina3.html")
            }, 5000)
        }

    }).catch(err => {
        loadingTextEl.style.display = 'none';
        erroTextEl.style.display = 'initial';
        console.log(err)
        erroTextEl.innerText = err
        setTimeout(() => {
            loadingEl.style.display = 'none'
        }, 5000)

    })

}

