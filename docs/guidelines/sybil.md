---
id: sybil
title: Sybil Prevention
hide_title: true
---
# Preventing Multiple Accounts Creation 

The Kin Ecosystem SDK and server provide Kin account creation, subsidized earn offers, and native payment service (earn, spend, p2p) for our partners. Using this service, a user can create a blockchain account and complete subsidized earn offers. However, it could also incentivize attackers to try to hack and abuse the system to earn Kin in malicious ways.

Kin provides services for partners and assumes that every user with a validated register JWT (signed by the host app) is a legitimate user that should be served. The signed JWT is the only protection layer available for the ecosystem backend service.

# What is Sybil Attack? 

Sybil ([https://en.wikipedia.org/wiki/Sybil_attack](https://en.wikipedia.org/wiki/Sybil_attack))  attack is a known attack vector in p2p reputation systems were a single or a group of attackers create many false identities and gain disproportionate power to influence the system. For example, an attacker may orchestrate these identities to upvote, like, or follow a member of the system to create unfair promotion.

Sybil attacks will benefit an attacker if the cost of creating false users  is less  than what they can gain by doing so. 

In a system that incentivizes end users to contribute  and complete valuable actions within the app, Sybil attacks can be used to create many false users that will complete such actions either manually or programmatically. Doing so, an attacker can gain significant amounts of Kin without providing real value, thereby harming the ROI of Kin as a means of incentivising honest and positive users.  

## Kin Ecosystem SDK 

The Kin Ecosystem SDK will accept any request signed by the hosting app (JWT), and, therefore, the hosting app must protect its JWT service layer and only provide JWT to authenticated and legitimate users. Only the host app has the tools to protect against sybil attacks, and thus, it should act as the gatekeeper and implement the necessary protection measures. Kin Ecosystem provides guidelines, best practices, and security updates based on shared knowledge and learnings acquired by the community of Kin partners. 

User authentication (by email/phone) and protection tools (e.g. SafetyNet API) are only available or applicable for the hosting app, and they are not accessible to the Kin Ecosystem SDK layer. Therefore, it is the responsibility of the hosting app to authenticate users and  handle sybil attacks to ensure only legitimate users have access to the service. Here, we'll present possible attack vectors and recommended ways and tools to counter them. 

## Host App Mitigation Options

1.  Authentication
    1.  JWT endpoint will be protected by email or phone verification to authenticate users. 
    1.  If an unregistered user is allowed to interact and earn Kin, make sure that the user identifier is unique and can't be guessed or attacked by brute force.
1.  Bots 
    1.  Android - [SafetyNet Attestation API](https://developer.android.com/training/safetynet/attestation-checklist) -
        1.  Only provide JWT for a client that was authenticated by SafetyNet API . By using SafetyNet hosting app can make sure API calls are done from the genuine/untampered mobile app and on a real Android device.
    1.  iOS - 
        1.  Using APNS/ Pushkit as a took to authenticate.
        1.  Devicecheck API.
    1.  Captcha - for example reCAPTCHA - will help block bots
    1.  Phone verification will limit bots
1.  Manually create multiple accounts or using a Device farms
    1.  SafetyNet + persistent device_id - SafetyNet will ensure an app code was not tampered with and therefore device_id can be used to monitor app reinstall.
    1.  Phone verification will limit reinstalling the app and creating multiple accounts on same device.

We should remember that as long as the reward is greater than the effort to game the system, people will try to cheat. This is a general issue in the industry for any app that provides a service that can be used to gain profit. An attacker can create multiple accounts to abuse the system either manually or by using an automated bot. As Kin gains more popularity and usage, we can expect that there will be more incentive for attackers to abuse the system,  and therefore we shouldn't consider this as a one time effort. We will keep updated, alert, and suggest additional protection measures. Hosting apps should keep updating and enhancing their own protections layers.


<table>
  <tr>
   <td colspan="6" >Risk and protection measures 
   </td>
  </tr>
  <tr>
   <td>Risk/Protection
   </td>
   <td>Email 
   </td>
   <td>Phone verification 
   </td>
   <td>SafetyNet (iOS Push Token)
   </td>
   <td>Captcha
   </td>
   <td>Persistent device ID
   </td>
  </tr>
  <tr>
   <td>User Authentication 
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Bot Prevention (Advanced Attackers)
   </td>
   <td>⍻
   </td>
   <td>⍻
   </td>
   <td>✓
   </td>
   <td>✓
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Manual Attack (Reinstall App, Logout/ Login)
   </td>
   <td>⍻
   </td>
   <td>✓
   </td>
   <td>✓(with device_id)
   </td>
   <td>✗
   </td>
   <td>✓ (with SafetyNet)
   </td>
  </tr>
  <tr>
   <td>Device Farm (Advanced Attackers)
   </td>
   <td>✗
   </td>
   <td>⍻
   </td>
   <td>✓(with device_id)
   </td>
   <td>✓
   </td>
   <td>⍻ (with SafetyNet)
   </td>
  </tr>
</table>
