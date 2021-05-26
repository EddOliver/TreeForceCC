#include "heltec.h"
#include "DHT.h"
#include <ArduinoJson.h>

#define DHTPIN  18
#define DHTTYPE DHT11   // DHT 11 
#define BAND 868E6  //you can set band here directly,e.g. 868E6,915E6
#define RXD2 13
#define TXD2 12
#define uS_TO_S_FACTOR 1000000  /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP  30        /* Time ESP32 will go to sleep (in seconds) */

DHT dht(DHTPIN, DHTTYPE);

void sendMessage(String message);
String iString(float number);

float temp_hum_val[2] = {0};

void setup() {
  dht.begin();
  while(dht.readTempAndHumidity(temp_hum_val)){;};
  Heltec.begin(0, true, 0, true, BAND);
  Serial2.begin(460800, SERIAL_8N1, RXD2, TXD2);
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  Serial2.flush();
}

void loop() {
  if (Serial2.available()) {
    String t = Serial2.readString();
    char json[1024];
    t.toCharArray(json,t.length());
    DynamicJsonDocument doc(1024);
    deserializeJson(doc, json);
    String datas = doc["Classification"].as<String>()+","+iString(temp_hum_val[0])+","+iString(temp_hum_val[1]);
    sendMessage(datas);
    delay(1000); 
    esp_deep_sleep_start();
  }
}

void sendMessage(String message){
  LoRa.beginPacket();
  LoRa.setTxPower(20, RF_PACONFIG_PASELECT_PABOOST);
  LoRa.print(message);
  LoRa.endPacket();
}

String iString(float number){
  return String(int(number));
}
