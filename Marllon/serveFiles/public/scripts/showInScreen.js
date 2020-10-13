if (localStorage.getItem("conteudoAps")){
    const nomeUsuario = document.querySelector('.nomeus h4')
    const informacoes = document.querySelector('.informacoes')
    conteudoBanco = JSON.parse(localStorage.getItem("conteudoAps"))
    nomeBanco = localStorage.getItem("nomeConteudoAps")
    nomeUsuario.innerText = nomeBanco
    
    conteudoBanco.map(e => {
        const divEl = document.createElement('div')
        const nomeAgrotoxico= document.createElement('h4')
        const classeAgrotoxico= document.createElement('h4')
        const tipoAgrotoxico= document.createElement('h4')
        const periculosidadeAgrotoxico= document.createElement('h4')
        divEl.className = "infonomes"

        nomeAgrotoxico.innerText = e.nome
        classeAgrotoxico.innerText = e.classe
        tipoAgrotoxico.innerText = e.tipoAplicacao
        periculosidadeAgrotoxico.innerText = e.periculosidade

        divEl.appendChild(nomeAgrotoxico)
        divEl.appendChild(classeAgrotoxico)
        divEl.appendChild(tipoAgrotoxico)
        divEl.appendChild(periculosidadeAgrotoxico)
        
        informacoes.appendChild(divEl)

    })

    localStorage.setItem("conteudoAps","")
    localStorage.setItem("nomeconteudoAps","")

}else{
    alert('Você não esta logado, voltando para a pagina inicial!!')
    window.location.replace('index.html')
}