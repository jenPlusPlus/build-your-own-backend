# Build Your Own Backend

[![Waffle.io - Issues in progress](https://badge.waffle.io/jenPlusPlus/build-your-own-backend.png?label=in%20progress&title=In%20Progress)](http://waffle.io/jenPlusPlus/build-your-own-backend)

# API Documentation

## About

This API gives access to NFL team rosters. 

This API is [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API and returns [JSON](http://json.org/).

**********

## Table of Contents

* [Endpoints](#endpoints)
  * [Team Resources](#team-resources)
    * [`GET` teams](#get-teams)
    * [`GET` teams/:id](#get-teams)
    * [`POST` teams](#)
    * [`PATCH` teams/:id](#)
    * [`DELETE` teams/:id](#)
  * [Player Resources](#player-resources)
    * [`GET` teams/:id/players](#)
    * [`GET` teams/:teamID/players:playerID](#)
    * [`POST` teams/:id/players](#)
    * [`PATCH` teams/:teamID/players/:playerID](#)
    * [`DELETE` teams/:teamID/players/playerID](#)
    
**************

## Endpoints

### Team Resources

#### GET `teams`

##### Recognized Values
  
* city — Return team home city via string
* name — Return team name via string
* players - Returns team players via array of player objects
  
##### Request
  
```
GET teams
```
  
##### Return
  
```
{
  ARI: {
    city: "arizona",
    name: "cardinals"
    players: [ ... ]
  },
  ATL: {
    city: "atlanta",
    name: "falcons",
    players: [ ... ]
  },
  ...
}
```

*************************

#### GET `teams/:id`

##### Recognized Values
  * city - Return team home city via string
  * name - Return team name via string
  * players - Returns team players via array of player objects
  
##### Request
  
```
GET teams/:id
```
  
##### Response
  
```
{
  "ATL: {
    "city": "atlanta",
    "name": "falcons",
    "players": [ ... ]
  }
}
```

****************
  
#### POST `teams`

##### Recognized Values
* Bullet 1
* Bullet 2

##### Request
  
```
POST teams
```
  
##### Response
  
```
{ response }
```

****************
  
##### PATCH `teams/:id`

##### Recognized Values
* Bullet 1
* Bullet 2

##### Request
  
```
PATCH teams/:id
```
  
##### Response
  
```
{ response }
```

***************
  
#### DELETE `teams/:id`

##### Recognized Values
* Bullet 1
* Bullet 2

##### Request
  
```
DELETE teams/:id
```
  
##### Response
  
```
{ response }
```

*************

### Player Resources

#### GET `teams/:id/players`

##### Recognized Values
* Bullet 1
* Bullet 2

##### Request
  
```
PATCH teams/:id
```
  
##### Response
  
```
{ response }
```

*********
  
#### GET `teams/:id/players/:id`

##### Recognized Values
* Bullet 1
* Bullet 2

##### Request
  
```
PATCH teams/:id
```
  
##### Response
  
```
{ response }
```

*********

#### PATCH `teams/:id/players/:id`

##### Recognized Values
* Bullet 1
* Bullet 2

##### Request
  
```
PATCH teams/:id
```
  
##### Response
  
```
{ response }
```

**************

#### POST `teams/:id/players`

##### Recognized Values
* Bullet 1
* Bullet 2

##### Request
  
```
PATCH teams/:id
```
  
##### Response
  
```
{ response }
```

***************

#### DELETE `teams/:id/players/:id`

##### Recognized Values
* Bullet 1
* Bullet 2

##### Request
  
```
PATCH teams/:id
```
  
##### Response
  
```
{ response }
```


#### GitHub contributors:

Jen Woodson: @jenPlusPlus

Adam Mescher: @adammescher
