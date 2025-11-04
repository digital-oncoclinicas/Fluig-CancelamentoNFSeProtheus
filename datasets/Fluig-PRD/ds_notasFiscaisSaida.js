function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetFactory.newDataset();
	dataset.addColumn("ITEM");
	dataset.addColumn("FILIAL");
	dataset.addColumn("NUMERO");
	dataset.addColumn("SERIE");
	dataset.addColumn("COD_CLIENTE");
	dataset.addColumn("LOJA_CLIENTE");
	dataset.addColumn("DESC_CLIENTE");
	dataset.addColumn("CGC");
	dataset.addColumn("DT_EMISSAO");
	dataset.addColumn("VALOR");
	dataset.addColumn("BASE_PIS");
	dataset.addColumn("ALQ_PIS");
	dataset.addColumn("VALOR_PIS");
	dataset.addColumn("BASE_COFINS");
	dataset.addColumn("ALQ_COFINS");
	dataset.addColumn("VALOR_COFINS");
	dataset.addColumn("BASE_CSLL");
	dataset.addColumn("ALQ_CSLL");
	dataset.addColumn("VALOR_CSLL");
	dataset.addColumn("BASE_INSS");
	dataset.addColumn("ALQ_INSS");
	dataset.addColumn("VALOR_INSS");
	dataset.addColumn("BASE_IR");
	dataset.addColumn("ALQ_IR");
	dataset.addColumn("VALOR_IR");
	dataset.addColumn("BASE_ISS");
	dataset.addColumn("ALIQ_ISS");
	dataset.addColumn("VALOR_ISS");
	dataset.addColumn("DIAS");
	dataset.addColumn("NF_ELETRONICA");
	dataset.addColumn("FILTRO");

	var periodicService = ServiceManager.getServiceInstance('ws_consultasProtheus');
	var serviceHelper = periodicService.getBean();
	var serviceLocator = periodicService.instantiate('br.com.oncoclinicas.webservices.wsconsultas_apw.WSCONSULTAS');
	var service = serviceLocator.getWSCONSULTASSOAP();

	// Autenticação
	var usuario = "";
	var senha = "";
	var dataAuth = authentication_protheus()
	log.info("MAYKON Qtd dataAuth: " + dataAuth.rowsCount);

	if (dataAuth.rowsCount > 0) {
		// nova att tem que referenciar
		usuario = dataAuth.getValue(0, 'txtUsuario');
		senha = dataAuth.getValue(0, 'txtSenha');
	} else {
		log.info("Usuário de autenticação Protheus não localizado no dataset ds_form_authentication_protheus ")
		dataset.addRow(new Array("Usuário de autenticação Protheus não localizado no dataset ds_form_authentication_protheus !"));

	}

	var filtro = "";
	/*****************************FILTROS*****************************
	 * FILIAL                                                        *
	 * NUMERO                                                        *
	 * SERIE                                                         *
	 * COD_CLIENTE                                                   *
	 * LOJA_CLIENTE                                                  *
	 * DESC_CLIENTE                                                  *
	 * CGC                                                           *
	 * VALOR                                                         *
	 * DIAS                                                          *
	 * NF_ELETRONICA                                                 *
	 * FILTRO (FILIAL + NUMERO + SERIE + COD_CLIENTE + DESC_CLIENTE) *
	 *****************************************************************/

	for (var i in constraints) {
		if (filtro != "") {
			filtro += " | "
		}

		filtro += constraints[i].fieldName + " = " + constraints[i].initialValue;
	}
	// Log de autenticação
	var authService = serviceHelper.getBasicAuthenticatedClient(service, "br.com.oncoclinicas.webservices.wsconsultas_apw.WSCONSULTASSOAP", usuario, senha);

	// var resultObj = service.wsnotasfiscaissaida(filtro);
	var resultObj = authService.wsnotasfiscaissaida(filtro);
	var result = resultObj.getWSRETCONSULTAS().toArray();

	for (var x in result) {
		dataset.addRow(new Array(
			result[x].getITEM(),
			result[x].getFILIAL(),
			result[x].getNUMERO(),
			result[x].getSERIE(),
			result[x].getCODCLIENTE(),
			result[x].getLOJACLIENTE(),
			result[x].getDESCCLIENTE(),
			result[x].getCGC(),
			result[x].getDTEMISSAO(),
			result[x].getVALOR(),
			result[x].getBASEPIS(),
			result[x].getALQPIS(),
			result[x].getVALORPIS(),
			result[x].getBASECOFINS(),
			result[x].getALQCOFINS(),
			result[x].getVALORCOFINS(),
			result[x].getBASECSLL(),
			result[x].getALQCSLL(),
			result[x].getVALORCSLL(),
			result[x].getBASEINSS(),
			result[x].getALQINSS(),
			result[x].getVALORINSS(),
			result[x].getBASEIR(),
			result[x].getALQIR(),
			result[x].getVALORIR(),
			result[x].getBASEISS(),
			result[x].getALIQISS(),
			result[x].getVALORISS(),
			result[x].getDIAS(),
			result[x].getNFELETRONICA(),
			result[x].getFILIAL() + " - " + result[x].getNUMERO() + " - " + result[x].getSERIE()
		));
	}

	return dataset;

}

// Function to authenticate user in Protheus
function authentication_protheus() {
	var filter = new Array();
	filter.push(DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST));
	var datareturn = DatasetFactory.getDataset('ds_form_authentication_protheus', null, filter, null);
	return datareturn
}