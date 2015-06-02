/**
 * 
 */
var BlocklyPiPage = function (blocklyWorkspace) {
	
	this._blocklyWorkspace = blocklyWorkspace;
	this._highlightPause = false;
	this._blockEventListeners = {};
	this._blockEventListenerTypes = {};
	
};

/**
 * 
 */
BlocklyPiPage.prototype.executeBlocklyWorkspace = function() {
	
	// Remove all previously registered listeners from an older run.
	this.removeAllEventListeners();
	
	var code = Blockly.JavaScript.workspaceToCode(this._blocklyWorkspace);
	var interpreter = new Interpreter(code, this.initApi.bind(this));
	this.runBlocklyScript(interpreter);
}

/**
 * 
 */
BlocklyPiPage.prototype.debugBlocklyWorkspace = function() {
	
	// Remove all previously registered listeners from an older run.
	this.removeAllEventListeners();
	
	window.LoopTrap = 10000;
	Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
	Blockly.JavaScript.addReservedWords('highlightBlock');
	var code = Blockly.JavaScript.workspaceToCode(this._blocklyWorkspace);
	
	// Debug it ...
	var interpreter = new Interpreter(code, this.initApi.bind(this));
	this.debugBlocklyScript(interpreter);
}

/**
 * 
 */
BlocklyPiPage.prototype.stopBlocklyWorkspace = function() {
	
	// Reset the robot.
	this.resetRobot();
	
	// Remove all previously registered listeners from an older run.
	this.removeAllEventListeners();
	
}


/**
 * 
 * @param code
 */
BlocklyPiPage.prototype.runBlocklyScript = function(interpreter) {
	
	interpreter.run();
}

/**
 * 
 * @param code
 */
BlocklyPiPage.prototype.debugBlocklyScript = function(interpreter) {
	
	// Function to recursively step through the code ...
	var nextStep = function() {
		  if (interpreter.step()) {
		    window.setTimeout(nextStep, 10);
		  }
	};
	
	// Settings to make sure that we can highlight the blocks.
	this._blocklyWorkspace.traceOn(true);
	this._blocklyWorkspace.highlightBlock(null);
	
	// Start recursively stepping ...
	nextStep();
}


/**
 * 
 */
BlocklyPiPage.prototype.initApi = function(interpreter, scope) {

	var self = this;

	// Add an API function for the alert() block.
	var alertWrapper = function(text) {
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(alert(text));
	};
	interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alertWrapper));

	// Add an API function for the prompt() block.
	var promptWrapper = function(text) {
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(prompt(text));
	};
	interpreter.setProperty(scope, 'prompt', interpreter.createNativeFunction(promptWrapper));

	// Add an API function for highlighting blocks.
	var highlightingWrapper = function(id) {
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(self.highlightBlock(id));
	};
	interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(highlightingWrapper));
	
	// Add an API function for adding a key event listener.
	var addKeyEventListenerForBlockWrapper = function(id, type, callbackCode) {
		id = id ? id.toString() : '';
		type = type ? type.toString() : '';
		callbackCode = callbackCode ? callbackCode.toString() : '';
		return interpreter.createPrimitive(self.addKeyEventListenerForBlock(id, type, callbackCode));
	};
	interpreter.setProperty(scope, 'addKeyEventListenerForBlock', interpreter.createNativeFunction(addKeyEventListenerForBlockWrapper));
	
	// Add an API function for setting the power of the robot motors.
	var robotMotorWrapper = function(motor, power) {
		motor = motor ? motor.toString() : '';
		power = power ? power = power : power = 0;
		return interpreter.createPrimitive(self.setRobotMotorTo(motor, power));
	};
	interpreter.setProperty(scope, 'setRobotMotorTo', interpreter.createNativeFunction(robotMotorWrapper));
	
	// Add an API function for resetting the robot.
	var resetRobotWrapper = function() {
		return interpreter.createPrimitive(self.resetRobot());
	};
	interpreter.setProperty(scope, 'resetRobot', interpreter.createNativeFunction(resetRobotWrapper));
	
}

/**
 * 
 * @param id
 */
BlocklyPiPage.prototype.highlightBlock = function(id) {
	this._blocklyWorkspace.highlightBlock(id);
	this._highlightPause = true;
}

BlocklyPiPage.prototype.setRobotMotorTo = function(motor, power) {
		
	$.getJSON("./ScriptExecutor?action=setRobotMotorTo&motor="+motor+"&power="+power, function (data) {
		
	});
}

BlocklyPiPage.prototype.resetRobot = function() {
	
	$.getJSON("./ScriptExecutor?action=resetRobot", function (data) {
		
	});
}


BlocklyPiPage.prototype.addKeyEventListenerForBlock = function(id, type, callbackCode) {
	
	var self = this;
	
	// Register this key event listener
	this._blockEventListenerTypes[id] = type;
	this._blockEventListeners[id] = function(event) {
				
		// Add the event variable as a global variable in the JS interpreter.
		// Therefore we need to add this the API init function.
		var newApitInt = function (interpreter, scope) {
			this.initApi(interpreter, scope);
			interpreter.setProperty(scope, 'keyCode', interpreter.createPrimitive(event.keyCode));
			interpreter.setProperty(scope, 'charCode', interpreter.createPrimitive(event.keyCode));
		}

		// Init a new interpreter for this.
		interpreter = new Interpreter(callbackCode, newApitInt.bind(self));
		self.debugBlocklyScript(interpreter)
		
	}
	
	// Change color of the block to indicate that listener has been set.
	this._blocklyWorkspace.getBlockById(id).setColour(0);
	
	// Add the listener to the window.
	window.addEventListener(type, this._blockEventListeners[id]);
}
/**
 * 
 */
BlocklyPiPage.prototype.removeAllEventListeners = function() {
	// Iterate over all registered event listeners
	for ( var id in this._blockEventListeners) {
		if (this._blockEventListeners.hasOwnProperty(id)) {
			
			// Remove the listener ...
			window.removeEventListener(this._blockEventListenerTypes[id], this._blockEventListeners[id]);
			
			// Clear their references ...
			this._blockEventListeners[id] = undefined;
			this._blockEventListenerTypes[id] = undefined;
			
			// Assign the default color again ...
			try {
				this._blocklyWorkspace.getBlockById(id).setColour(210);
			} catch (e) {
				// Block was probably deleted.
			}
		}
	}
}




window.BlocklyPi = new BlocklyPiPage(window.blocklyWorkspace);