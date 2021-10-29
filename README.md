## Problem statement
Build a metric logging and reporting service that sums metrics by time window for the most recent hour. You will build a lightweight web server that implements the two main APIs defined below

## Post api:
> - Post request is setting the value with specified key with current timestamp.
> - it also checking if same key is already there then its pushing the value in array.
>
> - if key  is different than its adding the value on that key.

### Data structure of in memory caching
```json
{
  "key": [
    { "value": 12, "timestamp": 106765432 },
    { "value": 15, "timestamp": 106765433 }
  ],
  "key2": [{ "value": 13, "timestamp": 106765434 }]
}
```

```
curl --location --request POST 'http://localhost:3000/metric/name' \
--header 'Content-Type: application/json' \
--data-raw '{
    "value":8981
}a
```

## Get api:-
> Get api is basically give you the sum of all metrics reported for this key over the past hour.


```
curl --location --request GET 'http://localhost:3000/metric/name/sum' \
--header 'Content-Type: application/json' \
--data-raw '{
    "value":89
}'

```

### Quick Start
Clone the repository
```bash
git clone https://github.com/vineeta-chauhan/metics-logging-reporting.git
```

Go inside the directory
```bash
cd metics-logging-reporting
```

Install dependencies
```bash
npm install
```

Start development server
```bash
npm run dev
```

Start production server
```bash
npm start
```
