using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Speaker : MonoBehaviour {
    Transform player;
    AudioSource audSrc;
    public bool playedOnce = false;
	// Use this for initialization
	void Awake () {
        audSrc = GetComponent<AudioSource>();

        player = GameObject.FindGameObjectWithTag("Player").transform;
	}
    public void SetAudioClip(AudioClip aud)
    {
        Debug.Log("set clip:" + aud.name);
        audSrc = GetComponent<AudioSource>();
        audSrc.clip = aud;
    }

    public void PlaySounds()
    {
        print("play sounds");
        audSrc = GetComponent<AudioSource>();

        if (audSrc != null)
        {
            audSrc.Play();
            playedOnce = true;
        }
            
    }

    // Update is called once per frame
    void Update () {
        float randy = Random.Range(0, 0.25f);
        var bounce = 1f + Mathf.PingPong(Time.time, randy);
        transform.localScale = new Vector3(bounce, bounce, bounce);
        //transform.Rotate(new Vector3(bounce * 5, bounce * 5, bounce * 5));
        if ((player.position - transform.position).magnitude < 20)
        {
            if(!audSrc.isPlaying && audSrc.clip != null && FindObjectOfType<GoogleARCore.HelloAR.HelloARController>().anchorCreated && !playedOnce)
                PlaySounds();
        }
    }
}
