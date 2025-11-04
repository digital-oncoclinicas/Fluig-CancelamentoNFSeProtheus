var ativPosInicial = 16;
var ativPosCorrecao = 4;

function afterTaskSave(colleagueId, nextSequenceId, userList) {

	if (nextSequenceId == ativPosInicial || nextSequenceId == ativPosCorrecao) {
		preencherIdentificador();
	}
}

function preencherIdentificador() {
	var unidade = hAPI.getCardValue("hiddenFilial");
	var dataInicial = hAPI.getCardValue("datasolic");
	
	var identificador = new objIdentificador("N", unidade, dataInicial);
	
}