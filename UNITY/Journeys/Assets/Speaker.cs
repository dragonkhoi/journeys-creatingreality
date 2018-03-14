using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Speaker : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
    public void SetAudioClip(AudioClip aud)
    {
        var audSrc = GetComponent<AudioSource>();
        audSrc.clip = aud;
    }

    public void PlaySounds()
    {
        var audSrc = GetComponent<AudioSource>();
        audSrc.PlayOneShot(audSrc.clip);

    }

    // Update is called once per frame
    void Update () {
        float randy = Random.Range(0, 0.25f);
        var bounce = 1f + Mathf.PingPong(Time.time, randy);
        transform.localScale = new Vector3(bounce, bounce, bounce);
        transform.Rotate(new Vector3(bounce * 5, bounce * 5, bounce * 5));
    }
}
