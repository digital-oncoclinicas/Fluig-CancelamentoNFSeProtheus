function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    GETSLA();
    
    var ATIVIDADE = getValue("WKNumState");
    
    if (ATIVIDADE == 4 ) {
	
    	var anexos = hAPI.listAttachments();
        var temAnexo = false;    	
    	var tipo = hAPI.getCardValue('cpTipoNotaAux');
    	
    	if (tipo == "1"){
			 if (anexos.size() > 0) {
				  temAnexo = true;
		      }

			  if (!temAnexo) {
				    throw "Anexar declaração de autorização para o cancelamento da NF do tomador de serviço! Dúvidas entre em contato pelo e-mail : centraldenotas@oncoclinicas.com";
			  }
    	}    	
    }
    
    if (nextSequenceId == 67) {

    /*    var codFilial = hAPI.getCardValue("cpCodFiliais");
        var idFluig = hAPI.getCardValue("cpNumeroSolicitacao");
        var numeroSerie = hAPI.getCardValue("cpNumeSerie");
        var nomeSolicitante = hAPI.getCardValue("nomeSolicitante");
        var dataSolicitacao = hAPI.getCardValue("dataSolicitacao");
        var filial = hAPI.getCardValue("cpFilial");
        var numeroNota = hAPI.getCardValue("cpNumeroNota");
        var cpDataEmissao = hAPI.getCardValue("cpDataEmissao");
        var cnpj = hAPI.getCardValue("cpCnpjCliente");
        var razaoSocial = hAPI.getCardValue("cpRazaoSocial");
        var valorNota = hAPI.getCardValue("cpValorNf");
        var statusNf = hAPI.getCardValue("cpStatusNf");
        var motivoCanc = hAPI.getCardValue("cpMotivoCanc");
        var observacao = hAPI.getCardValue("cpObservacao");

        var users = new java.util.ArrayList();
        users.add("Pool:Group:PAC");

        var fnEmail = loadLiv(["com.totvsNacoesUnidas.fluig.js.ds.CustomEmail"]);
        var valoresForm = new java.util.HashMap();

        valoresForm.put("codFilial", codFilial);
        valoresForm.put("idFluig", idFluig);
        valoresForm.put("serieNf", numeroSerie);
        valoresForm.put("nomeSolicitante", nomeSolicitante);
        valoresForm.put("dataSolicitacao", dataSolicitacao);
        valoresForm.put("cpFilial", filial);
        valoresForm.put("cpNumeroNota", numeroNota);
        valoresForm.put("cpDataEmissao", cpDataEmissao);
        valoresForm.put("cpCnpjCliente", cnpj);
        valoresForm.put("cpRazaoSocial", razaoSocial);
        valoresForm.put("cpValorNf", valorNota);
        valoresForm.put("cpStatusNf", statusNf);
        valoresForm.put("cpMotivo", motivoCanc);
        valoresForm.put("cpObservacao", observacao);

        var rest = hAPI.startProcess("AtendimentoProcessoAdministrativo", 0, users, "Solicitação inicializada do processo de Cancelamento de Notas", true, valoresForm, false);

        var rest =  workflowEngineService.startProcess(username, password, 1,processId,5, colleaguesId, comments, userId, true, processAttachmentDtoArray, cardData, appointment, false);
		
        
        
        var numProcess = rest.get("iProcess").toString();
        var linkProcess = "https://oncoclinicas.fluig.com/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numProcess + " ";
        var linkAux = "<a href='" + linkProcess + "' _blank>" + numProcess + "</a>";
        var emailSolicitante = hAPI.getCardValue("emailSolicitante");

        fnEmail.mail.sendCustomEmail({
            companyId: getValue("WKCompany"),
            subject: "Status Solicitação FLUIG",
            from: "hiago.oliveira@live.com",
            to: emailSolicitante,
            templateId: "tempEmailExt",
            templateDialect: "pt_BR",
            templateHtml: "cancelamentoExtemporaneo.html",
            dados: {
                "solicitante": nomeSolicitante,
                "numProcesso": linkAux
            }
        });
    }*/

        //novoProcesso();
        enviaEmail();
        
    }
}

function novoProcesso(){
	
	var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
    var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
    var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
    var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
    stringArray.getItem().add("Pool:Group:PAC");    
    
    var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
    var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
    var cardData = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                 
    var codFilial = hAPI.getCardValue("cpCodFiliais");
    var idFluig = "Solicitacao inicial gerado pelo num: "+hAPI.getCardValue("cpNumeroSolicitacao")+" ";
    var numeroSerie = hAPI.getCardValue("cpNumeSerie");
    var nomeSolicitante = hAPI.getCardValue("nomeSolicitante");
    var dataSolicitacao = hAPI.getCardValue("dataSolicitacao");
    var filial = hAPI.getCardValue("cpFilial");
    var numeroNota = hAPI.getCardValue("cpNumeroNota");
    var cpDataEmissao = hAPI.getCardValue("cpDataEmissao");
    var cnpj = hAPI.getCardValue("cpCnpjCliente");
    var razaoSocial = hAPI.getCardValue("cpRazaoSocial");
    var valorNota = hAPI.getCardValue("cpValorNf");
    var statusNf = hAPI.getCardValue("cpStatusNf");
    var motivoCanc = hAPI.getCardValue("cpMotivoCanc");
    var observacao = idFluig + hAPI.getCardValue("cpObservacao");
    var emailSolicitante = hAPI.getCardValue("emailSolicitante");

    var arrayCampos = []
    arrayCampos.push(["codFilial", codFilial]);
    arrayCampos.push(["idFluig", idFluig]);
    arrayCampos.push(["serieNf", numeroSerie]);
    arrayCampos.push(["nomeSolicitante", nomeSolicitante]);
    arrayCampos.push(["dataSolicitacao", dataSolicitacao]);
    arrayCampos.push(["cpFilial", filial]);
    arrayCampos.push(["cpNumeroNota", numeroNota]);
    arrayCampos.push(["cpDataEmissao", cpDataEmissao]);
    arrayCampos.push(["cpCnpjCliente", cnpj]);
    arrayCampos.push(["cpRazaoSocial", razaoSocial]);
    arrayCampos.push(["cpValorNf", valorNota]);
    arrayCampos.push(["cpStatusNf", statusNf]);
    arrayCampos.push(["cpMotivo", motivoCanc]); 
    arrayCampos.push(["cpObservacao", observacao]);
                     
       
    for (var index = 0; index < arrayCampos.length; index++) {
        var campoValor = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        var campoX = arrayCampos[index][0]
        var valorX = arrayCampos[index][1]

        campoValor.getItem().add(campoX);
        campoValor.getItem().add(valorX);
        cardData.getItem().add(campoValor);
    }


    log.info(getValue("WKNumProces") + ' stringArray:');
    log.dir(stringArray);
    log.info('___________________________')
    log.info(getValue("WKNumProces") + ' CardData:');
    log.dir(cardData);

    var rest = workflowEngineService.startProcess("integrador.fluig@oncoclinicas.com",
        "hUbust*7",
        1,
        "AtendimentoProcessoAdministrativo",
        0,
        stringArray,
        "Solicitação inicializada do processo de Cancelamento de Notas",
        hAPI.getCardValue('idSolicitante'),
        true,
        processAttachmentDtoArray,
        cardData,
        processTaskAppointmentDtoArray,
        false);

    var iProcess = "";
    for (var j = 0; j < rest.getItem().size(); j++) {
        var item = rest.getItem().get(j).getItem();
        var key = item.get(0);
        var value = item.get(1);
        if (key == "iProcess") {
            iProcess = value;
        }
    }

    hAPI.setTaskComments(hAPI.getCardValue('idSolicitante'),
        hAPI.getCardValue("cpNumeroSolicitacao"),
        0,
        'Caso queira acompanhar o chamado no Fluig, o nº dele é o : ' + iProcess);
            
    hAPI.setCardValue('novaAtividade', iProcess)
    
    enviaEmail();
}

function enviaEmail(){
    log.info("chegou no inicio da taynara");
    
    var sender = "4s2f7mmb7dfs64qv1452799368975";
    var recipients = [];
    
    var emailSolicitante = hAPI.getCardValue("emailSolicitante");	
            
    recipients.push(""+emailSolicitante+"");
            
    var assunto = '[' + getValue("WKNumProces") + '] Cancelamento de nota fiscal ' + hAPI.getCardValue("cpNumeroNota");
    
    var html = '';
    html += '<p>Prezado(a)'+ hAPI.getCardValue("nomeSolicitante") +'</p>';
    html += '<p>Segue os dados da solicitação <strong>' + getValue("WKNumProces") + '</strong> ';

    var cpTipoNotaAux = hAPI.getCardValue("cpTipoNotaAux");
    if(cpTipoNotaAux == "1") html += '<p>Nota Fiscal cancelada com sucesso, por processo administrativo.</p>';
    if(cpTipoNotaAux == "2") html += '<p>Nota Fiscal cancelada com sucesso.</p>';

    var json = {
        assunto: assunto,
        destinatario: recipients,
        template: "templateEmailPadrao",
        sender: sender,
        html: html
    }
    
    var cons = DatasetFactory.createConstraint("JSON", JSON.stringify(json), "", ConstraintType.MUST);
    var ds_envioEmail = DatasetFactory.getDataset("ds_envioEmail", null, [cons], null);
    
    if (ds_envioEmail.getValue(0, 'SUCESSO') == 'TRUE') {
        return true;
    } else {
        return false;
    }
};

function loadLiv(e) {
    var t = {};
    if (e == null) {
        return t
    }
    var n = function (e, t) {
        for (var n = 0; n < e.length; n++) {
            if (e[n] == t) return true
        }
        return false
    };
    var r = DatasetFactory.getDataset("tnuCustomJS", null, null, null);
    for (var i = 0; i < r.rowsCount; i++) {
        var s = r.getValue(i, "liv");
        if (n(e, s)) {
            var o = r.getValue(i, "src");
            var u = r.getValue(i, "name");
            try {
                var a = new Function("liv", "return " + o);
                t[u] = a(t)
            } catch (f) {
                log.error("*** Erro ao compilar livraria " + s + ":" + f)
            }
        }
    }
    return t
}