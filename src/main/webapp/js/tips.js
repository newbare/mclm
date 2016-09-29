function initTips() {
	
    Ext.tip.QuickTipManager.init();

    Ext.tip.QuickTipManager.register({
      target: 'id111',
      title: 'My Tooltip',
      text: 'This tooltip was added in code',
      width: 100,
      dismissDelay: 5000 // Hide after 10 seconds hover
    });	
	
}