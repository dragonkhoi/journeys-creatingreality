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
        ContentPoint cp11 = new ContentPoint(ContentPoint.ContentType.TEXT, "Welcome to my journey");
        wp1.AddContentPoint(cp11);

        Waypoint wp2 = new Waypoint(34.020561f, -118.285939f); // tutor center
        ContentPoint cp21 = new ContentPoint(ContentPoint.ContentType.TEXT, "My favorite place to study, especially for finals");
        ContentPoint cp22 = new ContentPoint(ContentPoint.ContentType.IMAGE, "photos/USC_photo_01");
        wp1.AddContentPoint(cp22);
        wp2.AddContentPoint(cp21);

        Waypoint wp3 = new Waypoint(34.020303f, -118.285214f); // fountain
        ContentPoint cp31 = new ContentPoint(ContentPoint.ContentType.TEXT, "Your mom and I \n shared our first kiss at \n this fountain");
        ContentPoint cp32 = new ContentPoint(ContentPoint.ContentType.IMAGE, "photos/USC_photo_02");

        wp3.AddContentPoint(cp31);
        wp3.AddContentPoint(cp32);


        Waypoint wp4 = new Waypoint(34.020429f, -118.284958f); // clock
        ContentPoint cp41 = new ContentPoint(ContentPoint.ContentType.TEXT, "Once, uncle Judas \n dared me to climb it, \n then he egged me! ");
        ContentPoint cp42 = new ContentPoint(ContentPoint.ContentType.IMAGE, "photos/USC_photo_03");
        wp4.AddContentPoint(cp41);
        wp4.AddContentPoint(cp42);


        waypoints.Add(wp1);
        waypoints.Add(wp2);
        waypoints.Add(wp3);
        waypoints.Add(wp4);
        theJourney = new Journey("THE JOURNEY", waypoints);
	}
}
