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

### Get app URL

```
cf apps
```

### Test app

```
curl --location --request POST 'https://**********-***-decrypt.cfapps.******.hana.ondemand.com/' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'jweToken=.kfgdYJSZzf2wuZM6aWZAe9tT9q2L04RwPZ108jcv4a8tsmYG_XHQmkqgt........z9GyHnr9ZYKqgHphIIwGuE'
```
