using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SampleData : MonoBehaviour {
    public static SampleData Instance;
    public Journey theJourney;
	// Use this for initialization
	void Awake () {
        Instance = this;
        List<Waypoint> waypoints = new List<Waypoint>();
        Waypoint wp1 = new Waypoint(34.020249f, -118.286089f);
        ContentPoint cp11 = new ContentPoint(ContentPoint.ContentType.TEXT, "This is where I had my \n first day of orientation");
        ContentPoint cp12 = new ContentPoint(ContentPoint.ContentType.IMAGE, "photos/USC_photo_01");
        wp1.AddContentPoint(cp11);
        wp1.AddContentPoint(cp12);

        Waypoint wp2 = new Waypoint(34.020614f, -118.285830f);
        ContentPoint cp21 = new ContentPoint(ContentPoint.ContentType.TEXT, "This is where I met your mother, we were walking here and bumped into each other");
        wp2.AddContentPoint(cp21);

        Waypoint wp3 = new Waypoint(34.020553f, -118.285440f);
        ContentPoint cp31 = new ContentPoint(ContentPoint.ContentType.TEXT, "tommy");
        wp3.AddContentPoint(cp31);

        Waypoint wp4 = new Waypoint(34.020117f, -118.285160f);
        ContentPoint cp41 = new ContentPoint(ContentPoint.ContentType.TEXT, "Traveler");
        wp4.AddContentPoint(cp41);

        waypoints.Add(wp1);
        waypoints.Add(wp2);
        waypoints.Add(wp3);
        waypoints.Add(wp4);
        theJourney = new Journey("THE JOURNEY", waypoints);
	}
}
