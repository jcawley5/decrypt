## Prerequisites

- SAP Cloud Foundry account
- [Cloud Foundry CLI](https://developers.sap.com/tutorials/cp-cf-download-cli.html)

## To Deploy

### Log into your Cloud Foundry account for example...

```
cf login -a https://api.cf.us10.hana.ondemand.com/
```

### Build the app

```
mbt build
```

### Deploy the app

```
cf deploy mta_archives/decrypt_1.0.0.mtar
```
