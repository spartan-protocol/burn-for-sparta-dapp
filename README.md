# Spartan - A strictly scarce asset

![Spartan-UI](https://github.com/Spartanasset/Spartan-dapp/blob/master/git/Spartan-ui.png)

## DApp Interface

The Spartan DApp interfaces to the Spartan Smart Contracts.

## Building Locally

**Configuration**

* Set up `.env` to have as a minimum:
```
REACT_APP_TESTNET=FALSE
REACT_APP_INFURA_API=<your-key>
REACT_APP_ETHPLORER_API=freekey
REACT_APP_BLOCKLYTICS_API=<can-leave-empty>
```

```
yarn
yarn start
```

## Deployment

All merges to `dev` branch deploy to: 
* https://Spartan-dapp-dev.web.app

*Testing should be done following a new deploy, prior to merging to master.*

All merges to `master` (from dev) deploy to:
* https://Spartanasset.org (main)
* https://Spartanasset.app (mirror)

## Implementation

* React (functional components & hooks)
* Javascript
* AntDesign
* AntDesignIcons
