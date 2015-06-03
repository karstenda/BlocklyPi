Blockly.Blocks['robot_motor_power'] = {
	init : function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendValueInput("POWER").setCheck("Number").appendField(
				new Blockly.FieldDropdown([
						[ "Set the power of the left motor to", "LEFT" ],
						[ "Set the power of the right motor to", "RIGHT" ] ]),
				"MOTOR");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};

Blockly.Blocks['robot_reset'] = {
	init : function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput().appendField("Reset Robot");
		this.setNextStatement(true);
		this.setTooltip('');
	}
};

Blockly.Blocks['control_key_down'] = {
	init : function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(210);
		this.appendDummyInput().appendField(
				new Blockly.FieldDropdown([ [ "On ↓ key down", "DOWN" ],
						[ "On ↑ key down", "UP" ], [ "On ← key down", "LEFT" ],
						[ "On → key down", "RIGHT" ] ]), "KEY");
		this.appendStatementInput("STATEMENTS");
		this.setTooltip('');
	}
};