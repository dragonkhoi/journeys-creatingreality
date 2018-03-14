using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ContentPoint {
    public enum ContentType
    {
        IMAGE,
        TEXT,
        AUDIO
    }
    public ContentType contentType;
    public string mediaUri;
    public float orientation;

    public ContentPoint(ContentType type, string mediaUri, float orientation = 0)
    {
        contentType = type;
        this.mediaUri = mediaUri;
        this.orientation = orientation;
    }
}
