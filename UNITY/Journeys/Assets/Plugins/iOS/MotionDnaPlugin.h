//
//  MotionDnaPlugin.h
//  MotionDnaPlugin
//
//  Created by Joseph on 5/26/17.
//  Copyright © 2017 Navisens. All rights reserved.
//

#pragma once

#if UNITY_METRO
#define EXPORT_API __declspec(dllexport) __stdcall
#elif UNITY_WIN
#define EXPORT_API __declspec(dllexport)
#else
#define EXPORT_API
#endif

#import <MotionDnaSDK/MotionDnaSDK.h>
#import <MotionDnaSDK/MotionDna.h>

__attribute__((visibility("default"))) @interface UnityMotionDna : MotionDnaSDK

@property NSMutableDictionary* devices;

- (void)receiveMotionDna:(MotionDna*)motionDna;
- (void)receiveNetworkData:(MotionDna*)motionDna;
- (void)receiveNetworkData:(NetworkCode)opcode WithPayload:(NSDictionary*)payload;
- (void)reportError:(ErrorCode)error WithMessage:(NSString*)message;

@end

struct NativeDevice {
  int locationStatus;
  double heading;
  double localHeading;
  int verticalMotion;
  
  double stepFrequency;
  int motionType;
  
  char * deviceName;
};

// Unity
// Converts C style string to NSString
NSString* CreateNSString (const char* string) {
  if (string)
    return [NSString stringWithUTF8String: string];
  else
    return [NSString stringWithUTF8String: ""];
}
// Helper method to create C string copy
char* MakeStringCopy (const char* string)
{
  if (string == NULL)
    return NULL;
  
  char* res = (char*)malloc(strlen(string) + 1);
  strcpy(res, string);
  return res;
}

extern "C" {
  void EXPORT_API _StartMotionDna(const char* devKey);
  void EXPORT_API _StopMotionDna();
  
  void EXPORT_API _SetLocationLatitudeLongitudeAndHeadingInDegrees(double latitude, double longitude, double heading);
  void EXPORT_API _SetLocationAndHeadingGPSMag();
  void EXPORT_API _SetLocationLatitudeLongitude(double latitude, double longitude);
  void EXPORT_API _SetLocationGPSOnly();
  void EXPORT_API _SetHeadingMagInDegrees();
  void EXPORT_API _SetHeadingInDegrees(double heading);
  void EXPORT_API _SetLocationNavisens();
  
  void EXPORT_API _Pause();
  void EXPORT_API _Resume();
  
  void EXPORT_API _SetMapCorrectionEnabled(BOOL state);
  void EXPORT_API _SetCallbackUpdateRateInMs(double rate);
  void EXPORT_API _SetNetworkUpdateRateInMs(double rate);
  void EXPORT_API _SetBinaryFileLoggingEnabled(BOOL state);
  void EXPORT_API _SetExternalPositioningState(int state);
  void EXPORT_API _StartUDPRoom(const char* room);
  void EXPORT_API _StartUDPRoomAtHostAndPort(const char* room, const char* host, const char* port);
  void EXPORT_API _SetUDPRoom(const char* room);
  void EXPORT_API _SendUDPPacket(const char* msg);
  void EXPORT_API _StopUDP();
  void EXPORT_API _SetBackgroundModeEnabled(BOOL state);
  void EXPORT_API _SetPowerMode(int mode);
  void EXPORT_API _SetLocalHeadingOffsetInDegrees(double hdg);
  void EXPORT_API _SetCartesianOffsetInMetersXY(double x, double y);
  void EXPORT_API _SetARModeEnabled(BOOL state);
  void EXPORT_API _SetEstimationMode(int mode);
  void EXPORT_API _ResetLocalEstimation();
  
  char* EXPORT_API _GetDeviceID();
  
  void EXPORT_API _GetDevice(const char* deviceID, struct NativeDevice* device, struct XYZ* localLocation, struct GlobalLocation* globalLocation, struct XY* uncertainty, struct Attitude* attitude, struct MotionStatistics* motionStatistics, struct OrientationQuaternion* quaternion);
}


