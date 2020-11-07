var eTexto = document.getElementById('EntradaTexto');
var cadastro = document.getElementById('signup');
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
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];


        picture.addEventListener('click', (ev) => {
            picture.disabled = true
            picture.classList.add('flash')
            setTimeout(() => {
                picture.classList.remove('flash')
                mediaRecorder.stop();
            }, 6000)
            mediaRecorder.start();

        })

        mediaRecorder.ondataavailable = function (ev) {
            chunks.push(ev.data)
        }

        mediaRecorder.onstop = (ev) => {
            let blob = new Blob(chunks, { 'type': 'video/mp4' })
            chunks = []
            let videoURL = window.URL.createObjectURL(blob)
            videoDisplay.src = videoURL
            
            eTexto.style.transition = "opacity 5s"
            cadastro.style.transition = "opacity 5s"
            eTexto.style.opacity = "1.0"
            cadastro.style.opacity = "1.0"
            picture.disabled = false
           
           
            
            
            cadastro.addEventListener('click', cadastrarSistema)
            function cadastrarSistema() {
                const vNome = eTexto.value.trim();
                if (vNome == null || vNome == "") {
                    alert('Digite seu nome de usuario!')
                }
                else {
                    cadastro.disabled = true;
                    cadastro.style.opacity = '0.5';
                    let f = new File([blob], vNome+".mp4", { type: "video/mp4" })
                    let fd = new FormData()
                    fd.append('video', f)
                    fd.append('nome',vNome)
                    sendVideo(fd)
                }
            }
        }

    }).catch(function (err) {
        console.log(err.name, err.message);
    })


async function sendVideo(fd) {
    const loadingEl = document.querySelector('#tela-carregamento')
    const loadingTextEl = document.querySelector('#loading-message')
    const erroTextEl = document.querySelector('#erro-message')
    loadingEl.style.display = 'flex'
    loadingTextEl.style.display='initial';
    erroTextEl.style.display = 'none';
    erroTextEl.innerText = '';
    const response = await axios({
        url: 'https://201.74.114.180:3333/cadastro',
        method: 'POST',
        data: fd
    }).then(response => {
        cadastro.style.opacity = '1'
        cadastro.disabled = false
        if (response.data.erro){
            eTexto.value = "";
            loadingTextEl.style.display='none';
            erroTextEl.style.display = 'initial';
            erroTextEl.innerText = response.data.erro
            setTimeout(() => {
                loadingEl.style.display = 'none'
            },5000)
        }else{
            loadingTextEl.innerText = `${response.data.status} - ID:${response.data.id}`
            setTimeout(() => {
                loadingEl.style.display = 'none'
            },5000)
        }
    }).catch(err => console.log(err))
}

