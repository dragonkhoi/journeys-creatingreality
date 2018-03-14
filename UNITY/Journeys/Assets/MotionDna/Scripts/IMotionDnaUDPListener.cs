using System.Collections.Generic;

public interface IMotionDnaUDPListener
{
	/// <summary>
	/// Handles raw UDP data event.
	/// </summary>
	/// <param name="deviceID">Device ID.</param> 
	/// <param name="msg">Message.</param>
	void OnReceiveUDPData (string deviceID, string msg);

	/*
	/// <summary>
	/// Handles the response from a UDP rooms query event.
	/// </summary>
	/// <param name="dict">Dict.</param>
	void OnReceiveUDPRooms (Dictionary<string, int> dict);
	*/

	/// <summary>
	/// Handles a device limit error event.
	/// </summary>
	void OnReceiveUDPDeviceLimit ();

	/// <summary>
	/// Handles a server limit error event.
	/// </summary>
	void OnReceiveUDPServerLimit ();
}
