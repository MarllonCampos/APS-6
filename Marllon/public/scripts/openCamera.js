const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const errorMsgElement = document.getElementById('ErrorMsg');

const configPadrao = {
    video: {
        width: 300,
        height: 300
    }
}
const { video: { width, height } } = configPadrao
canvas.width = width
canvas.height = height


function startVideo() {
    navigator.getUserMedia(
        configPadrao,
        stream => video.srcObject = stream,
        err => errorMsgElement.innerHTML = `Ocorreu o seguinte erro: ${err.toString()}`
    )
}

startVideo();

const context = canvas.getContext('2d')
snap.addEventListener('click', function () {
    
    context.font = "50px Roboto";
    let time = 1
    let contador = setInterval(() => {
        canvas.style.transition = "none"
        canvas.style.transform = "";
        if (time > 3) {
            clearInterval(contador)
            return
        }
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
        
        context.fillText(time, 150, 150);
        time++
        
    }, 1000)

    setTimeout(() => {
        context.drawImage(video, 0, 0, width, height)
        setTimeout(()=> {
            canvas.style.transition = "all 0.8s"
            canvas.style.transform = "scaleX(-1)";
        },500)

        const image = document.getElementById('canvas').toDataURL("image/png").replace("image/jpg", "image/octet-stream");
    }, 3500)
    
})


function _imageEncode (arrayBuffer) {
    let u8 = new Uint8Array(arrayBuffer)
    let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
    let mimetype="image/jpeg"
    return "data:"+mimetype+";base64,"+b64encoded
}


async function getTouch(){
    try{
        let base64 = document.getElementById('base64')
        const response = await axios.get('http://localhost:5500/images/touch.jpeg',{responseType:"arraybuffer"})
        let image = _imageEncode(response.data);
        base64.src = image
    }catch(e){
        console.log(e);
    }
}
getTouch();


