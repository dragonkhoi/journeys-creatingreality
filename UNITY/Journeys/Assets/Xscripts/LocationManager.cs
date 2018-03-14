using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LocationManager : MonoBehaviour {
    Vector2 startGeoLocation = Vector2.zero;
    float startGeoOrientation = -1f;
    Vector3 startLocation;
    float startOrientation;
    float orientationalCalibration;
    float unityNorth;
    public Text tx;
    float recalibrationTimer;
    float recalibrationTime = 10f;
    public bool calibrated = false;
    public GameObject WaypointPrefab;
    List<Waypoint> waypoints = new List<Waypoint>();
    List<GameObject> waypointGOs = new List<GameObject>();
    public Transform wpParent;
    public Transform wpPivot;
    public GameObject sliderAngle;
    public GameObject startButton;

    public GameObject signPostPrefab;
    public GameObject photoFramePrefab;
    public GameObject arrowPrefab;
    public GameObject audioPrefab;

    private const string DEV_KEY = "TeXjuEfR9xxj74YUoGfYRb7UQISvDIq95B1C6TYU3b4HpLDPxOAjdQess4LKocUY";

    public static LocationManager Instance;

    void DisplayError(string msg)
    {
        tx.text = msg;
    }
    // Use this for initialization
    void Start () {
        Instance = this;
        recalibrationTimer = recalibrationTime;
        
#if UNITY_EDITOR
        // testing
        startGeoLocation = new Vector2(34.020352f, -118.286085f);
        startGeoOrientation = 0;
        unityNorth = 180;
        SpawnWaypoints();

#endif

        print(""+distance(34.0202728f, -118.2862061f, 34.0205574f, -118.2859701f));
        print("" + bearing(34.0202349f, -118.2862025f, 34.0210708f, -118.286224f));
	}

    public Vector3 toUnityPos(float lat, float lon)
    {
        float d = distance(startGeoLocation.x, startGeoLocation.y, lat, lon);
        float b = bearing(startGeoLocation.x, startGeoLocation.y, lat, lon);
        b = b * Mathf.Deg2Rad;
        print(d + " " +  b);
        //b = (b + (unityNorth*Mathf.Deg2Rad));
        DisplayError(d + " " + b);
        float x = d * Mathf.Sin(b);
        float z = d * Mathf.Cos(b);
        return new Vector3(x, 0, z);
    }

    float distance(float lat1, float lon1, float lat2, float lon2)
    {
        lat1 = Mathf.Deg2Rad*lat1;
        lon1 = Mathf.Deg2Rad * lon1;
        lon2 = Mathf.Deg2Rad * lon2;
        lat2 = Mathf.Deg2Rad * lat2;
        float a = Mathf.Sin((lat2 - lat1) * 0.5f) * Mathf.Sin((lat2 - lat1) * 0.5f) + Mathf.Cos(lat1) * Mathf.Cos(lat2) * Mathf.Sin((lon2 - lon1) * 0.5f) * Mathf.Sin((lon2 - lon1) * 0.5f);
        float c = 2 * Mathf.Atan2(Mathf.Sqrt(a), Mathf.Sqrt(1 - a));
        float d = 6371 * Mathf.Pow(10, 3) * c;
        return d;
    }

    float bearing(float lat1, float lon1, float lat2, float lon2)
    {
        lat1 = Mathf.Deg2Rad * lat1;
        lon1 = Mathf.Deg2Rad * lon1;
        lon2 = Mathf.Deg2Rad * lon2;
        lat2 = Mathf.Deg2Rad * lat2;
        var y = Mathf.Sin(lon2 - lon1) * Mathf.Cos(lat2);
        var x = Mathf.Cos(lat1) * Mathf.Sin(lat2) - Mathf.Sin(lat1) * Mathf.Cos(lat2) * Mathf.Cos(lon2 - lon1);
        float theta = Mathf.Atan2(y, x);
        theta = Mathf.Rad2Deg * theta;
        theta = (theta + 360) % 360;
        return theta;
    }
	
	// Update is called once per frame
	void Update () {
        if(Input.location.status != LocationServiceStatus.Initializing && Input.location.status != LocationServiceStatus.Failed)
        {

            // location is ready
            if (!calibrated)
            {
                DisplayError("initializing location");
                InitializeLocation();
                // if startOrientation = orientationalCalibration, pointing north
            }
            else
            {
                float trueHeading = Input.compass.trueHeading;
                //startGeoLocation = new Vector2(MotionDna.Position.x, MotionDna.Position.z);

                DisplayError("" + trueHeading + " rot: " + transform.rotation.eulerAngles.y + " unitynorth: " + unityNorth + " startGeo: " + startGeoLocation );

            }
            recalibrationTimer -= Time.deltaTime;
            if(recalibrationTimer < 0)
            {
             //   Recalibrate();
                recalibrationTimer = recalibrationTime;
            }
        }
	}
    public void InitializeLocation()
    {
        calibrated = true;
        float trueHeading = Input.compass.trueHeading;
        
        startLocation = transform.position;
        startGeoLocation = new Vector2(Input.location.lastData.latitude, Input.location.lastData.longitude);
        startOrientation = transform.rotation.eulerAngles.y;
        
        DisplayError(""+trueHeading);
        startGeoOrientation = trueHeading; // 40, 0, 0 - 40
        unityNorth = (startOrientation - startGeoOrientation);
        //MotionDna.Init(DEV_KEY)
        //    .SetCallbackUpdateRateInMs(0)
        //    .EnableARMode().
        //    SetLocation(startGeoLocation.x, startGeoLocation.y, trueHeading);
        SpawnWaypoints();
    }
    public void SpawnWaypoints()
    {
        Journey theJourney = SampleData.Instance.theJourney;
        for (int i = 0; i < theJourney.waypoints.Count; i++)
        {
            Vector2 latLong = theJourney.waypoints[i].latLng;
            waypoints.Add(theJourney.waypoints[i]);
            
            SpawnWaypoint(theJourney.waypoints[i]);
            if(i == 0)
            {
                waypointGOs[0].GetComponent<WaypointObj>().SetRenderer(false);
            }
            if(i > 0)
            {
                // spawn path
                Vector3 prevPos = waypointGOs[i - 1].transform.position;
                Vector3 curPos = waypointGOs[i].transform.position;
                Vector3 dif = curPos - prevPos;
                int numArrows = Mathf.FloorToInt( dif.magnitude / 2f );
                Vector3 chunk = dif / numArrows;
                Debug.Log("num ar: " + numArrows + " dif mag: " + dif.magnitude);
                for(int j = 1; j  < numArrows; j++)
                {
                    Vector3 newPos = prevPos + (j * chunk);
                    newPos = newPos - new Vector3(0f, 1f, 0f);
                    GameObject arrowObj = Instantiate(arrowPrefab, newPos, Quaternion.identity, wpParent) as GameObject;
                    arrowObj.transform.LookAt(curPos);
                }
            }
        }
    }
    public void ShowWaypoints()
    {
        Vector3 dif = wpParent.position - wpParent.GetChild(0).position;
        wpParent.position = transform.position + dif;
        wpParent.gameObject.SetActive(true);
        sliderAngle.SetActive(true);
        startButton.SetActive(false);
    }
    public void AdjustWaypointAngle(float angle)
    {
        wpPivot.rotation = Quaternion.Euler(new Vector3(wpPivot.rotation.eulerAngles.x, angle, wpPivot.rotation.eulerAngles.z));
    }
    void SpawnWaypoint(Waypoint wp)
    {
        Vector3 pos = toUnityPos(wp.latLng.x, wp.latLng.y);
        GameObject wpGO = Instantiate(WaypointPrefab, pos - new Vector3(0, 1f, 0), Quaternion.identity, wpParent) as GameObject;
        waypointGOs.Add(wpGO);
        wpGO.transform.LookAt(GameObject.FindGameObjectWithTag("Player").transform);
        for (var i = 0; i < wp.contentPoints.Count; i++)
        {
            SpawnContentPoint(wp.contentPoints[i], wpGO, i * Mathf.PI / 4);
        }
    }
    void SpawnContentPoint(ContentPoint cp, GameObject wpGO, float i)
    {
        var radius = 3f;
        Vector3 offset = new Vector3(radius * Mathf.Sin(i), 0, radius * Mathf.Cos(i));

        if (cp.contentType == ContentPoint.ContentType.TEXT)
        {
            GameObject textGO = Instantiate(signPostPrefab, wpGO.transform.position + offset, Quaternion.identity, wpGO.transform) as GameObject;
            textGO.transform.LookAt(wpGO.transform);
            textGO.transform.Rotate(new Vector3(0, 180, 0));
            //textGO.transform.Translate(new Vector3(0, -3f, 0));
            textGO.transform.GetChild(0).GetComponent<TextMesh>().text = cp.mediaUri;
            wpGO.GetComponent<WaypointObj>().AddContentPointGO(textGO);
        }
        else if (cp.contentType == ContentPoint.ContentType.IMAGE)
        {
            GameObject photoGO = Instantiate(photoFramePrefab, wpGO.transform.position + offset, Quaternion.identity, wpGO.transform) as GameObject;
            photoGO.transform.LookAt(wpGO.transform);
            //photoGO.transform.Translate(new Vector3(0, -1f, 0));

            photoGO.transform.GetChild(0).GetComponent<Renderer>().material.mainTexture = Resources.Load(cp.mediaUri) as Texture;
            wpGO.GetComponent<WaypointObj>().AddContentPointGO(photoGO);

        }
        else if(cp.contentType == ContentPoint.ContentType.AUDIO)
        {
            GameObject audioGO = Instantiate(audioPrefab, wpGO.transform.position + offset, Quaternion.identity, wpGO.transform) as GameObject;
            audioGO.transform.LookAt(wpGO.transform);
            audioGO.GetComponent<Speaker>().SetAudioClip(Resources.Load(cp.mediaUri) as AudioClip);
            wpGO.GetComponent<WaypointObj>().AddContentPointGO(audioGO);

        }
    }
    void ShiftAllWaypoints()
    {
        for( var i = 0; i < waypointGOs.Count; i++)
        {
            ShiftWaypoint(waypointGOs[i], waypoints[i].latLng.x, waypoints[i].latLng.y);
        }
    }
    void ShiftWaypoint(GameObject waypointGO, float lat, float lng)
    {
        Vector3 pos = toUnityPos(lat, lng);
        waypointGO.transform.position = pos;
    }
    public void Recalibrate()
    {
        if (!calibrated)
            return;
        startLocation = transform.position;
        startGeoLocation = new Vector2(Input.location.lastData.latitude, Input.location.lastData.longitude);
        //startGeoLocation = new Vector2(MotionDna.Position.x, MotionDna.Position.z);
        DisplayError("" + startGeoLocation);

        startOrientation = transform.rotation.eulerAngles.y;
        float trueHeading = Input.compass.trueHeading;
        startGeoOrientation = trueHeading;
        unityNorth = (startOrientation - startGeoOrientation);
        ShiftAllWaypoints();

    }
}
