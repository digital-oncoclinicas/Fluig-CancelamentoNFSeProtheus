function displayFields(form, customHTML) {
    ARYForms(form, customHTML);

    var atividade = getValue('WKNumState');
    
    form.setValue("atividadeAtual", atividade);

    form.setValue("cpNumeroSolicitacao", getValue("WKNumProces"));

    // solicitante

    if(atividade == INICIO || atividade == 0){

        if (form.getValue("nomeSolicitante") == "") {
            var user = getUser(getValue("WKUser"));

            form.setValue("txtUsuarioRM", getValue("WKUser"));
            form.setValue("nomeSolicitante", user.colleagueName);
            form.setValue("emailSolicitante", user.mail);
            form.setValue("idSolicitante", getValue("WKUser"));

        }

        if (form.getValue("dataSolicitacao") == "") {
            var fullDate = new Date();
            var date = fullDate.getDate().toString();

            if (date.length == 1) {
                date = 0 + date;
            }
            var mes = (fullDate.getMonth() + 1).toString();

            if (mes.length == 1) {
                mes = 0 + mes;
            }

            var data = date + "/" + mes + "/" + fullDate.getFullYear();
            form.setValue("dataSolicitacao", data);
        }

        customHTML.append('<script> $("#selectStatusTitulo").parent().hide()</script>');
        customHTML.append('<script> $("#selectTipoCancelamento").parent().hide()</script>');

    }else{
        form.setEnabled('cpFilial', false);
    }

    if(atividade == APROVAR_CANCELAMENTO){

        var user = getUser(getValue('WKUser'));
        var fullDate = new Date();
        var date = fullDate.getDate().toString();
        if (date.length == 1) {
            date = 0 + date;
        }
        var mes = (fullDate.getMonth() + 1).toString();

        if (mes.length == 1) {
            mes = 0 + mes;
        }

        var data = fullDate.getFullYear() + '-' + mes + '-' + date;
        form.setValue("dataAprov", data);
        form.setValue("responsavelAprov", user.colleagueName);

        customHTML.append('<script> $("#aprovacao").show()</script>');
        customHTML.append('<script> $("#selectStatusTitulo").parent().hide()</script>');
        customHTML.append('<script> $("#selectTipoCancelamento").parent().hide()</script>');
                
    }
    
    if(atividade == REALIZAR_VALIDACAO_NF){

        var user = getUser(getValue('WKUser'));
        var fullDate = new Date();
        var date = fullDate.getDate().toString();
        if (date.length == 1) {
            date = 0 + date;
        }
        var mes = (fullDate.getMonth() + 1).toString();

        if (mes.length == 1) {
            mes = 0 + mes;
        }

        var data = fullDate.getFullYear() + '-' + mes + '-' + date;
        form.setValue("dataAprov_fiscal", data);
        form.setValue("responsavelAprov_fiscal", user.colleagueName);

        customHTML.append('<script> $("#aprovacao_fiscal").show()</script>');
        customHTML.append('<script> $("#selectStatusTitulo").parent().hide()</script>');
        customHTML.append('<script> $("#selectTipoCancelamento").parent().hide()</script>');
    }

    if(atividade == FISCAL){

        var user = getUser(getValue('WKUser'));
        var fullDate = new Date();
        var date = fullDate.getDate().toString();
        if (date.length == 1) {
            date = 0 + date;
        }
        var mes = (fullDate.getMonth() + 1).toString();

        if (mes.length == 1) {
            mes = 0 + mes;
        }

        var data = fullDate.getFullYear() + '-' + mes + '-' + date;
        form.setValue("dataAprov_fiscal2", data);
        form.setValue("responsavelAprov_fiscal2", user.colleagueName);

        customHTML.append('<script> $("#aprovacao_fiscal2").show()</script>');
    }

    if(atividade == PROCEDIMENTO_CANCELAMENTO){
        log.info("PROCEDIMENTO CANCELAMENTO OU CORREÇÃO");
        var obsFiscal = form.getValue("consideracoes_fiscal2");
        log.info("observação fiscal: "+obsFiscal);
        if(obsFiscal != "") customHTML.append('<script> $("#aprovacao_fiscal2").show() </script>');
    }

    if(atividade == CORRECAO){
        customHTML.append('<script> $("#selectStatusTitulo").parent().hide() </script>');
        customHTML.append('<script> $("#selectTipoCancelamento").parent().hide() </script>');
        customHTML.append('<script> $("#aprovacao_fiscal").show() </script>');
    }
    
    if(atividade == CORRECAO_2){
        customHTML.append('<script> $("#selectStatusTitulo").parent().hide() </script>');
        customHTML.append('<script> $("#selectTipoCancelamento").parent().hide() </script>');
        customHTML.append('<script> $("#aprovacao_fiscal2").show() </script>');
    }
    
    if(atividade == ESTORNO_BAIXA){
        customHTML.append('<script> $("#selectTipoCancelamento").parent().hide() </script>');
    }
}

function getUser(colleagueId) {
    var cons = [
        DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST)
    ];
    var dataset = DatasetFactory.getDataset("colleague", null, cons, null);
    var user = {};

    if (dataset.rowsCount > 0) {
        for (var i = 0; i < dataset.getColumnsName().length; i++) {
            var col = dataset.getColumnsName()[i];
            user[col] = dataset.getValue(0, col);
        }
    }

    return user;
}

function ARYForms(form, customHTML) {
    customHTML.append("<script type='text/javascript'>");
    customHTML.append("if (ARYForms && ARYForms.initForm) {");
    customHTML.append("ARYForms.initForm({");
    customHTML.append(" formMode:'" + form.getFormMode() + "',");
    customHTML.append(" WKCompany:'" + getValue("WKCompany") + "',");
    customHTML.append(" WKNumState:'" + getValue("WKNumState") + "',");
    customHTML.append(" WKNumProces:'" + getValue("WKNumProces") + "',");
    customHTML.append(" WKCurrentState:'" + getValue("WKCurrentState") + "',");
    customHTML.append(" WKUser:'" + getValue("WKUser") + "',");
    customHTML.append(" isMobile: " + (form.getMobile() != null && form.getMobile()) + ",");
    customHTML.append("});");
    customHTML.append("}</script>");
}