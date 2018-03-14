using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Pulse : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
        var bounce = 1f + Mathf.PingPong(Time.time, 0.2f);
        transform.localScale = new Vector3(bounce, bounce, bounce);
    }
}
