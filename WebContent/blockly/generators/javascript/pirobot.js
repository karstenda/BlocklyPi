Blockly.JavaScript['robot_motor_power'] = function(block) {
	var value_power = Blockly.JavaScript.valueToCode(block, 'POWER',
			Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_motor = block.getFieldValue('MOTOR');
	// TODO: Assemble JavaScript into code variable.
	var code = 'setRobotMotorTo("' + dropdown_motor + '",' + value_power + ');';
	return code;
};

Blockly.JavaScript['robot_reset'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = 'resetRobot();';
	return code;
};

Blockly.JavaScript['control_key_down'] = function(block) {
	var statements_statements = Blockly.JavaScript.statementToCode(block,
			'STATEMENTS');
	var dropdown_key = block.getFieldValue('KEY');
	
	// Determine the key code to listen for.
	var keyCode = 0;
	if (dropdown_key === 'UP') {
		keyCode = 38;
	} else if (dropdown_key === 'DOWN') {
		keyCode = 40;
	} else if (dropdown_key === 'RIGHT') {
		keyCode = 39;
	} else if (dropdown_key === 'LEFT') {
		keyCode = 37;
	} else {
		return '';
	}
	
	var callbackCode = 'var code = keyCode; if (charCode && code == 0) {code = charCode;}; if (code ==='+keyCode+') {'+statements_statements+'}';
	callbackCode = callbackCode.replace(/\n/g,"\\n");
	callbackCode = callbackCode.replace(/["]+/g,"\\\"");
	
	// Assemble JavaScript into code variable.
	var code = 'window.addKeyEventListenerForBlock("'+block.id+'","keydown", "'+callbackCode+'");';
	return code;
};