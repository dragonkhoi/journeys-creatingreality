using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaypointObj : MonoBehaviour {
    public Waypoint waypoint;
    public List<GameObject> contentPointGOs;

    public void SetRenderer(bool flag)
    {
        GetComponent<Renderer>().enabled = flag;
        transform.GetChild(0).GetComponent<Renderer>().enabled = flag;
        transform.GetChild(1).GetComponent<Renderer>().enabled = flag;
    }

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
