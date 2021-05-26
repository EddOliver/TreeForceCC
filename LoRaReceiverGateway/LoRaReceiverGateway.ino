#include "heltec.h"
#include "certs.h"
#include <WiFiClientSecure.h>
#include <MQTT.h>
#include <WiFi.h>
#include <WiFiMulti.h>

#define LED_BUILTIN 2
#define BAND    868E6  //you can set band here directly,e.g. 868E6,915E6

// The MQTT topic that this device should publish to
#define AWS_IOT_TOPIC "Lorawan/Gateway/1"

WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);
WiFiMulti wifiMulti;

char* string2char(String command){
   if(command.length()!=0){
       char *p = const_cast<char*>(command.c_str());
       return p;
   }
}

void connectToWiFi() {
  int conCounter = 0;
  while (wifiMulti.run() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
    conCounter++;
    if (conCounter == 10) {
      ESP.restart();
    }
  }
  Serial.println("WiFi OK");
}

void connectToAWS()
{
  // Configure WiFiClientSecure to use the AWS certificates we generated
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint we defined earlier
  client.begin(AWS_IOT_ENDPOINT, 8883, net);

  // Try to connect to AWS and count how many times we retried.

  while (!client.connect(DEVICE_NAME)) {
    delay(1000);
    Serial.print(".");
  }

  // Make sure that we did indeed successfully connect to the MQTT broker
  // If not we just end the function and wait for the next loop.
  if(!client.connected()){
    Serial.print(".");
    return;
  }
  Serial.println("AWS OK");
  
}

void connect() {
  connectToWiFi();
  connectToAWS();
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN,LOW);
  Heltec.begin(0,1,1,1,BAND);
  WiFi.begin(ssid, password);
  wifiMulti.addAP(ssid, password);
  wifiMulti.addAP(ssid2, password2);
  connect();
  Serial.println("Connected WiFi and AWS");
  LoRa.receive(); 
  digitalWrite(LED_BUILTIN,HIGH);
}

void loop() {
  client.loop();
  int packetSize = LoRa.parsePacket();
  if (packetSize) { cbk(packetSize);  }
  delay(10);
  if (!client.connected()) {
  digitalWrite(LED_BUILTIN,LOW);
  connect();
  digitalWrite(LED_BUILTIN,HIGH);
  }
}

void cbk(int packetSize) {
  String packet ="";
  for (int i = 0; i < packetSize; i++) { 
    packet += (char) LoRa.read(); 
  }
  client.publish(AWS_IOT_TOPIC,string2char("{\"Message\":\""+packet+"\",\"RSSI\":\""+String(LoRa.packetRssi())+"\"}"));
}
