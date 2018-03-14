using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NaviCameraController : MonoBehaviour {

    private const string DEV_KEY = "TeXjuEfR9xxj74YUoGfYRb7UQISvDIq95B1C6TYU3b4HpLDPxOAjdQess4LKocUY";
	// Use this for initialization
	void Start () {
        MotionDna.Init(DEV_KEY)
            .SetCallbackUpdateRateInMs(2)
            .EnableARMode();
	}
	
	// Update is called once per frame
	void Update () {
        transform.position = MotionDna.Position;
        transform.localRotation = MotionDna.Orientation;
	}
}
