import RPi.GPIO as GPIO

# GPIO PIN Configuration
RIGHT_MOTOR_FORWARD_GPIO_PIN = 18
RIGHT_MOTOR_BACKWARD_GPIO_PIN = 17
LEFT_MOTOR_FORWARD_GPIO_PIN = 23
LEFT_MOTOR_BACKWARD_GPIO_PIN = 22

# Global variables
FORWARD_POWER_RIGHT = None;
BACKWARD_POWER_RIGHT = None;
FORWARD_POWER_LEFT = None;
BACKWARD_POWER_LEFT = None;


def init():
    """ Initiate and configure the variables needed for the 'setRobotMotorPower' command."""
    
    # This function will assign the following global variables:
    global FORWARD_POWER_RIGHT
    global BACKWARD_POWER_RIGHT
    global FORWARD_POWER_LEFT
    global BACKWARD_POWER_LEFT
    
    # Motor Right
    GPIO.setup(17, GPIO.OUT)
    GPIO.setup(18, GPIO.OUT)
    FORWARD_POWER_RIGHT = GPIO.PWM(18, 100)
    BACKWARD_POWER_RIGHT = GPIO.PWM(17, 100)
    FORWARD_POWER_RIGHT.start(0)
    BACKWARD_POWER_RIGHT.start(0)

    # Motor Left
    GPIO.setup(22, GPIO.OUT)
    GPIO.setup(23, GPIO.OUT)
    FORWARD_POWER_LEFT = GPIO.PWM(23, 100)
    BACKWARD_POWER_LEFT = GPIO.PWM(22, 100)
    FORWARD_POWER_LEFT.start(0)
    BACKWARD_POWER_LEFT.start(0)


def set(motor, power):
    """ Execute the 'setRobotMotorPower' command. """
    
    # Set the power of left motor.
    if motor == "LEFT":
        if power > 0:
            FORWARD_POWER_LEFT.ChangeDutyCycle(power)
            BACKWARD_POWER_LEFT.ChangeDutyCycle(0)
        elif power == 0:
            FORWARD_POWER_LEFT.ChangeDutyCycle(0)
            BACKWARD_POWER_LEFT.ChangeDutyCycle(0)
        else:
            FORWARD_POWER_LEFT.ChangeDutyCycle(0)
            BACKWARD_POWER_LEFT.ChangeDutyCycle(-power)
        
    elif motor == "RIGHT":
        if power > 0:
            FORWARD_POWER_RIGHT.ChangeDutyCycle(power)
            BACKWARD_POWER_RIGHT.ChangeDutyCycle(0)
        elif power == 0:
            FORWARD_POWER_RIGHT.ChangeDutyCycle(0)
            BACKWARD_POWER_RIGHT.ChangeDutyCycle(0)
        else:
            FORWARD_POWER_RIGHT.ChangeDutyCycle(0)
            BACKWARD_POWER_RIGHT.ChangeDutyCycle(-power)

    return 0;