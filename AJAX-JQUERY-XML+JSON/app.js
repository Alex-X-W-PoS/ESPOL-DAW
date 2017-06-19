var http_request = false;

function makeRequest1(url) {


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

function makeRequest2(id,url1,url2) {


    http_request_json = false;
	http_request_xml = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request_json = new XMLHttpRequest();
		http_request_xml = new XMLHttpRequest();
        if (http_request_json.overrideMimeType) {
            http_request_json.overrideMimeType('text/plain');
            // Ver nota sobre esta linea al final
        }
		if (http_request_xml.overrideMimeType) {
            http_request_xml.overrideMimeType('text/xml');
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
	http_request_xml.onreadystatechange = alerts;
	http_request_xml.open('GET', url2, true);
    http_request_xml.send(null);
    http_request_json.onreadystatechange = function(){alertContents2(id);};
	http_request_json.open('GET', url1, true);
    http_request_json.send(null);
    
}

function alerts() {
	if (http_request_xml.readyState == 4) {
        if (http_request_xml.status == 200) {
			console.log("GOOD TO GO");
			
		}
	}
}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
			var jsonDoc = http_request.responseText;
			console.log(jsonDoc);
			var array = JSON.parse(jsonDoc);
			console.log(array);
			for (let i = 0; i<array.length;i++){
				console.log(array[i]);
				let div1 = document.createElement("div");
				let elemento = document.createElement("li");
				let enlace = document.createElement("a");
				let div2 = document.createElement("div");
				let deudas = document.createElement("ul");
				enlace.setAttribute("id",i);
				enlace.setAttribute("class","requerimiento2");
				enlace.setAttribute("href","#contacto");
				enlace.innerHTML = array[i].nombre;
				div1.appendChild(enlace);
				enlace.onclick = function () {
					myFunc(i);
				};
				elemento.appendChild(div1);
				deudas.setAttribute("id","lista-deudas-" + i);
				div2.appendChild(deudas);
				elemento.appendChild(div2);
				document.getElementById("lista-usuarios").appendChild(elemento);
				
			}

			//document.getElementById("lista-usuarios").innerHTML = lista;
        } else {
            alert('Hubo problemas con la petición.');
			
        }
    }
}

function alertContents2(id) {
    if (http_request_json.readyState == 4) {
        if (http_request_json.status == 200) {
			var xmlDoc = http_request_xml.responseXML;
			console.log(id);
			console.log(xmlDoc);
			var jsonDoc = http_request_json.responseText;
			console.log(jsonDoc);
			var array = JSON.parse(jsonDoc);
			console.log(array);
			var deuda_total = 0;
			var servicios_usuario = array[id].servicios;
			console.log(servicios_usuario);
			for (let i=0;i<servicios_usuario.length;i++){
				deuda_total += parseInt(servicios_usuario[i].deuda);
				var x = xmlDoc.getElementsByTagName("servicio");
				let y = servicios_usuario[i].servicio;
				console.log(deuda_total);
				for (let j=0;j<x.length;j++){
					if(x[j].getAttribute("tipo").localeCompare(y)==0){
						console.log(y);
						let div = document.createElement("div");
						let li = document.createElement("li");
						let p_servicio = document.createElement("p");
						let p_nombre = document.createElement("p");
						let p_direccion = document.createElement("p");
						let p_telefono = document.createElement("p");
						let p_deuda = document.createElement("p");
						p_servicio.innerHTML="Servicio: " + y;
						p_nombre.innerHTML="Nombre: " + x[j].getElementsByTagName("nombre")[0].innerHTML;
						p_direccion.innerHTML="Direccion: " + x[j].getElementsByTagName("direccion")[0].innerHTML;
						p_telefono.innerHTML="Teléfono: " + x[j].getElementsByTagName("telefono")[0].innerHTML;
						p_deuda.innerHTML="Deuda: " + servicios_usuario[i].deuda;
						div.appendChild(p_servicio);
						div.appendChild(p_nombre);
						div.appendChild(p_direccion);
						div.appendChild(p_telefono);
						div.appendChild(p_deuda);
						li.appendChild(div);
						document.getElementById("lista-deudas-" + id).appendChild(li);
					}
				}
			}
			let li_total = document.createElement("li");
			let p_deuda_total = document.createElement("p");
			p_deuda_total.innerHTML = "Deuda Total: " + deuda_total;
			li_total.appendChild(p_deuda_total);
			document.getElementById("lista-deudas-" + id).appendChild(li_total);

			//document.getElementById("lista-usuarios").innerHTML = lista;
        } else {
            alert('Hubo problemas con la petición.');
			
        }
    }
}

function myFunc (id){
	makeRequest2(id,'gastos_personales.json','servicios_basicos.xml');
}

	



window.onload = function() {
    var link = document.getElementById('requerimiento1');
	console.log(link);
    link.onclick = function() {
        makeRequest1('gastos_personales.json');
    }

}
