/*
 * Configura e inicializa as dicas dos botoes.
 * o atributo "target" da dica deve ser o mesmo do atributo "id" do botao.
 * Os botoes estao no arquivo "buttons.js"
 * 
 */

function initTips() {
	
    Ext.tip.QuickTipManager.init();

    Ext.tip.QuickTipManager.register({
      target: 'id111',
      title: 'Configurações',
      text: 'Configura aspectos gerais do sistema.',
      width: 150,
      dismissDelay: 5000 
    });	
	
}