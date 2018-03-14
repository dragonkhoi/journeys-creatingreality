using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class TestLocationService : MonoBehaviour
{
    public Text tx;
    void DisplayError(string msg)
    {
        tx.text = msg;
    }
    IEnumerator Start()
    {
        DisplayError("hello");
        // First, check if user has location service enabled
        if (!Input.location.isEnabledByUser)
        {
            DisplayError("no loc");
            yield break;

        }

        // Start service before querying location
        Input.location.Start(1, 1);

        // Wait until service initializes
        int maxWait = 20;
        while (Input.location.status == LocationServiceStatus.Initializing && maxWait > 0)
        {
            yield return new WaitForSeconds(1);
            maxWait--;
        }

        // Service didn't initialize in 20 seconds
        if (maxWait < 1)
        {
            DisplayError("Timed out");
            yield break;
        }

        // Connection has failed
        if (Input.location.status == LocationServiceStatus.Failed)
        {
            DisplayError("Unable to determine device location");
            yield break;
        }
        else
        {
            Input.compass.enabled = true;

            // Access granted and location value could be retrieved
            DisplayError("Location: " + Input.location.lastData.latitude + " " + Input.location.lastData.longitude + " " + Input.location.lastData.altitude + " " + Input.location.lastData.horizontalAccuracy + " " + Input.location.lastData.timestamp);
        }

        // Stop service if there is no need to query location updates continuously
        // Input.location.Stop();
    }
}