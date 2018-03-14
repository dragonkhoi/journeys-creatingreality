using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaypointObj : MonoBehaviour {
    public Waypoint waypoint;
    public List<GameObject> contentPointGOs;

    public void AddContentPointGO(GameObject go)
    {
        contentPointGOs.Add(go);
    }
	// Use this for initialization
	void Start () {
        contentPointGOs = new List<GameObject>();
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
