# Dataset: dsFiliaisTasyCancelamento

## 📋 Descrição
Dataset responsável por carregar as filiais disponíveis para cancelamento de notas fiscais no Tasy, integrando com o Protheus.

## 🎯 Funcionalidade Principal
O dataset **filtra automaticamente** as filiais com base na data de GoLive, mostrando apenas aquelas que:
- **GoLive >= Data Atual** (data igual ou superior à data de hoje)

## 🔄 Como Funciona

### 1. Atualização Automática
- ✅ **Não requer intervenção manual**
- ✅ **Funciona para todos os usuários**
- ✅ **Compara automaticamente a data do GoLive com a data atual**

### 2. Lógica de Filtragem
```javascript
Data de hoje: 29/10/2025

Filiais disponíveis:
✅ IHOC (GoLive: 04/11/2025) - APARECE (data futura)
✅ Pro Onco (GoLive: 04/11/2025) - APARECE (data futura)
✅ CPO Paraíba (GoLive: 04/12/2025) - APARECE (data futura)
❌ Hematológica Matriz (GoLive: 02/07/2025) - NÃO APARECE (data passada)
❌ Oncocentro (GoLive: 02/07/2025) - NÃO APARECE (data passada)
```

### 3. Estrutura de Retorno
O dataset retorna 3 colunas:
- **descricao**: Código + Nome completo (ex: "03101 - IHOC (03.850.913/0001-95) - JACKSON RAUPP ROXO")
- **cdFilial**: Código da filial no Protheus (ex: "03101")
- **filial**: Nome da filial com detalhes (ex: "IHOC (03.850.913/0001-95) - JACKSON RAUPP ROXO")

## 📊 Dados de Origem
Os dados são carregados do array `filiaisPlanejamento` que contém:
- Estado
- CNPJ (formatado automaticamente)
- Nome da Unidade
- **GoLive** (data de entrada em produção)
- Status
- Código Estabelecimento Protheus
- Código Estabelecimento Tasy
- Gestor Operacional (GO)

## 🔧 Manutenção

### Para adicionar novas filiais:
Adicione um novo objeto no array `filiaisPlanejamento`:
```javascript
{
    Estado: 'SP', 
    CNPJ: '12345678000199', 
    Unidades: 'Nome da Unidade',
    GoLive: '15/12/2025',  // Formato: DD/MM/YYYY
    Status: 'VERDADEIRO', 
    Cód_Estb_Protheus: '12345', 
    Cód_Estab_Tasy: '123',
    GO: 'NOME DO GESTOR'
}
```

### Para alterar a data de GoLive:
Simplesmente atualize o campo `GoLive` no array `filiaisPlanejamento`.

## ⚠️ Importante
- As datas devem estar no formato **DD/MM/YYYY**
- O sistema compara **apenas a data** (hora é ignorada)
- CNPJs são formatados automaticamente para o padrão: **00.000.000/0000-00**

## 📅 Última Atualização
29/10/2025 - Implementação de filtro automático por data de GoLive
