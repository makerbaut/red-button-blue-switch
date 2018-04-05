## The Setup

It was a bad day for our new colleague Jessica. While migrating valuable printer
testing metrics between our short-term and long-term repositories, her script
overloaded and encountered a memory exception! The mangled data was stored in a
Redis database but the integrity cannot be trusted. Luckily, we
have found a way to verify the overall collection.

## The Task

Included in this repo are the Redis database and several scripts to help you untangle
this mess. You are to build an application that can read from the database, run
some analytics on each item, and report a final checksum to the included HTTP server.
The following steps should provide an outline for your code:

1. Connect to the Redis database. Inside Docker, it will be available at `redis://redis:6379`.
1. Read every key in the database. Each key will correspond to either a List or Set.
1. For each list or set, collect all the items (each item will be an integer (>= 1) represented as a string) into an array and run the following analysis:
   1. Scan the array for any numerical anagrams (`123` is a numerical anagram of `321`, as is `212` of `221`). If it contains any numerical anagrams, skip this array and continue to the next.
   1. If any two numbers in the array can be divided together to equal `177`, skip this array and continue to the next.
   1. Otherwise, find the difference between the maximum value in the array and the minimum value. Store this result.
1. Sum the differences collected above. This is your checksum.
1. Send that checksum as the path of an HTTP request to `http://answer:3000`, ex. if your checksum is 1500, `GET http://answer:3000/1500`. That server will use bcrypt to verify your answer. It will return a status code of `200` if correct and `400` if not.

## Deliverables

A pull request containing:

1. Your application (in your language of choice)
1. Write a `Dockerfile` to run your app
1. Updates to `docker-compose.yml` under the `app:` section to run your application as part of the overall set of services. We will expect to run `docker-compose up app` and see your code executed, covering all the steps above.

## Example

If the arrays extracted from Redis were:
```js
[1, 2, 3, 4, 5] // diff: 5 - 1 = 4
[100, 150, 215, 80, 152] // skipped, 215 and 152 are numerical anagrams
[500, 354, 50, 2, 99] // skipped, 354 / 2 = 177
[3001, 4, 1, 9, 500] // diff: 3001 - 1 = 3000
```
Your checksum would be `3004`.

## Tools/Notes

- `docker-compose up verify` will check if the Redis DB can handle requests and if the data looks as expected. It will also send a request to the answer server to test its connectivity.
- If you have any issues setting up this project, please post an issue and we will be alerted. Or contact your recruiter to pass us a message.
- This project was most recently tested using Docker Engine 17.12.0-ce and Docker Compose 1.18.0
