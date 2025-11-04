function beforeStateEntry(sequenceId){
	var pastaPai = 1453;

		if(sequenceId != 3)
		populaCamposHiddenAnalytics(sequenceId);

		if (sequenceId == ATUALIZA_SLA_1) {
			var users = new java.util.ArrayList();
			users.add(hAPI.getCardValue("cdSolicitante"));
			hAPI.setAutomaticDecision(CORRECAO_NF, users,
				"Tarefa movimentada atualizando o tempo que está sendo empenhado na atividade.");
		}

		if (sequenceId == ATUALIZA_SLA_2) {
			var users = new java.util.ArrayList();
			users.add(hAPI.getCardValue("cdSolicitante"));
			hAPI.setAutomaticDecision(APROV_SOLIC, users,
				"Tarefa movimentada atualizando o tempo que está sendo empenhado na atividade.");
		}

		// solucao da inconsistencia
		if(sequenceId == 24 && sequenceId != buscarAtividadeAtual()){
			incrementaNrReprovacoes();
		}


		if (sequenceId == 13){

			var formId = getValue("WKCardId");
		    var existeAnexo = false;
		    var processConstraint = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", getValue("WKNumProces"),getValue("WKNumProces"), ConstraintType.MUST);
		    var companyConstraint = DatasetFactory.createConstraint("processAttachmentPK.companyId",getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		    var attachFields = new Array("documentId", "processAttachmentPK.attachmentSequence", "version");
		    var attachConstList = new Array(processConstraint, companyConstraint);
		    var attachDataset = DatasetFactory.getDataset("processAttachment", attachFields, attachConstList, new Array("processAttachmentPK.attachmentSequence"));
		    log.info("Quantidade de anexos " + attachDataset.rowsCount );
		    for(var x=0; x < attachDataset.rowsCount; x++){
		           if(attachDataset.getValue(x, "documentId") != formId){
		                  existeAnexo = true;
		           }

		    }
		    if(existeAnexo == false ){
		           throw "Deve haver no mínimo uma nota anexada ao processo!!!";
		    }else{
		           log.info("Publica Documento");
		           publicarDocumento(pastaPai);
		    }

		}else if(sequenceId == 4){
			var formId = getValue("WKCardId");
		    var existeAnexo = false;
		    var processConstraint = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", getValue("WKNumProces"),getValue("WKNumProces"), ConstraintType.MUST);
		    var companyConstraint = DatasetFactory.createConstraint("processAttachmentPK.companyId",getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		    var attachFields = new Array("documentId", "processAttachmentPK.attachmentSequence", "version");
		    var attachConstList = new Array(processConstraint, companyConstraint);
		    var attachDataset = DatasetFactory.getDataset("processAttachment", attachFields, attachConstList, new Array("processAttachmentPK.attachmentSequence"));
		    log.info("Quantidade de anexos " + attachDataset.rowsCount );
		    for(var x=0; x < attachDataset.rowsCount; x++){
		           if(attachDataset.getValue(x, "documentId") != formId){
		                  existeAnexo = true;
		           }

		    }
		    if(existeAnexo == false ){
		           throw "Deve haver no mínimo uma nota anexada ao processo!!!";
		    }
		}		
}

function publicarDocumento(pastaPai) {
	log.info("Publica Documento");
	// publicaDocGenerico(parametros, pastaPai);
	var objAnexar = new objAnexo(pastaPai);

	/*
	 * Busca e define o valor do diretrio (ordem influncia)
	 */
	getUnidade(objAnexar);
	// Define o diretrio com ANO/MES
	objAnexar.setParametro(2);
	setNotaFiscal(objAnexar);

	objAnexar.publicar();
}

function getUnidade(objAnexar) {
	var codUnidade = hAPI.getCardValue("codigo");
	var nomeUnidade = '';
	var datasetFilial = DatasetFactory.getDataset("filiais", null, null, null);

	for ( var i = 0; i < datasetFilial.rowsCount; i++) {
		if (datasetFilial.getValue(i, "codigo") == codUnidade) {
			nomeUnidade = datasetFilial.getValue(i, "filial");
		}
	}

	objAnexar.setParametro(1, nomeUnidade);
}

function setNotaFiscal(objAnexar){
	var numNotaFiscal = hAPI.getCardValue("numeronf");

	objAnexar.setParametro(1, numNotaFiscal);
}
