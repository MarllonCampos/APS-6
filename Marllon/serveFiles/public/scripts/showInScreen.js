if (localStorage.getItem("conteudoAps")){
    conteudoBanco = localStorage.getItem("conteudoAps")
    console.log(conteudoBanco)

}else{
    alert('Você não esta logado, voltando para a pagina inicial!!')
    window.location.replace('index.html')
}