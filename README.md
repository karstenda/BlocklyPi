# BlocklyPi

By *Iris Roelens* and *Karsten Daemen*.

## What?

This project contains a web application that is meant to be deployed on a [Raspberry Pi](https://www.raspberrypi.org/) and will allow users to program it using [Blockly](https://developers.google.com/blockly/). We provide custom blocks for controlling components on the GPIO pins like motors and light sensors.

## Contents

This project contains a python web server that will serve an HTML Blockly workspace from where you can run/debug/stop blockly programs on the Raspberry Pi.

## Install
### Step 1: Install dependencies
This is a pure python program that only depends on the [RPi.GPIO](https://pypi.python.org/pypi/RPi.GPIO) library (0.5.11). You therefore need to install this on your raspberry Pi. You can either do this through the repository (debian):
```
sudo apt-get update
sudo apt-get install rpi.gpio
```
Or manually from the package:
```
wget https://pypi.python.org/packages/source/R/RPi.GPIO/RPi.GPIO-0.5.11.tar.gz
tar -xvf RPi.GPIO-0.5.11.tar.gz
cd RPi.GPIO-0.5.11
sudo python setup.py install
cd ..
sudo rm -rf RPi.GPIO-0.*
```
### Step 2: Download and Install BlocklyPi
On your Raspberry Pi, navigate to the desired directory where you want to install BlocklyPi (in our case *\home\pi\bin*).
```
mkdir \home\pi\bin
cd \home\pi\bin
```
Download the BlocklyPi project.
```
git clone https://github.com/karstenda/BlocklyPi.git
cd BlocklyPi
```
Start the server, you need super user privileges in order to acces the GPIO pins ...
```
sudo python server.py
```
