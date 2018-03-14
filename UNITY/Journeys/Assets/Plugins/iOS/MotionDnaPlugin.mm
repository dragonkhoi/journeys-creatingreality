//
//  MotionDnaPlugin.mm
//  MotionDnaPlugin
//
//  Created by Joseph on 5/26/17.
//  Copyright © 2017 Navisens. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MotionDnaPlugin.h"

@interface Device:NSObject

@property NSString* deviceName;
@property double heading;
@property XYZ position;
@property OrientationQuaternion rotation;
@property Attitude attitude;

@end

@implementation Device:NSObject

@synthesize deviceName;
@synthesize heading;
@synthesize position;
@synthesize rotation;
@synthesize attitude;

@end

static dispatch_queue_t _devicesQueue = dispatch_queue_create("com.navisens.pojostick.devicesQueue", DISPATCH_QUEUE_CONCURRENT);

@implementation UnityMotionDna

@synthesize devices;

- (id)init
{
  self = [super init];
  devices = [NSMutableDictionary dictionary];
  return self;
}

- (void)receiveMotionDna:(MotionDna*)motionDna
{
  NSString *deviceID = [motionDna getID];
  dispatch_barrier_sync(_devicesQueue, ^{
    [devices setObject: motionDna forKey: deviceID];
  });
  UnitySendMessage("MotionDna", "ReceivedMotionDna", MakeStringCopy([deviceID UTF8String]));
}

-(void)receiveNetworkData:(MotionDna *)motionDna
{
  [self receiveMotionDna: motionDna];
}

-(void)receiveNetworkData:(NetworkCode)opcode WithPayload:(NSDictionary *)payload
{
  if (opcode == RAW_NETWORK_DATA) {
    NSString *msg = [[payload objectForKey:CreateNSString("ID")] stringByAppendingString: @":"];
    msg = [msg stringByAppendingString: [payload objectForKey:CreateNSString("payload")]];
    UnitySendMessage("MotionDna", "ReceivedNetworkData", MakeStringCopy([msg UTF8String]));
  } else if (opcode == ROOM_CAPACITY_STATUS) {
    // NSString *msg = [payload objectForKey:CreateNSString("")];
    UnitySendMessage("MotionDna", "ReceivedNetworkRooms", "");
  } else if (opcode == EXCEEDED_ROOM_CONNECTION_CAPACITY) {
    UnitySendMessage("MotionDna", "ReceivedNetworkDeviceLimit", "");
  } else if (opcode == EXCEEDED_SERVER_ROOM_CAPACITY) {
    UnitySendMessage("MotionDna", "ReceivedNetworkServerLimit", "");
  }
}

- (void)reportError:(ErrorCode)error WithMessage:(NSString*)message
{
  if (error == AUTHENTICATION_FAILED)
  {
    UnitySendMessage("MotionDna", "FailedToAuthenticate", MakeStringCopy([message UTF8String]));
  }
}

@end

static UnityMotionDna* unityMotionDna = nil;

// Threading
// Get device object
MotionDna* GetMotionDna (const char* deviceID) {
  __block MotionDna *motionDna;
  dispatch_sync(_devicesQueue, ^{
    motionDna = [unityMotionDna.devices objectForKey:CreateNSString(deviceID)];
  });
  return motionDna;
}

extern "C" {
  void EXPORT_API _StartMotionDna(const char* devKey) {
    if (unityMotionDna == nil)
      unityMotionDna = [[UnityMotionDna alloc] init];
    [unityMotionDna runMotionDna:CreateNSString(devKey)];
  }
  void EXPORT_API _StopMotionDna() {
    if (unityMotionDna)
      [unityMotionDna stop];
  }
  
  void EXPORT_API _SetLocationLatitudeLongitudeAndHeadingInDegrees(double latitude, double longitude, double heading) {
    if (unityMotionDna)
      [unityMotionDna setLocationLatitude:latitude Longitude:longitude AndHeadingInDegrees:heading];
  }
  void EXPORT_API _SetLocationAndHeadingGPSMag() {
    if (unityMotionDna)
      [unityMotionDna setLocationAndHeadingGPSMag];
  }
  void EXPORT_API _SetLocationLatitudeLongitude(double latitude, double longitude) {
    if (unityMotionDna)
      [unityMotionDna setLocationLatitude:latitude Longitude:longitude];
  }
  void EXPORT_API _SetLocationGPSOnly() {
    if (unityMotionDna)
      [unityMotionDna setLocationGPSOnly];
  }
  void EXPORT_API _SetHeadingMagInDegrees() {
    if (unityMotionDna)
      [unityMotionDna setHeadingMagInDegrees];
  }
  void EXPORT_API _SetHeadingInDegrees(double heading) {
    if (unityMotionDna)
      [unityMotionDna setHeadingInDegrees:heading];
  }
  void EXPORT_API _SetLocationNavisens() {
    if (unityMotionDna)
      [unityMotionDna setLocationNavisens];
  }
  void EXPORT_API _Pause() {
    if (unityMotionDna)
      [unityMotionDna pause];
  }
  void EXPORT_API _Resume() {
    if (unityMotionDna)
      [unityMotionDna resume];
  }
  void EXPORT_API _SetMapCorrectionEnabled(BOOL state) {
    if (unityMotionDna)
      [unityMotionDna setMapCorrectionEnabled:state];
  }
  void EXPORT_API _SetCallbackUpdateRateInMs(double rate) {
    if (unityMotionDna)
      [unityMotionDna setCallbackUpdateRateInMs:rate];
  }
  void EXPORT_API _SetNetworkUpdateRateInMs(double rate) {
    if (unityMotionDna)
      [unityMotionDna setNetworkUpdateRateInMs:rate];
  }
  void EXPORT_API _SetBinaryFileLoggingEnabled(BOOL state) {
    if (unityMotionDna)
      [unityMotionDna setBinaryFileLoggingEnabled:state];
  }
  void EXPORT_API _SetExternalPositioningState(int state) {
    if (unityMotionDna)
      [unityMotionDna setExternalPositioningState:(ExternalPositioningState)state];
  }
  void EXPORT_API _StartUDPRoom(const char* room) {
    if (unityMotionDna)
      [unityMotionDna startUDPRoom:CreateNSString(room) ];
  }
  void EXPORT_API _StartUDPRoomAtHostAndPort(const char* room, const char* host, const char* port) {
    if (unityMotionDna)
      [unityMotionDna startUDPRoom:CreateNSString(room) AtHost:CreateNSString(host) AndPort:CreateNSString(port)];
  }
  void EXPORT_API _SetUDPRoom(const char* room) {
    if (unityMotionDna)
      [unityMotionDna setUDPRoom:CreateNSString(room)];
  }
  void EXPORT_API _SendUDPPacket(const char* msg) {
    if (unityMotionDna)
      [unityMotionDna sendUDPPacket:CreateNSString(msg)];
  }
  void EXPORT_API _StopUDP() {
    if (unityMotionDna)
      [unityMotionDna stopUDP];
  }
  void EXPORT_API _SetBackgroundModeEnabled(BOOL state) {
    if (unityMotionDna)
      [unityMotionDna setBackgroundModeEnabled:state];
  }
  void EXPORT_API _SetPowerMode(int mode) {
    if (unityMotionDna)
      [unityMotionDna setPowerMode:(PowerConsumptionMode)mode];
  }
  void EXPORT_API _SetLocalHeadingOffsetInDegrees(double hdg) {
    if (unityMotionDna)
      [unityMotionDna setLocalHeadingOffsetInDegrees:hdg];
  }
  void EXPORT_API _SetCartesianOffsetInMetersXY(double x, double y) {
    if (unityMotionDna)
      [unityMotionDna setCartesianOffsetInMetersX:x Y:y];
  }
  void EXPORT_API _SetARModeEnabled(BOOL state) {
    if (unityMotionDna)
      [unityMotionDna setARModeEnabled:state];
  }
  void EXPORT_API _SetEstimationMode(int mode) {
    if (unityMotionDna)
      [unityMotionDna setEstimationMode:(EstimationMode)mode];
  }
  void EXPORT_API _ResetLocalEstimation() {
    if (unityMotionDna)
      [unityMotionDna resetLocalEstimation];
  }
  
  char* EXPORT_API _GetDeviceID() {
    if (unityMotionDna == nil)
      return MakeStringCopy("");
    return MakeStringCopy([[unityMotionDna getDeviceID] UTF8String]);
  }
  
  void EXPORT_API _GetDevice(const char* deviceID, struct NativeDevice* device, struct XYZ* localLocation, struct GlobalLocation* globalLocation, struct XY* uncertainty, struct Attitude* attitude, struct MotionStatistics* motionStatistics, struct OrientationQuaternion* quaternion) {
    if (unityMotionDna == nil)
      return;
    MotionDna *motionDna = GetMotionDna(deviceID);
    if (motionDna) {
      Location location = [motionDna getLocation];
      device->locationStatus = (int) location.locationStatus;
      device->heading = location.heading;
      device->localHeading = location.localHeading;
      switch ((int) location.verticalMotionStatus) {
        case 0:
          device->verticalMotion = 0;
          break;
        case 1:
          device->verticalMotion = 1;
          break;
        case -1:
          device->verticalMotion = 2;
          break;
        case 2:
          device->verticalMotion = 3;
          break;
        case -2:
          device->verticalMotion = 4;
          break;
        case 3:
          device->verticalMotion = 5;
          break;
        case -3:
          device->verticalMotion = 6;
          break;
        default:
          device->verticalMotion = -1;
          break;
      }
      
      Motion motion = [motionDna getMotion];
      device->stepFrequency = motion.stepFrequency;
      device->motionType = (int) motion.motionType;
      
      device->deviceName = MakeStringCopy([[motionDna getDeviceName] UTF8String]);
      
      localLocation->x = location.localLocation.x;
      localLocation->y = location.localLocation.y;
      localLocation->z = location.localLocation.z;
      
      globalLocation->latitude = location.globalLocation.latitude;
      globalLocation->longitude = location.globalLocation.longitude;
      globalLocation->altitude = location.globalLocation.altitude;
      
      uncertainty->x = location.uncertainty.x;
      uncertainty->y = location.uncertainty.y;
      
      Attitude rawAttitude = [motionDna getAttitude];
      attitude->roll = rawAttitude.roll;
      attitude->pitch = rawAttitude.pitch;
      attitude->yaw = rawAttitude.yaw;
      
      MotionStatistics rawMotionStatistics = [motionDna getMotionStatistics];
      motionStatistics->dwelling = rawMotionStatistics.dwelling;
      motionStatistics->walking = rawMotionStatistics.walking;
      motionStatistics->stationary = rawMotionStatistics.stationary;
      
      OrientationQuaternion rawQuaternion = [motionDna getQuaternion];
      quaternion->w = rawQuaternion.w;
      quaternion->x = rawQuaternion.x;
      quaternion->y = rawQuaternion.y;
      quaternion->z = rawQuaternion.z;
    }
  }
}


