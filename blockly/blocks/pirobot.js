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

Blockly.Blocks['control_key_down'] = {
	init : function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(210);
		this.appendDummyInput().appendField(new Blockly.FieldDropdown([
                        [ "On ↓ key", "DOWN" ],	[ "On ↑ key", "UP" ], 
                        [ "On ← key", "LEFT" ],	[ "On → key", "RIGHT" ] ]), "KEY")
            .appendField(new Blockly.FieldDropdown([ [ "up", "UP" ], [ "down", "DOWN" ] ]), "TYPE");
        
		this.appendStatementInput("STATEMENTS");
		this.setTooltip('');
	}
};