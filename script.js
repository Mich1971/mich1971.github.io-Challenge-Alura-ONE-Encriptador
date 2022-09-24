// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

const llaves = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
const ingreso = document.querySelector("#ingresoTexto");
const mensaje = document.querySelector("#mensaje");
const alerta = "¡Ningún texto valido fue encontrado!";
var laCifra ="";
ingreso.value = "";

inputVerificar();

function ocultar(elementoID) {
    document.getElementById(elementoID).style.display = "none";
}
function mostrar(elementoID) {
    document.getElementById(elementoID).style.display = "block";
}
function ocultarElementos(numElementos) {
    const hiden = ["div-ocultar","titulo1","titulo2"];
    for (let indice = (hiden.length - numElementos); indice < hiden.length; indice++) {
        ocultar(hiden[indice]);
    }
}
function resultado( result, subTit) {
    ocultarElementos(3);
    mostrar(subTit);
    mensaje.style.textAlign = "left";
    mensaje.value = result;
    ingreso.value = "";
}
function cifrado( a, b) {
    for (let indice = 0; indice < llaves.length; indice++) {
        if (laCifra.includes(llaves[indice][a])) {
            laCifra = laCifra.replaceAll(llaves[indice][a], llaves[indice][b]);
        }
    }
}
function prepText() {
    const noPermitido = /[^a-zñ,.! ]/g;
    let texto = ingreso.value.toLowerCase();
    noPermitido.lastIndex = 0;
    if (noPermitido.test(texto)) {
        //Separa y elimina los acentos diacriticos del string (excepto "ñ")
        texto = texto.normalize("NFD").replace(/[\u0300-\u0302,\u0304-\u036f]/g, "");
        texto = texto.normalize().replace(noPermitido, "");
        alert("¡Se alteró el texto para adaptarlo al formato permitido!");
    }
    return texto;
}
function inputVerificar() {
    ingreso.addEventListener("keypress", function (tecla) {
        var caracter = tecla.key;
        if (/[^a-zA-ZñÑ,.! ]/.test(caracter)) {
            tecla.preventDefault();
        }
    });
}

// Seccion de funciones activadas por "onClick" en los botones.
function encriptar() {
    laCifra = prepText();
    if (laCifra == "") {
        alert(alerta);
    } else {
        cifrado( 0, 1);
        resultado( laCifra, "titulo1");
    }
}
function desencriptar() {
    laCifra = prepText();
    if (laCifra == "") {
        alert(alerta);
    } else {
        cifrado( 1, 0);
        resultado( laCifra, "titulo2");
    }
}
function copiar() {
    var copiaTexto = mensaje;
    copiaTexto.select();
    copiaTexto.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copiaTexto.value);
    ingreso.value = copiaTexto.value;
    mensaje.value = "";
    document.getElementById("mensaje").blur();    
    alert("Copiado!!");
}
function inicio() {
    ocultarElementos(2);
    mostrar("div-ocultar");
    mensaje.style.textAlign = "center";
    mensaje.value = "¡Aplicación reinicidada y lista para el ingreso de texto!";
    ingreso.value = "";
}