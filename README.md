# BlocklyPi

By *Iris Roelens* and *Karsten Daemen*.

## What?

This project contains a Java web application that is meant to be deployed on a [Raspberry Pi](https://www.raspberrypi.org/) and will allow users to program it using [Blockly](https://developers.google.com/blockly/). We provide custom blocks for controlling components on the GPIO pins like motors and light sensors.

## Contents

This project contains the content of a "Dynamic Web Project" for eclipse EE. It's meant to be deployed as a webapp on a tomcat (7) server on the Raspberry Pi. This application will serve an HTML Blockly workspace from where you can run/debug/stop blockly programs on the Raspberry Pi.

Together with deploying the webapp, the "robot control" daemon should be started. This is a python program that will control the actual GPIO pins and listens for XML RPC commands from the deployed tomcat webapp on port *8000*. This python program is located at the *"/WebContent/WEB-INF/native/robotController.py"* source tree path and should be started on startup of the Raspberry Pi.
