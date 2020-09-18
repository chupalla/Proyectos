$(document).ready(function () {
	getData();
});

function getData() {
	$("#loader").show();
	$.getJSON("https://mindicador.cl/api")
		.done(function (data) {	
			var fecha = data.fecha.split("T")[0].split("-");
			$("#fecha").html(`Indicadores Economicos ${fecha[2]}-${fecha[1]}-${fecha[0]}`);
			let	html = '';	
			Object.keys(data).forEach(function(key) {
				try {
					html = html + createDiv(data[key]);		
				} catch (error) {}	  
			});
			$(html).insertAfter( "#divAfter" );
			$("#loader").hide();
		}).error(function () {
			$("#loader").hide();
			alert("Error al obtener la información\nPor favor intentelo mas tarde")
		});
}

function createDiv(data){
	let html = '';
	try {
		if(data.nombre){
			let medida = data.unidad_medida == 'Porcentaje' ? '%' : data.unidad_medida;
			html = `<div class="infoDiv"><span class="title">${data.nombre}:</span><span class="res">${data.valor} ${medida}</span></div>`;
		}			
	} catch (error) {}
	return html;
}