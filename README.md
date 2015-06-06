# BlocklyPi

By *Iris Roelens* and *Karsten Daemen*.


This project contains a python application that is meant to be deployed on a [Raspberry Pi](https://www.raspberrypi.org/) and will allow users to program it using [Blockly](https://developers.google.com/blockly/). We provide custom blocks for controlling components on the GPIO pins like motors and light sensors.

## Installation

### Step 1: Install dependencies
BlocklyPi only depends on the python [RPi.GPIO](https://pypi.python.org/pypi/RPi.GPIO) library (0.5.11). You therefore need to install this on your raspberry Pi. You can either do this through the repository (debian):
```shell
sudo apt-get update
sudo apt-get install rpi.gpio
```
Or manually from the package:
```shell
wget https://pypi.python.org/packages/source/R/RPi.GPIO/RPi.GPIO-0.5.11.tar.gz
tar -xvf RPi.GPIO-0.5.11.tar.gz
cd RPi.GPIO-0.5.11
sudo python setup.py install
cd ..
sudo rm -rf RPi.GPIO-0.*
```

### Step 2: Download and Install BlocklyPi
On your Raspberry Pi, navigate to the desired directory where you want to install BlocklyPi (in our case *\home\pi\bin*).
```shell
mkdir \home\pi\bin
cd \home\pi\bin
```
Download the BlocklyPi project.
```shell
git clone https://github.com/karstenda/BlocklyPi.git
cd BlocklyPi
```
Start the server, you need super user privileges in order to acces the GPIO pins ...
```shell
sudo python server.py
```
On your raspberry, navigate to *http://localhost:8080* in order to verify that the installation was succesfull.

### Step 3: Start server on boot
You may want to start BlocklyPi on startup of your RaspberryPi. To do this you need to edit */etc/rc.local* file. A At the bottom of this file, you'll find the line `exit 0`, write before this:
```shell
# Starting the BlocklyPi server from it's installation directory.
cd /home/pi/bin/BlocklyPi
python ./server.py
```
