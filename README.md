# Post api:
## post request is setting the value with specified key with timestamp.
## it also checking that if key is same but value is diffrent  than its adding the value as an array with that key.
## if key  is differnt than its adding the value on that key.
```
curl --location --request POST 'http://localhost:3000/metric/name' \
--header 'Content-Type: application/json' \
--data-raw '{
    "value":8981
}a
```

# Get api:-
## get api is basically give you the all data with specified key and thiere sum according to recent timeStamp.

```
curl --location --request GET 'http://localhost:3000/metric/name/sum' \
--header 'Content-Type: application/json' \
--data-raw '{
    "value":89
}'

```
