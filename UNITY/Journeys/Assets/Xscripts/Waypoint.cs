using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Waypoint {
    public Vector2 latLng;
    public List<ContentPoint> contentPoints;
    public Waypoint(float lat, float lon, List<ContentPoint> contentPoints = null)
    {
        latLng.x = lat;
        latLng.y = lon;
        if (contentPoints == null)
            this.contentPoints = new List<ContentPoint>();
        else
            this.contentPoints = contentPoints;
    }
    public void AddContentPoint(ContentPoint cp)
    {
        contentPoints.Add(cp);
    }
}
