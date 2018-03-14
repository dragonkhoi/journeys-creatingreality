using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MotionDnaCallback : MonoBehaviour
{
	/// <summary>
	/// Callback from native plugin when new Motion Dna is received.
	/// </summary>
	/// <param name="deviceID">Device ID.</param>
	void ReceivedMotionDna (string deviceID)
	{
		MotionDna.Singleton.ReceivedMotionDna (deviceID);
	}

	/// <summary>
	/// Callback from native plugin when authentication fails.
	/// </summary>
	/// <param name="msg">Message.</param>
	void FailedToAuthenticate (string msg)
	{
		Debug.LogError (msg);
	}

	/// <summary>
	/// Receives raw network data from another device.
	/// </summary>
	/// <param name="idPayload">ID:payload.</param>
	void ReceivedNetworkData (string idPayload)
	{
		string[] payload = idPayload.Split (":".ToCharArray (), 2);
		MotionDna.Singleton.ReceiveUDPData (payload [0], payload [1]);
	}

	/// <summary>
	/// Receives response from a network rooms query.
	/// </summary>
	/// <param name="json">Json.</param>
	void ReceivedNetworkRooms (string json)
	{
		/*
		Dictionary<string, int> dict = new Dictionary<string, int> (); // JsonConvert.DeserializeObject<Dictionary<string, int>> (json);
		MotionDna.Singleton.ReceiveUDPRooms (dict);
		*/
	}

	/// <summary>
	/// Receives a network device limit error.
	/// </summary>
	/// <param name="_">.</param>
	void ReceivedNetworkDeviceLimit (string _)
	{
		MotionDna.Singleton.ReceiveUDPDeviceLimit ();
	}

	/// <summary>
	/// Receiveds the network server limit.
	/// </summary>
	/// <param name="_">.</param>
	void ReceivedNetworkServerLimit (string _)
	{
		MotionDna.Singleton.ReceiveUDPServerLimit ();
	}
}
