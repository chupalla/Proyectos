$(document).ready(function () {
	chrome.storage.sync.get('numBip', function (items) {
		if (!chrome.runtime.error) {
			$("#numBip").val(items.numBip);
			if (typeof items.numBip != 'undefined') getSaldo();
		}
	});
	$("#numBip").ForceNumericOnly();
	$("#obtenerSaldo").click(function () {
		getSaldo();
	});
	$("#numBip").on('keypress', function (e) {
		if (e.which == 13) {
			getSaldo();
		}
	});
});

function getSaldo() {
	$("#resultado").hide();
	if ($("#numBip").val() == '') {
		alert("Ingrese número de tarjeta BIP");
		return;
	}
	$("#loader").show();
	$.getJSON("http://bip-servicio.herokuapp.com/api/v1/solicitudes.json", { bip: $("#numBip").val() })
		.done(function (data) {
			$("#loader").hide();
			$("#saldo").html(data.saldoTarjeta);
			$("#estadoTarjeta").html(data.estadoContrato);
			$("#fechaSaldo").html(data.fechaSaldo);
			$("#resultado").show();
			chrome.storage.sync.set({ 'numBip': $("#numBip").val() }, function () {
				if (chrome.runtime.error) {
					console.log("Error.");
				}
			});
		}).error(function () {
			$("#loader").hide();
			alert("Número de tarjeta invalido")
		});
}

jQuery.fn.ForceNumericOnly =
	function () {
		return this.each(function () {
			$(this).keydown(function (e) {
				var key = e.charCode || e.keyCode || 0;
				return (
					key == 8 ||
					key == 9 ||
					key == 13 ||
					key == 46 ||
					key == 110 ||
					key == 190 ||
					(key >= 35 && key <= 40) ||
					(key >= 48 && key <= 57) ||
					(key >= 96 && key <= 105));
			});
		});
	};
