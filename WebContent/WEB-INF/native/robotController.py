import RPi.GPIO as GPIO
import xmlrpclib
import threading
import sys
from SimpleXMLRPCServer import SimpleXMLRPCServer
from time import sleep

# Set the mode of GPIO.
GPIO.setmode(GPIO.BCM)

# Motor Right
GPIO.setup(17, GPIO.OUT)
GPIO.setup(18, GPIO.OUT)
forwardPowerR = GPIO.PWM(18, 100)
backwardPowerR = GPIO.PWM(17, 100)
forwardPowerR.start(0)
backwardPowerR.start(0)


# Motor Left
GPIO.setup(22, GPIO.OUT)
GPIO.setup(23, GPIO.OUT)
forwardPowerL = GPIO.PWM(23, 100)
backwardPowerL = GPIO.PWM(22, 100)
forwardPowerL.start(0)
backwardPowerL.start(0)

def setRobotMotorPower(motor, power):
    
    # Set the power of left motor.
    if motor == "LEFT":
        if power > 0:
            forwardPowerL.ChangeDutyCycle(power)
            backwardPowerL.ChangeDutyCycle(0)
        elif power == 0:
            forwardPowerL.ChangeDutyCycle(0)
            backwardPowerL.ChangeDutyCycle(0)
        else:
            forwardPowerL.ChangeDutyCycle(0)
            backwardPowerL.ChangeDutyCycle(-power)
        
    elif motor == "RIGHT":
        if power > 0:
            forwardPowerR.ChangeDutyCycle(power)
            backwardPowerR.ChangeDutyCycle(0)
        elif power == 0:
            forwardPowerR.ChangeDutyCycle(0)
            backwardPowerR.ChangeDutyCycle(0)
        else:
            forwardPowerR.ChangeDutyCycle(0)
            backwardPowerR.ChangeDutyCycle(-power)

    return 0;

def listenForCommands():
    # Start the server listening for changes in motor power.
    server = SimpleXMLRPCServer(("localhost", 8000));
    print "Listening on port 8000...";
    server.register_function(setRobotMotorPower, "setRobotMotorPower");
    server.serve_forever();
    
listenForCommands()

