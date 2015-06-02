package raspberry.pi.blockly;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;
import java.util.logging.Level;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.xmlrpc.XmlRpcException;
import org.apache.xmlrpc.client.XmlRpcClient;
import org.apache.xmlrpc.client.XmlRpcClientConfigImpl;
import org.json.JSONException;
import org.json.JSONObject;

import com.sun.istack.internal.logging.Logger;

/**
 * Servlet implementation class ScriptExecutor
 */
@WebServlet("/ScriptExecutor")
public class ScriptExecutor extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * Through this XmlRpcClient we connect to the python script that controls the robot.
	 */
	private static XmlRpcClient client;

	/**
	 * Init the XmlRpcClient.
	 */
	static {
		try {
	    	XmlRpcClientConfigImpl config = new XmlRpcClientConfigImpl();
			config.setServerURL(new URL("http://localhost:8000"));
			client = new XmlRpcClient();
			client.setConfig(config);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
	}
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ScriptExecutor() {
        super();
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doIt(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doIt(request, response);
	}

	protected void doIt(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			
			
			
			// Extract the desired action.
			String action = request.getParameter("action");
			
			Logger.getLogger(ScriptExecutor.class).log(Level.INFO, "Requested action: "+action);
			
			// Process the action ...
			if (action == null) {
				
				// error out ...
				returnError(1,"No action parameter specified.", response);
				return;
				
			} else if (action.equalsIgnoreCase("setRobotMotorTo")) {
			
				// Extract the variables ...
				String motorString = request.getParameter("motor");
				String powerString = request.getParameter("power");
				
				// Check if parameters were passed.
				if (motorString == null || powerString == null) {
					returnError(1,"No motor or power parameter specified.", response);
					return;
				}
				
				// Check if we can parse the paramets.
				int power = 0;
				try {
					power = Integer.parseInt(powerString);
				} catch (NumberFormatException e) {
					returnError(2, "The power parameter has to be an integer", response);
					return;
				}
				
				// Check if power is in the right range.
				if (power > 100 || power < -100) {
					returnError(2, "The power parameter exceeds to [-100, 100] interval.", response);
					return;
				}
				
				// Check if power is in the right range.
				String motor = motorString.toUpperCase();
				if (!motor.equals("LEFT") && !motor.equals("RIGHT")) {
					returnError(2, "The motor parameter should be either LEFT or RIGHT.", response);
					return;
				}
				
				// Execute the change in motor power.
				try {
					setRobotMoterPower(motor,power);
				} catch (XmlRpcException e) {
					returnError(3, "Could not connect to robot controller.", response);
					return;
				}
				
			} else if (action.equalsIgnoreCase("resetRobot")) {
				
				Logger.getLogger(ScriptExecutor.class).log(Level.INFO, "Resetting the robot ...");
				
				// Set the speeds at zero.
				try {
					setRobotMoterPower("LEFT", 0);
					setRobotMoterPower("RIGHT", 0);
				} catch (XmlRpcException e) {
					returnError(3, "Could not connect to robot controller.", response);
					return;
				}
				
				Logger.getLogger(ScriptExecutor.class).log(Level.INFO, "Robot is reset ...");
				
			}
			
		} catch (JSONException e) {
			
		}

	}
	
	/**
	 * 
	 * @param code
	 * @param message
	 * @param response
	 * @throws JSONException
	 * @throws IOException
	 */
	public void returnError(int code, String message, HttpServletResponse response) throws JSONException, IOException {
		
		JSONObject responseJSON = new JSONObject();
		responseJSON.put("code", 1);
		responseJSON.put("message", message);
		response.getOutputStream().print(responseJSON.toString());
		return;
		
	}
	
	public void setRobotMoterPower(String motor, int power) throws XmlRpcException {
    
		Logger.getLogger(ScriptExecutor.class).log(Level.INFO, "Starting to request set robot motor to ...");
		
		Vector<Object> params = new Vector<Object>();
        params.addElement(motor);
        params.addElement(power);
		client.execute("setRobotMotorPower", params);
		Logger.getLogger(ScriptExecutor.class).log(Level.INFO, "Motor "+motor+" set to : "+power);
	}
	

}
