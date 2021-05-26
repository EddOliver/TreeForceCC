# TreeForce-Climate-Change

<img src="./Img/logo.svg" >

# Table of Contents:

- [TreeForce-Climate-Change](#treeforce-climate-change)
- [Table of Contents:](#table-of-contents)
- [Introduction:](#introduction)
- [Solution:](#solution)
  - [Features:](#features)
- [Hardware, Software and Services:](#hardware-software-and-services)
  - [Hardware:](#hardware)
  - [Software:](#software)
  - [Services:](#services)
- [Connection Diagram:](#connection-diagram)
  - [BackEnd:](#backend)
  - [Hw Connections:](#hw-connections)
- [Capture Data:](#capture-data)
  - [Setup Quickfeather:](#setup-quickfeather)
  - [Capturing Data:](#capturing-data)
  - [Labeling Data:](#labeling-data)
- [SensiML:](#sensiml)
      - [Library Checkpoint.](#library-checkpoint)
- [Testing Model:](#testing-model)
- [Serial Interface:](#serial-interface)
- [LoraWAN Sender:](#lorawan-sender)
  - [Hardware:](#hardware-1)
- [LoraWAN Gateway:](#lorawan-gateway)
  - [AWS IoT:](#aws-iot)
- [WebPage Deploy:](#webpage-deploy)
  - [AWS Cognito:](#aws-cognito)
  - [AWS IoT WebSocket:](#aws-iot-websocket)
- [Final Product:](#final-product)
- [EPIC DEMO:](#epic-demo)

# Introduction:

Wildfires happen during dry seasons, and it’s one of the worst natural disasters. 

According to the bbc The Northern California wildfire that killed dozens of people and burned down the town of Paradise was the world's costliest single natural disaster in 2018.

The reinsurance giant said the CampFire in November caused overall losses of $16.5 billion. The company said some $12.5 billion in losses were insured. Over 50000 people were displaced from their homes.

Also National Geographic mentioned “Wildfires can burn millions of acres of land at rapid speeds and can consume everything—trees, homes, even humans—in their paths. These rolling flames travel up to 14 miles an hour, which converts to about a four-minute mile pace, and can overtake the average human in minutes.”

Over time, California has lost many acres of woods, trees and bushes, but also houses have been lost. Some of them still have consequences, wildfires also burned electric, gas, and water infrastructure. that left 2 million californians in the dark due to blackouts, according to Business insider.

Last year in Australia 27.2 million acres were burned and 33 people died in this event. New South Wales (NSW), fire has affected more than five million hectares, destroying more than 2,000 houses and forcing thousands to seek shelter elsewhere.

In Australia Wildfires were one of the biggest natural disasters last year, causing problems still after the flames stopped burning, people and animals died. In just this area this natural disaster is worth losses of over 27 million USD, and more than 25 thousand koalas died

What if there is a device able to protect trees all around your town, parks, mangroves and more? 

# Solution:

I developed an IoT Enabled Forest Fire Detection and Early Warning System, in order to become the TREE FORCE!, My system will aid in preventing Forest Fires with our sensor capabilities, and our early notification system.

For that they will employ our IoT modules that track Ambient humidity and temperature, and perhaps the most important one in the **Gas Sensor**, which is the one utilized in providing the notifications by AI analysis to combat Forest Fires.

## Features:

* Low-power battery consumption (Quickfeather and LoraWAN).
* High accuracy (thanks to sensiml).
* Easy production at large scale, due to its simplicity.

# Hardware, Software and Services:

## Hardware:

* QuickFeather Development Kit. 1x.
  * https://www.quicklogic.com/products/eos-s3/quickfeather-development-kit/
* ESP32 TTGO LoraWAN Module. 2x.
  * https://www.banggood.com/2Pcs-Wemos-TTGO-LORA32-915Mhz-ESP32-LoRa-OLED-0_96-Inch-Blue-Display-p-1239769.html?rmmds=category&cur_warehouse=CN
* X-NUCLEO-IKS01A3. 1x.
  * https://www.st.com/en/ecosystems/x-nucleo-iks01a3.html
* LiPo Battery. 1x.
  * https://www.banggood.com/3_7V-500mAh-LiPo-Battery-Molex-Pico-1_25mm-2P-Connector-Plug-Universal-For-Eachine-TX06-TX805-TX02-VR006-VR005-FPV-Goggles-VTX-CAM-p-1187264.html?cur_warehouse=HK&rmmds=search
* ADS1115. 1x.
  * https://www.amazon.com/dp/B01DLHKMO2/ref=cm_sw_em_r_mt_dp_E0CDS0R9AE6KPFKNMVBH?_encoding=UTF8&psc=1
* MQ135. 1x.
  * https://www.amazon.com/dp/B07875Y7HW/ref=cm_sw_em_r_mt_dp_GRPM1904HDYFJ1M1ZXBY
* DHT11. 1x.
  * https://www.amazon.com/dp/B01DKC2GQ0/ref=cm_sw_em_r_mt_dp_PCEQXV7M3BWXXJSF7GN7?_encoding=UTF8&psc=1

## Software:

* SensiML.
  * https://sensiml.com/
* Data capture lab.
  * https://sensiml.com/products/data-capture-lab/
* Python.
  * https://www.python.org/
* ReactJS.
  * https://reactjs.org/
* OpenLayers Maps.
  * https://openlayers.org/
* Qorc SDK.
  * https://github.com/QuickLogic-Corp/qorc-sdk/
* Zephyr RTOS.
  * https://www.zephyrproject.org/

## Services:

* Docker.
  * https://www.docker.com/
* AWS IoT.
  * https://aws.amazon.com/iot/
* AWS Cognito.
  * https://aws.amazon.com/cognito/
* AWS S3.
  * https://aws.amazon.com/s3/


# Connection Diagram:

## BackEnd:

<img src="./Img/sch.png" >

<hr />

## Hw Connections:

<img src="./Img/hw.png" >

# Capture Data:

In order to capture the information from an analog sensor, my first attempt was to use the QuickFather ADC directly, however I had little success in getting it to work together with the Data Capture Lab Simple Stream, so my second option was to use the ADS1115 component. .

<img src="./Img/comp.jpg" >

To adapt the sensor and be able to use it correctly, follow the SensiML tutorial.

https://sensiml.com/blog/tutorial-series/
Connecting New I2C Sensors to QuickFeather
and Capturing the Data in SensiML

The complete project for you to compile the code if you wish is in the Sampling folder.

If you only want to enable reading from A0, use the binary in the Sampling Bin folder.

<hr />

## Setup Quickfeather:

Once the sensor is working, we can start capturing data from the Data Capture Lab, as we can see in the following video.

Video Demo: Click on the image
[![demo](./Img/captu.png)](https://youtu.be/kd2wsLPIK_Y)

<hr />

## Capturing Data:

In this case, I did two types of data capture. One of the sensor capturing data for 10 min, stable and without alteration.

<img src="./Img/norm.png">

And another data capture by exposing the sensor to smoke.

<img src="./Img/fire.png">

## Labeling Data:

For data labeling, perform 3 samples from the normal sensor condition and 2 samples from the sensor exposed to smoke.

<img src="./Img/data.png">

# SensiML:

The total of samples generated for both cases is.

<img src="./Img/samples.png">

The results of the training with these data were.

<img src="./Img/train.png">

The results when testing the model were.

<img src="./Img/result.png">

#### Library Checkpoint.

When downloading the project instead of downloading the binary, we will download the library.

<img src="./Img/library.png">

# Testing Model:

Unlike the audio and accelerometer examples, in order to use the generated model, we must modify the SensiML\knowledgepack and change it with the one we downloaded
[here](#library-checkpoint) 

<img src="./Img/file.png">

For this I have already made the corresponding changes to the code for its easy implementation in the SensiML folder.

Or if you want to use my model to test it, just flash the binary of the SensiML Bin layer.

1. Fire Detected.
2. Normal.

Video Demo: Click on the image
[![demo](./Img/video0.png)](https://youtu.be/JWpvFY7OxgI)

# Serial Interface:

In order to implement the LOW energy concept in the project, I decided to implement an ESP32 module with LoraWAN, to act as a LoraWAN transmitter to a remote Gateway directly connected to AWSIoT.

In this case the communication between both modules will be by Serial.

<img src="./Img/serial.png">

# LoraWAN Sender:

This module has, in addition to direct serial communication with the QuickFeather, a DHT11 sensor, in order to also receive environmental data such as Temperature and Relative Humidity.

## Hardware:

<img src="./Img/senderhw.png">

# LoraWAN Gateway:

The connectivity between the LoraWAN Sender and the LoraWAN Gateway can be several kilometers and is low energy, in this case the connection of the system is this.

<img src="./Img/lorawan.png">

## AWS IoT:

For gateway connectivity to AWSIoT, do code in Arduino IDE that connects via MQTTS to AWSIoT. This code is in the LoRaRecieverGateway folder.

Lo all Internet credentials, AWS Certificates and Keys have to be configured in the certs.h file

    static const char* ssid     = "YourSSID";
    static const char* password = "YourPASS";

    static const char* DEVICE_NAME     = "YOUR_DEVICE_NAME";
    static const char* AWS_IOT_ENDPOINT = "YOUENDPOINT.iot.us-east-1.amazonaws.com";

    static const char AWS_CERT_CA[] PROGMEM = R"EOF(
    -----BEGIN CERTIFICATE-----
    MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
    ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
    b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
    MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
    b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
    ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
    9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
    IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
    VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
    93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
    jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
    AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
    A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
    U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
    N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
    o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
    5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
    rqXRfboQnoZsG4q5WTP468SQvvG5
    -----END CERTIFICATE-----
    )EOF";

    // Device Certificate
    static const char AWS_CERT_CRT[] PROGMEM = R"KEY(
    -----BEGIN CERTIFICATE-----
    -----END CERTIFICATE-----
    )KEY";

    static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(
    -----BEGIN RSA PRIVATE KEY-----
    -----END RSA PRIVATE KEY-----
    )KEY";

In the case of certificates and in endpoint, you must obtain them when creating a Thing in AWSIoT.

https://docs.aws.amazon.com/iot/latest/developerguide/iot-moisture-create-thing.html

# WebPage Deploy:

The deployment of the web page was done using ReactJS and AWS-SDK for javascript.

<img src="./Img/desktop.png">

https://treeforce-deploy.s3.amazonaws.com/index.html

Here is a mini demo:

Video Demo: Click on the image
[![demo](./Img/video.png)](https://youtu.be/7srf9wKbFWc)

## AWS Cognito:

For security, to safely use and consume AWS services, **identity pool** credentials were implemented with the Cognito service.

The access keys for AWSIoT and Cognito must be placed in the following file.

Webapp/src/components/aws-configuration.js

    var awsConfiguration = {
      poolId: "us-east-1:XXXXXXXXXXXXXXX", // 'YourCognitoIdentityPoolId'
      host:"XXXXXXXXXXXXXX-ats.iot.us-east-1.amazonaws.com", // 'YourAwsIoTEndpoint', e.g. 'prefix.iot.us-east-1.amazonaws.com'
      region: "us-east-1" // 'YourAwsRegion', e.g. 'us-east-1'
    };
    module.exports = awsConfiguration;

## AWS IoT WebSocket:

The web page receives the sensor data through AWSIoT as a web socket, so it is important to define within the page, which is the topic that we are going to receive, in this case "Lorawan / Gateway / 1".

In the following file, put the name of the topic to which you will be subscribed.

WebApp/src/App.js

    <IotReciever sub_topics={["Lorawan/Gateway/1"]} callback={this.callBackIoT} />

# Final Product:

Device Open:
<img src="./Img/open1.jpg">

Device Close:
<img src="./Img/close1.jpg">

Gateway Open:
<img src="./Img/Gateway.jpg">

Gateway Close:
<img src="./Img/gatewayopen.jpg">

Platform:

<img src="./Img/desktop.png" height="300px"><img src="./Img/web.png" height="300px">

https://treeforce-deploy.s3.amazonaws.com/index.html

# EPIC DEMO:

Pending...
