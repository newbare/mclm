Ext.define('MCLM.view.tools.PresentationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.presentationController',

    totalFrames : 0,
    currentFrame : 0,
    frames : [],
    speed : 3500,
    status : 'stopped',
    defaultLayers : null,
    
	first : function() {
		this.currentFrame = 1;
		this.updatePanel();
		this.move();
	},
    
	previous : function() {
		if ( this.currentFrame < 2 ) return true;
		this.currentFrame--;
		this.updatePanel();
		this.move();
	},	
    
	next : function() {
		if ( this.currentFrame == this.totalFrames ) return true;
		this.currentFrame++;
		this.updatePanel();
		this.move();
	},
	
	last : function() {
		this.currentFrame = this.totalFrames;
		this.updatePanel();
		this.move();
	},
	
    record : function() {
    	this.storeFrame();
    },
    
    pause : function() {
		if ( this.status == 'stopped' ) {
	    	var pauseBtn = Ext.getCmp("pauseId");
	    	pauseBtn.toggle(false);
			return true;
		}
    	
    	if ( this.status == 'paused' ) {
    		var playBtn = Ext.getCmp("playId");
        	playBtn.toggle(true);
    		this.status = 'playing';
    	} else 	if ( this.status == 'playing' ) {
    		var playBtn = Ext.getCmp("playId");
        	playBtn.toggle(false);
    		this.status = 'paused';
    	}
    	
    },
    
    stop : function() {
    	if ( !this.runningFunction ) return true;
    	clearInterval( this.runningFunction );
    	this.status = 'stopped';

    	var pauseBtn = Ext.getCmp("pauseId");
    	pauseBtn.toggle(false);
    	
		var playBtn = Ext.getCmp("playId");
    	playBtn.toggle(false); 	
    	
    },
    
    play : function() {

    	if ( this.status == 'playing' ) {
        	var pauseBtn = Ext.getCmp("pauseId");
        	pauseBtn.toggle(true);    		
    		this.status = 'paused';
    		return true;
    	}     	
    	
    	if ( this.status == 'paused' ) {
        	var pauseBtn = Ext.getCmp("pauseId");
        	pauseBtn.toggle(false);    		
    		this.status = 'playing';
    		return true;
    	}     	
    	

    	var me = this;
    	this.status = 'playing';
    	me.walkAhead();
    	this.runningFunction = setInterval( function(){ me.walkAhead(); }, this.speed );
    	
    	var pauseBtn = Ext.getCmp("pauseId");
    	pauseBtn.toggle(false);
    	
    },


	updatePanel : function() {
		$("#presentationPanel").text( this.currentFrame + " / " + this.totalFrames );
	},
	
	flush : function() {
		this.stop();
		MCLM.Map.toDefault();
		this.currentFrame = 0;
		this.totalFrames = 0;
		this.frames = [];
		this.speed = 500;
		this.updatePanel();
		this.defaultLayers = null;
	},
	

	walkAhead : function() {
		console.log( this.status );
		if ( this.status != 'playing' ) return true;
		this.currentFrame++
		if ( this.currentFrame > this.totalFrames ) {
			this.currentFrame = 1;
		}  
		this.move();
	},
	
	
	move : function() {
		var frame = this.frames[ this.currentFrame ];
		
		
		
		if ( frame ) {
			MCLM.Map.theView.animate({
				  zoom		: frame.zoom,
				  center	: frame.center,
				  duration	: 2000,
			});
			
			/*
			frame.activeLayers.forEach( function ( layerRef ) {
				var referenceLayerAlias = layerRef.get('name');
				
				MCLM.Map.getLayers().forEach( function ( layer ) {
					if( layer.get('name') == referenceLayerAlias ) {
						console.log( referenceLayerAlias + " : VISIBLE");
						layer.setVisible(true);
					} else {
						console.log( referenceLayerAlias + " : NOT");
						layer.setVisible(false);
					}
				});	
				
				
			});	
			*/
		}
		this.updatePanel();
		
		
	},
	
	storeFrame : function( center, zoom ) {
		var center = MCLM.Map.map.getView().getCenter();
		var mapZoom = MCLM.Map.map.getView().getZoom();
		
		if ( this.totalFrames == 0 ) {
			this.defaultLayers = MCLM.Map.getLayers();
		}
		
		this.totalFrames++;
		this.currentFrame++;
		
		var frame = {};
		frame.center = center;
		frame.zoom = mapZoom;
		frame.activeLayers = MCLM.Map.getLayers();
		
		frame.activeLayers.forEach( function ( layer ) {
			console.log( layer.get("alias") );
		});		
		
		
		this.frames[ this.currentFrame ] = frame;
		this.updatePanel();
	},
	
	
    
});