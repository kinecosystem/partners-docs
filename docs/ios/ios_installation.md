## Installation
The fastest way to get started with the sdk is with cocoapods (>= 1.4.0).
```
pod 'KinEcosystem', '0.6.3'
```
> Notice for apps using swift 3.2: the pod installation will change your project's swift version target to 4.0</br>
> This is because the sdk uses swift 4.0, and cocoapods force the pod's swift version on the project. For now, you can manually change your project's swift version in the build setting. A better solution will be available soon.

## Usage

> **Important note:** Apps using the sdk must include a NSPhotoLibraryUsageDescription key entry in the info.plist file. This is becuase the sdk may ask to use the photos library when restoring a backed up wallet. For example, you can use something like:</br>
"_Photo library access is required for backup and restore of your kin wallet_"
</br></br>
If your app already includes such an entry, you do not need to change anything.
