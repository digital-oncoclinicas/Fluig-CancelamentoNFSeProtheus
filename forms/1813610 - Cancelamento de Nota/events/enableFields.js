function enableFields(form){
	
	
	var atividade = getValue('WKNumState');
     

    if (atividade == CORRECAO || atividade == CORRECAO_2) {
		
	 form.setEnabled("cpFilial",true);
	 form.setEnabled("Aprov_fiscal",false);
	 form.setEnabled("Reprov_fiscal",false);
	 form.setEnabled("consideracoes_fiscal",false);
	
    }

    if(atividade == FISCAL){
        form.setEnabled("selectStatusTitulo", false);
        form.setEnabled("selectTipoCancelamento", false);
    }else{
        form.setEnabled("aprovacao_2", false);
        form.setEnabled("consideracoes_fiscal2", false);
    }
	
}