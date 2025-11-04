function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("descricao"); // Código + Nome completo
    dataset.addColumn("cdFilial");  // Código da filial
    dataset.addColumn("filial");    // Nome da filial

    var filiais = getFiliais();
    for (var i = 0; i < filiais.length; i++) {
        dataset.addRow(new Array(
            filiais[i].value + ' - ' + filiais[i].label, 
            filiais[i].value, 
            filiais[i].label
        ));
    }
    return dataset;
}
function getFiliais(){
    // Obter data atual
    var dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0); // Zerar hora para comparação apenas de data
    
    var filiaisMigradas = [];
    
    // Percorrer filiaisPlanejamento e adicionar apenas filiais com GoLive >= data atual
    for (var i = 0; i < filiaisPlanejamento.length; i++) {
        var filial = filiaisPlanejamento[i];
        
        // Converter data do GoLive (formato DD/MM/YYYY) para objeto Date
        var partesData = filial.GoLive.split('/');
        var dataGoLive = new Date(partesData[2], partesData[1] - 1, partesData[0]);
        dataGoLive.setHours(0, 0, 0, 0);
        
        // Verificar se GoLive é maior ou igual à data atual
        if (dataGoLive >= dataAtual) {
            // Adicionar filial ao array
            filiaisMigradas.push({
                'value': filial.Cód_Estb_Protheus,
                'label': filial.Estado + ' - ' + filial.Unidades
            });
        }
    }
    
    return filiaisMigradas;
}

// Estado	CNPJ	Unidades	Go Live	Status	Cód. Estb. Protheus	Cód. Estab. Tasy	G.O.
var filiaisPlanejamento = 
[
    {Estado:'MG', CNPJ:'00410960000120', Unidades:'Hematológica Matriz',            GoLive:'02/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'02701', Cód_Estab_Tasy:'19',   GO:'LEONARA FROES DE ALMEIDA'},
    {Estado:'MG', CNPJ:'00410960000120', Unidades:'Ágio Hematológica Matriz',       GoLive:'02/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00143', Cód_Estab_Tasy:'261',  GO:'LEONARA FROES DE ALMEIDA'},
    {Estado:'MG', CNPJ:'12104241000593', Unidades:'Oncocentro',                     GoLive:'02/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00105', Cód_Estab_Tasy:'31',   GO:'ANNA VERANO NOGUEIRA'},
    {Estado:'MG', CNPJ:'12104241004742', Unidades:'Ágio Oc Contagem',               GoLive:'03/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00144', Cód_Estab_Tasy:'259',  GO:'CLAYNNER PACCELY OLIVEIRA BESSA'},
    {Estado:'MG', CNPJ:'02623693000102', Unidades:'Oc Contagem',                    GoLive:'03/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'05401', Cód_Estab_Tasy:'225',  GO:'CLAYNNER PACCELY OLIVEIRA BESSA'},
    {Estado:'RJ', CNPJ:'12104241001565', Unidades:'Ceon',                           GoLive:'04/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00110', Cód_Estab_Tasy:'36',   GO:'MARIANA GRACA LEAL'},
    {Estado:'RJ', CNPJ:'12104241001484', Unidades:'Ágio Oc Barra',                  GoLive:'04/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00108', Cód_Estab_Tasy:'144',  GO:'MARIANA GRACA LEAL'},
    {Estado:'RJ', CNPJ:'12104241001212', Unidades:'Ágio Oc Ipanema',                GoLive:'07/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00107', Cód_Estab_Tasy:'143',  GO:'MARIANA GRACA LEAL'},
    {Estado:'RJ', CNPJ:'72101124000336', Unidades:'Oc Barra II',                    GoLive:'08/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00602', Cód_Estab_Tasy:'39',   GO:'MARIANA GRACA LEAL'},
    {Estado:'RJ', CNPJ:'00717088000167', Unidades:'Oc Botafogo(Goc)',               GoLive:'08/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'04801', Cód_Estab_Tasy:'42',   GO:'MARIANA RIBEIRO MILAGRES FONTOURA'},
    {Estado:'RJ', CNPJ:'33495365000193', Unidades:'Oc Niterói',                     GoLive:'09/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'05701', Cód_Estab_Tasy:'78',   GO:'FLAVIA CRISTINA DE SOUZA RAMOS'},
    {Estado:'RS', CNPJ:'21875615000212', Unidades:'Ágio Oc Rs Moinhos De Vento',    GoLive:'09/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'03902', Cód_Estab_Tasy:'229',  GO:'VANESSA PATZLAFF BRANDOLF'},
    {Estado:'RS', CNPJ:'95179461000422', Unidades:'Oc Rs Moinhos De Vento',         GoLive:'09/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'01702', Cód_Estab_Tasy:'18',   GO:'VANESSA PATZLAFF BRANDOLF'},
    {Estado:'RS', CNPJ:'94831294000147', Unidades:'Kaplan Matriz',                  GoLive:'10/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'09101', Cód_Estab_Tasy:'202',  GO:'VANESSA PATZLAFF BRANDOLF'},
    {Estado:'RS', CNPJ:'94831294000228', Unidades:'Kaplan Vitta Radioterapia',      GoLive:'10/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'09102', Cód_Estab_Tasy:'205',  GO:'VANESSA PATZLAFF BRANDOLF'},
    {Estado:'RS', CNPJ:'08968057000190', Unidades:'Oc Rs Canoas',                   GoLive:'11/07/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'02501', Cód_Estab_Tasy:'29',   GO:'VANESSA PATZLAFF BRANDOLF'},
    {Estado:'GO', CNPJ:'00754174000140', Unidades:'Cebrom Universitário',           GoLive:'06/10/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'07101', Cód_Estab_Tasy:'238',  GO:'KEILA CRISTINE MIRANDA MENDES'},
    {Estado:'GO', CNPJ:'11426304000131', Unidades:'Cebrom Bueno',                   GoLive:'06/10/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'07201', Cód_Estab_Tasy:'233',  GO:'KEILA CRISTINE MIRANDA MENDES'},

    {Estado:'PR', CNPJ:'03850913000195', Unidades:'IHOC',                           GoLive:'04/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'03101', Cód_Estab_Tasy:'46',   GO:'JACKSON RAUPP ROXO'},
    {Estado:'PR', CNPJ:'73863342000109', Unidades:'Pro Onco',                       GoLive:'04/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'05501', Cód_Estab_Tasy:'76',   GO:'PATRICIA CHRISTOVAO VIDOTTO'},
    {Estado:'SP', CNPJ:'57723280000183', Unidades:'Inorp Matriz Ribeirão Preto',    GoLive:'06/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'03001', Cód_Estab_Tasy:'47',   GO:'CORALINA SANTANNA'},
    {Estado:'SP', CNPJ:'09127332000106', Unidades:'Innomed',                        GoLive:'06/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'15501', Cód_Estab_Tasy:'257',  GO:'CARLA LIBRALLI TOSTES DOS SANTOS'},
    {Estado:'SP', CNPJ:'09127332000297', Unidades:'Oc Paulista (Medical Augusta)',  GoLive:'06/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'15502', Cód_Estab_Tasy:'271',  GO:'CAMILA PELLEGRINI'},
    {Estado:'SP', CNPJ:'52164662001334', Unidades:'Salto Itu',                      GoLive:'06/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'01012', Cód_Estab_Tasy:'264',  GO:'CAMILA PELLEGRINI'},
    {Estado:'SP', CNPJ:'52164662000109', Unidades:'CPO SP Faria Lima',              GoLive:'13/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'01001', Cód_Estab_Tasy:'04',   GO:'CARLA LIBRALLI TOSTES DOS SANTOS'},
    {Estado:'SP', CNPJ:'52164662001172', Unidades:'CPO SP Filial Zona Leste',       GoLive:'13/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'01010', Cód_Estab_Tasy:'193',  GO:'CAMILA PELLEGRINI'},
    {Estado:'SP', CNPJ:'52164662001091', Unidades:'CPO SP Filial Abc Santo André',  GoLive:'13/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'01009', Cód_Estab_Tasy:'192',  GO:'KENNE ROGER AVELINO DE MOURA'},
    {Estado:'SP', CNPJ:'52164662001253', Unidades:'CPO SP Filial Zona Oeste',       GoLive:'13/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'01011', Cód_Estab_Tasy:'236',  GO:'KENNE ROGER AVELINO DE MOURA'},
    {Estado:'DF', CNPJ:'00520237000101', Unidades:'Cettro Asa Norte',               GoLive:'19/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'09001', Cód_Estab_Tasy:'141',  GO:'KENNE ROGER AVELINO DE MOURA'},
    {Estado:'DF', CNPJ:'12104241001646', Unidades:'Ágio Cettro Asa Norte',          GoLive:'19/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00114', Cód_Estab_Tasy:'195',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'00520237000608', Unidades:'Cettro Asa Sul',                 GoLive:'19/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'09004', Cód_Estab_Tasy:'152',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'12104241004408', Unidades:'Ágio Cettro Asa Sul',            GoLive:'19/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00141', Cód_Estab_Tasy:'196',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'00520237000870', Unidades:'Cettro Vitta Radioterapia',      GoLive:'19/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'09006', Cód_Estab_Tasy:'157',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'12104241004319', Unidades:'Ágio Cettro Vitta Radioterapia', GoLive:'19/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00140', Cód_Estab_Tasy:'198',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'01682668000129', Unidades:'Oncovida Brasilia',              GoLive:'19/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'04101', Cód_Estab_Tasy:'21',   GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'11859927000874', Unidades:'Icb Advance',                    GoLive:'25/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'08607', Cód_Estab_Tasy:'148',  GO:'GABRIEL LEANDRO OKUMA'},
    {Estado:'DF', CNPJ:'12104241003509', Unidades:'Ágio Icb Advance',               GoLive:'25/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00133', Cód_Estab_Tasy:'180',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'11859927000793', Unidades:'Icb Biosphere',                  GoLive:'25/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'08606', Cód_Estab_Tasy:'145',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'12104241003428', Unidades:'Ágio Icb Biophere',              GoLive:'25/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00132', Cód_Estab_Tasy:'177',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'11859927000955', Unidades:'Icb Osm',                        GoLive:'25/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'08608', Cód_Estab_Tasy:'146',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'12104241004076', Unidades:'Ágio Icb Osm',                   GoLive:'25/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00138', Cód_Estab_Tasy:'178',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'11859927000106', Unidades:'Icb Pátio Capital',              GoLive:'25/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'08601', Cód_Estab_Tasy:'142',  GO:'SHEILA GOMES LEAL EUGENIO'},
    {Estado:'DF', CNPJ:'12104241003266', Unidades:'Ágio Icb Pátio Capital',         GoLive:'25/11/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'00130', Cód_Estab_Tasy:'176',  GO:'WILLKELINY PINTO PEREIRA SOARES'},

    {Estado:'GO', CNPJ:'00754174000301', Unidades:'Cebrom Anápolis Quimioterapia',  GoLive:'02/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'07103', Cód_Estab_Tasy:'248',  GO:'WILLKELINY PINTO PEREIRA SOARES'},
    {Estado:'GO', CNPJ:'23264130000137', Unidades:'Cebrom Anápolis - Radioterapia', GoLive:'02/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'08101', Cód_Estab_Tasy:'234',  GO:'KEILA CRISTINE MIRANDA MENDES'},
    {Estado:'BA', CNPJ:'41980319000370', Unidades:'Nob Lauro De Freitas',           GoLive:'02/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'01502', Cód_Estab_Tasy:'57',   GO:'KEILA CRISTINE MIRANDA MENDES'},
    {Estado:'BA', CNPJ:'41980319000108', Unidades:'Nob Ondina',                     GoLive:'02/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'01501', Cód_Estab_Tasy:'56',   GO:'GILMARA RODRIGUES DE SOUZA'},
    {Estado:'BA', CNPJ:'13501218000171', Unidades:'Clion',                          GoLive:'02/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'07701', Cód_Estab_Tasy:'209',  GO:'GILMARA RODRIGUES DE SOUZA'},
    {Estado:'BA', CNPJ:'41980319001341', Unidades:'Ágio Clion',                     GoLive:'02/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'01507', Cód_Estab_Tasy:'268',  GO:'GILMARA RODRIGUES DE SOUZA'},
    {Estado:'RS', CNPJ:'45595483000152', Unidades:'Kaplan Uruguaiana Matriz',       GoLive:'04/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'16101', Cód_Estab_Tasy:'228',  GO:'GILMARA RODRIGUES DE SOUZA'},
    {Estado:'PB', CNPJ:'26645426000358', Unidades:'Ágio CPO Paraiba',               GoLive:'04/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'02903', Cód_Estab_Tasy:'201',  GO:'VANESSA PATZLAFF BRANDOLF'},
    {Estado:'PB', CNPJ:'07510778000190', Unidades:'CPO Paraíba',                    GoLive:'04/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'02101', Cód_Estab_Tasy:'51',   GO:'EMANUELA LOURENCO DE OLIVEIRA'},
    {Estado:'MG', CNPJ:'01067064000172', Unidades:'Hospital Vila da Serra',         GoLive:'04/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'06601', Cód_Estab_Tasy:'164',  GO:'EMANUELA LOURENCO DE OLIVEIRA'},
    {Estado:'MG', CNPJ:'26645426000196', Unidades:'Oncobio',                        GoLive:'04/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'02901', Cód_Estab_Tasy:'14',   GO:'VANESSA DE BRITO MEDEIROS'},
    {Estado:'SC', CNPJ:'37184687000172', Unidades:'Unimed Grande Florianópolis',    GoLive:'04/12/2025', Status:'VERDADEIRO', Cód_Estb_Protheus:'06801', Cód_Estab_Tasy:'81',   GO:'VANESSA DE BRITO MEDEIROS'
    }
];
