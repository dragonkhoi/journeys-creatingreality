using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Journey {
    public List<Waypoint> waypoints;
    public string name;

    public Journey(string name, List<Waypoint> waypoints)
    {
        this.name = name;
        this.waypoints = waypoints;
    }
}
