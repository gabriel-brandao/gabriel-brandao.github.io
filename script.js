const inputTexto = document.querySelector(".digite-texto");
const textoArea = document.querySelector(".area-texto");

function validar(){
    if(!inputTexto.checkValidity()){
        inputTexto.focus();
        inputTexto.reportValidity();
        return false;
    }
    return true;
}

function btnEcriptar(){
    if(!validar())
        return;
    limpaTextArea();
    const textoEncriptado = encripta(inputTexto.value);
    console.log(textoEncriptado);
    textoArea.value = textoEncriptado;
}

function btnDesencriptar(){
    if(!validar())
        return;
    limpaTextArea();
    const textoDesencriptado = desencripta(inputTexto.value)
    console.log(textoDesencriptado);
    textoArea.value = textoDesencriptado;
}

function encripta(texto){
    const pattern = ["e", "i", "a", "o", "u"];
    const correspondente = ["enter", "imes", "ai", "ober", "ufat"];
    let regex;

    for (let i = 0; i < pattern.length; i++){
        //'g' - global (para a string inteira) 'i' - case-insensitive(nao diferencia minuscula e maiuscula)
        regex = new RegExp(pattern[i], 'ig');
        texto = texto.replace(regex, correspondente[i]);
    }

    return texto;
}

function desencripta(texto){
    const pattern = ["enter", "imes", "ai", "ober", "ufat"];
    const correspondente = ["e", "i", "a", "o", "u"];
    let regex;

    for (let i = 0; i < pattern.length; i++){
        //'g' - global (para a string inteira) 'i' - case-insensitive(nao diferencia minuscula e maiuscula)
        regex = new RegExp(pattern[i], 'ig');
        texto = texto.replace(regex, correspondente[i]);
    }

    return texto;
}

function limpaTextArea(){
    tiraBackground();
    insereBotao();
}

function tiraBackground(){
    //consulta atributo CSS
    const textArea = document.querySelector(".area-texto").style.backgroundImage;

    //se text area não tiver background é pq ja foi tirado junto com os <p> e nada precisa ser feito
    if(textArea == "none")
        return;

    //tira background-image (alteração CSS)
    document.querySelector(".area-texto").style.backgroundImage = "none";
    //remove todos os filhos menos o primeiro filho
    const retangulo = document.querySelector(".retangulo-inicial");
    while(retangulo.childElementCount > 1)
        retangulo.removeChild(retangulo.lastChild);
}

function insereBotao(){
    const retangulo = document.querySelector(".retangulo-inicial");

    //se houver botao dentro do retangulo nada precisa ser feito
    if(retangulo.querySelector(".botao-copiar") !== null)
        return;
    //cria elemento botao
    let botao = document.createElement("button");

    //insere texto do button como filho do botao
    let label = document.createTextNode("Copiar");
    botao.appendChild(label);

    //atributos HTML (altera apenas no HTML pois a classe ja existe no CSS)
    botao.setAttribute("class", "botao-copiar");
    botao.setAttribute("type", "button");
    botao.setAttribute("onclick", "copiarTexto()");

    //insere botao como filho do retangulo
    retangulo.appendChild(botao);
}

async function copiarTexto(){
    let textoCopiado = document.querySelector(".area-texto");
    textoCopiado.setSelectionRange(0, 99999);
    
    await navigator.clipboard.writeText(textoCopiado.value);

    

}



