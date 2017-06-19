var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
			console.log(http_request.statusText);
			var xmlDoc = http_request.responseXML;
			console.log(xmlDoc);
			var x = xmlDoc.getElementsByTagName("cancion");
			console.log(x);
			let lista = "";
			for (let i = 0; i< x.length; i++){
				console.log(x[i].getAttribute("titulo"));
				lista += "<li>" + x[i].getAttribute("titulo") + "</li>"
			}
			document.getElementById("lista-canciones").innerHTML = lista;
            /*Aquí deben procesar el archivo y cargar la información en el contenedor especificado*/
        } else {
            alert('Hubo problemas con la petición.');
			
        }
    }
}

window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('datos.xml');
    }
}
