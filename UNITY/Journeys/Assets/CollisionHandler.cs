using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using GoogleARCore;

public class CollisionHandler : MonoBehaviour {
    private void OnTriggerEnter(Collider other)
    {
        if(other.tag == "Player")
        {
            GetComponentInParent<WaypointObj>().SetRenderer(false);
        }
        // loop through content points
        WaypointObj wpObj = GetComponentInParent<WaypointObj>();
        foreach(GameObject go in wpObj.contentPointGOs)
        {
            if(go.tag == "SignPrefab")
            {
                TrackableHit hit;
                TrackableHitFlags raycastFilter = TrackableHitFlags.PlaneWithinPolygon |
                    TrackableHitFlags.FeaturePointWithSurfaceNormal;

                if (Frame.Raycast(0.5f, 0.1f, raycastFilter, out hit))
                {
                    go.transform.position = new Vector3(go.transform.position.x, hit.Pose.position.y, go.transform.position.z);

                    // Create an anchor to allow ARCore to track the hitpoint as understanding of the physical
                    // world evolves.
                    var anchor = hit.Trackable.CreateAnchor(hit.Pose);

                    // Make Andy model a child of the anchor.
                    go.transform.parent = anchor.transform;
                }
                else if (Frame.Raycast(0.5f, 0.5f, raycastFilter, out hit))
                {
                    go.transform.position = new Vector3(go.transform.position.x, hit.Pose.position.y, go.transform.position.z);

                    // Create an anchor to allow ARCore to track the hitpoint as understanding of the physical
                    // world evolves.
                    var anchor = hit.Trackable.CreateAnchor(hit.Pose);

                    // Make Andy model a child of the anchor.
                    go.transform.parent = anchor.transform;
                }
            }
            
        }
    }
    private void OnTriggerExit(Collider other)
    {
        if (other.tag == "Player")
        {
            GetComponentInParent<WaypointObj>().SetRenderer(true);
        }
    }
}
