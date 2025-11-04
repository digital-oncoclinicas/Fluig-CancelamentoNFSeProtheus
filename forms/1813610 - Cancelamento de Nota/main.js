var loadingNota = FLUIGC.loading('#div_solicitante'); 
var ultimaLinha = 0;
var controle = [];
var ARYForms = {
    params: {},
    initForm: function(params) {
        this.params = params;
        var $this = this;
        $(function() {
            if (params.formMode == "ADD" || params.formMode == "MOD") {
                $this.onEdit(params);
            } else {
                $this.onView(params);
            }
        });
    },
    onView: function(params) { //Visualização do formulário sem a possibilidade de edição (consulta)
        $("#aprovacao").css('display', 'block');
        $("#consideracoesAconpanhamento").attr("readonly", "");
        $("#divAprovacao").css('display', 'none');
        $("#btnBuscaNf").prop('disabled', true);
        $('.cpNumBusca').hide();
        configsSwitcher(params.WKNumState);
    },
    onEdit: function(params) { //Edição do formulário
            var WKNumState = params.WKNumState;
            getParamsURL()
            configsSwitcher(params.WKNumState)

            if ($("#cpStatusNf").val() != "") {
                $("#DivTipoTitulo").removeClass('hide');
                $("#DivTipoTitulo").text($("#cpStatusNf").val());
            }

            if (WKNumState != 0) {
                $("#cpObservacao").attr("readonly", "");
                $("#cpMotivoCanc").attr("readonly", "");
                $(".btnBuscaNf").css('display', 'none');
                $('.cpNumBusca').hide();
            }
            
            if (WKNumState == 108 || WKNumState == 139) {            	
            	
            	$("#cpFilial").removeAttr("readonly");
            	$("#_cpFilial").prop("disabled", false);
            	$("#cpFilial").prop("disabled", false);
            	
            	//window["cpFilial"].disabled(false);
            	//window["cpFilial"].prop("disabled", false);
                $("#cpObservacao").removeAttr("readonly");
                $("#cpMotivoCanc").removeAttr("readonly");
                $(".btnBuscaNf").css('display', 'block');
                $('.cpNumBusca').show();
                FLUIGC.switcher.enable('#swTipoBusca');
            }
            
            if (WKNumState == 57 || WKNumState == 76 || WKNumState == 69) {
                $("#cpObservacao").removeAttr("readonly");
                $("#aprovacao").css('display', 'block');
                $("#aprovacaoFiscal").css('display', 'block');
                $("#consideracoesAconpanhamento").attr("readonly", "");
                $("#divAprovacao").css('display', 'none');
                              
            }
        }
};
function statusTitulo(){
    var selectStatusTitulo = $("#selectStatusTitulo").val();
    console.log(selectStatusTitulo);
    var status = selectStatusTitulo;
    if(status == "aberto"){
        $("#DivTipoTitulo").text("Título em Aberto");
    }else{
        $("#DivTipoTitulo").text($("#cpStatusNf").val());
    }
}
function completaNumNota(str, length) {
    const resto = length - String(str).length;
    return '0'.repeat(resto > 0 ? resto : '0') + str;
}
function setSelectedZoomItem(item) {
    if (item.inputId == 'cpFilial') {
        $("#cpCodFiliais" ).val(item.CODIGO);
        $("#cpDescFiliais").val(item.DESCRICAO + ' - ' + item.CODIGO);
        $('#cpFilial'     ).val(item.FILTRO);

        if(!confirmarFilial(item)) {
            $("#cpFilial").val("");
            $("#cpDescFiliais").val("");
            return false;
        }
    }
}
function validaBrasilia(){
	
	var filial = $("#cpCodFiliais").val();
	var dias = $("#cpDias").val();
	
	if ((filial == "04101" || filial == "04102" || filial == "04901" || filial == "04902" || filial == "04903" 
		|| filial == "04904" || filial == "04905" || filial == "04906" || filial == "04907" || filial == "04908") 
		&& dias > 1){
				
	$("#cpMensagemProtheus").val("Extemporâneo: necessidade de abertura processo administrativo na prefeitura para cancelamento.");
	$("#cpTipoNota").val("Extemporâneo");	
	$("#cpTipoNotaAux").val("1");
		
	}
		
}
function consultaDadosNF(filial, notaFiscal, mensagem, retorno, titulo, statusNF, cliente, loja, serie) {
    var c2 = DatasetFactory.createConstraint('FILIAL', filial, filial, ConstraintType.MUST);
    var c1 = DatasetFactory.createConstraint('NUMERO', notaFiscal, notaFiscal, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('SERIE', serie, serie, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('COD_CLIENTE', cliente, cliente, ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint('LOJA_CLIENTE', loja, loja, ConstraintType.MUST);
    var datasetDs_notasFiscaisSaida = DatasetFactory.getDataset('ds_notasFiscaisSaida', null, new Array(c2, c1, c3, c4, c5), null).values;
    
    if (titulo == "Titulo Baixado" || titulo == "Titulo Baixado Parcialmente") {
        $("#cpStatusNfAux").val('1');
    } else {
        $("#cpStatusNfAux").val('2');
    }

    if (statusNF == "Extemporâneo") {
        $("#cpTipoNotaAux").val("1"); // 1 como original
    } else {
        $("#cpTipoNotaAux").val("2");
    }

    if (mensagem != "Nota/Série informada não localizada.") {
        $("#cpDataEmissao").val(datasetDs_notasFiscaisSaida[0].DT_EMISSAO);
        $("#cpCnpjCliente").val(datasetDs_notasFiscaisSaida[0].CGC);
        $("#cpRazaoSocial").val(datasetDs_notasFiscaisSaida[0].DESC_CLIENTE);
        $("#cpValorNf").val(datasetDs_notasFiscaisSaida[0].VALOR);
        $("#cpNumeroNFEletronica").val(datasetDs_notasFiscaisSaida[0].NF_ELETRONICA);
        $("#cpNumeroNota").val(datasetDs_notasFiscaisSaida[0].NUMERO);
        $("#cpNumeSerie").val(datasetDs_notasFiscaisSaida[0].SERIE);
        $("#cpDias").val(datasetDs_notasFiscaisSaida[0].DIAS);
        $("#DivTipoTitulo").removeClass("hide");
        $("#DivTipoTitulo").text(titulo);
        $("#cpStatusNf").val(titulo);
        $("#cpMensagemProtheus").val(mensagem);
        $("#cpTipoNota").val(statusNF);
        
        validaBrasilia();

    } else {
        limpaCampos();
        mensagemAlert(mensagem, 'Aviso');
    }
}
function limpaCampos() {
    $("#cpDataEmissao").val("");
    $("#cpCnpjCliente").val("");
    $("#cpNumeroNFEletronica").val("");
    $("#cpRazaoSocial").val("");
    $("#cpValorNf").val("");
    $("#cpMotivo").val("");
    $("#DivTipoTitulo").addClass("hide");
    $("#DivTipoTitulo").text("");
    $("#cpTipoNota").val("");
    $("#cpStatusNfAux").val("");
    $("#cpStatusNf").val("");
    $("#cpMensagemProtheus").val("");
    $("#cpNumeroNota").val("");
}
function buscaNfProtheus() {
    var arrayParams = [];
    arrayParams.push(DatasetFactory.createConstraint("FILIAL", $("#cpCodFiliais").val(), $("#cpCodFiliais").val(), ConstraintType.MUST));

    if ($("#cpCodFiliais").val() == "" || $("#cpNumBusca").val() == "") {
        mensagemAlert('O campo de Filial e  Número da Nota devem ser preenchidos.', 'Atenção')
    } else {

        if ($("#tipoBusca").val() == 'titulo') {
            var numBusca = completaNumNota($("#cpNumBusca").val(), 9);
            $("#cpNumBusca").val(numBusca);
            arrayParams.push(DatasetFactory.createConstraint("NUMERO", numBusca, numBusca, ConstraintType.MUST));
        } else {
            arrayParams.push(DatasetFactory.createConstraint("NF_ELETRONICA", $("#cpNumBusca").val(), $("#cpNumBusca").val(), ConstraintType.MUST));
        }

        var ds_nfSaida = DatasetFactory.getDataset("ds_notasFiscaisSaida", null, arrayParams, null).values;

        if ($("#tipoBusca").val() == 'titulo') {
            if (ds_nfSaida[0].NUMERO == "") {
                limpaCampos()
                mensagemAlert('Não foi encontrado o número de título informado.', 'Aviso')
            } else {
                retornaDadosNF(ds_nfSaida[0]);
            }
        } else {
            if (ds_nfSaida[0].NF_ELETRONICA == "") {
                limpaCampos()
                mensagemAlert('Não foi encontrado o número da NF eletrônica informada!', 'Aviso')
            } else {
                retornaDadosNF(ds_nfSaida[0]);
            }
        }
    }
}
function mensagemAlert(mensagem, titulo) {
    FLUIGC.message.alert({
        message: mensagem,
        title: titulo,
        label: 'OK'
    });
}
function retornaDadosNF(ds_nfSaida) {
    var c1 = DatasetFactory.createConstraint('FILIAL', ds_nfSaida.FILIAL, ds_nfSaida.FILIAL, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('NUMERO', ds_nfSaida.NUMERO, ds_nfSaida.NUMERO, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint('SERIE', ds_nfSaida.SERIE, ds_nfSaida.SERIE, ConstraintType.MUST);
    var dadosNf = DatasetFactory.getDataset('ds_dadosNotaFiscal', null, new Array(c1, c2, c3), null).values;
    consultaDadosNF(ds_nfSaida.FILIAL, ds_nfSaida.NUMERO, dadosNf[0].MENSAGEM, dadosNf[0].SUCESSO, dadosNf[0].TITULO, dadosNf[0].TIPO, ds_nfSaida.COD_CLIENTE, ds_nfSaida.LOJA_CLIENTE, ds_nfSaida.SERIE);
 
}
function startBtn(id) {
    if (id == "Aprov") {
        $('#aprovacaoAux').val('sim');
        $('.Aprov').show();
        $('.Reprov').hide();
    } else if (id == "Reprov") {
        $('#aprovacaoAux').val('nao');
        $('.Reprov').show();
        $('.Aprov').hide();
    }
    
    else if (id == "Aprov_fiscal") {
        $('#aprovacaoFiscal').val('sim');
       
    } else if (id == "Reprov_fiscal") {
        $('#aprovacaoFiscal').val('nao');
        
    }
}
function configsSwitcher(atividadeAtual) {
    FLUIGC.switcher.init('#swTipoBusca');
    ($('#tipoBusca').val() == 'titulo') ? FLUIGC.switcher.setTrue('#swTipoBusca'): FLUIGC.switcher.setFalse('#swTipoBusca');
    if (atividadeAtual == 0) {
        FLUIGC.switcher.onChange('#swTipoBusca', function(event, state) {
            (state == true) ? $("#tipoBusca").val('titulo'): $("#tipoBusca").val('Nf_eletronica');
        });
    } else {
        FLUIGC.switcher.disable('#swTipoBusca');
    }
}
function confirmarFilial(qCAMPO){
    // carregar dataset dsFiliaisTasyCancelamento e caso a filial estiver no dataset negar a seleção
    var datasetDsFiliaisTasyCancelamento = DatasetFactory.getDataset('dsFiliaisTasyCancelamento', null, null, null).values;

    // verificar se a filial está no dataset
    var filial = qCAMPO.CODIGO;
    var filialEncontrada = datasetDsFiliaisTasyCancelamento.find(function(item) {
        return item.cdFilial === filial;
    });

    if (filialEncontrada) {
        mensagemAlert('A filial '+ filial + ' não está autorizada para o cancelamento de notas fiscais via Fluig. Esta ação deve ser feita no Tasy.','Atenção');
        $("#cpFilial"     ).val("");
    	$("#cpCodFiliais" ).val("");
        $("#cpDescFiliais").val("");
        return false;
    } else {
        return true;
    }
}
