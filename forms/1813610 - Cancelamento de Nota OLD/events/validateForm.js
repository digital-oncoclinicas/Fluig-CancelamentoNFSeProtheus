function validateForm(form) {

	var CURRENT_STATE = getValue("WKNumState");
	var erroMsg = '';
	if (CURRENT_STATE == 0 || CURRENT_STATE == INICIO) {

		if (form.getValue('cpNumeroNota') == '') { erroMsg += 'Deve ser informado o numero da nota fiscal!!!\n' }
		if (form.getValue('cpCodFiliais') == '') { erroMsg += 'Deve ser informada a filial!!!\n' }
		if (form.getValue('cpObservacao') == '') { erroMsg += 'Deve ser informada uma observação!!!\n' }
		if (form.getValue('cpTipoNota') == '') { erroMsg += 'Deve ser informado o tipo da nota!!!\n' }
		if (form.getValue('cpDataEmissao') == '') { erroMsg += 'Deve ser informada a data de emissão!!!\n' }
		if (form.getValue('cpCnpjCliente') == '') { erroMsg += 'Deve ser informado o CNPJ do cliente!!!\n' }
		if (form.getValue('cpRazaoSocial') == '') { erroMsg += 'Deve ser informada a razão social do cliente!!!\n' }
		if (form.getValue('cpValorNf') == '') { erroMsg += 'Deve ser informado o valor da nota fiscal!!!\n' }
		//if (form.getValue('cpStatusNf') == '') { erroMsg += 'Deve ser informada o status da nota fiscal!!!\n' }
		if (form.getValue('cpMotivo') == '') { erroMsg += 'Deve ser informado o motivo do cancelamento!!!\n' }

	} else if (CURRENT_STATE == APROVAR_CANCELAMENTO) {
		if (form.getValue('aprovacao') == '') { erroMsg += 'Deve ser informada uma decisão' }
		if (form.getValue('aprovacao') == ''
			&& form.getValue('consideracoesAconpanhamento') == '') { erroMsg += 'Deve ser informada uma decisão' }
	} else if (CURRENT_STATE == REALIZAR_VALIDACAO_NF) {

	} else if (CURRENT_STATE == ESTORNO_BAIXA) {

	} else if (CURRENT_STATE == PROCEDIMENTO_CANCELAMENTO) {
		if (form.getValue('selectTipoCancelamento') == '') { erroMsg += 'Tipo de cancelamento deve ser informado' }
	} else if (CURRENT_STATE == FISCAL) {
		if (form.getValue('aprovacao_2') == '') { erroMsg += 'Deve ser informada uma decisão' }
	}

	if (erroMsg.length > 1) {
		throw erroMsg;
	}
}
