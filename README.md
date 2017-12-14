# Build Your Own Backend

[![Waffle.io - Issues in progress](https://badge.waffle.io/jenPlusPlus/build-your-own-backend.png?label=in%20progress&title=In%20Progress)](http://waffle.io/jenPlusPlus/build-your-own-backend)

[Project Spec](http://frontend.turing.io/projects/build-your-own-backend.html)

[Heroku Deployment]()

# API Documentation

## About

This API gives access to NFL team rosters. 

This API is [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API and returns [JSON](http://json.org/).

**********

## Table of Contents

* [Endpoints](#endpoints)
  * [Team Resources](#team-resources)
    * [`GET` teams](#get-teams)
    * [`GET` teams/:id](#get-'teams/:id')
    * [`POST` teams](#post-teams)
    * [`PATCH` teams/:id](#patch-teams/:id)
    * [`DELETE` teams/:id](#delete-teams/:id)
  * [Player Resources](#player-resources)
    * [`GET` players](#players)
    * [`GET` teams/:id/players](#get-teams/:id/players)
    * [`GET` players/:id](#get-players/:id)
    * [`GET` teams/:teamID/players/:playerID](#get-teams/:id/players/:id)
    * [`POST` teams/:id/players](#post-teams/:id/players)
    * [`PATCH` teams/:teamID/players/:playerID](#patch-teams/:teamID/players/:playerID)
    * [`DELETE` teams/:teamID/players/playerID](#delete-teams/:teamID/players/:playerID)
* [Contributors](#contributors)
    
**************

## Endpoints

### Team Resources

#### GET `teams`

##### Description

Returns all teams as objects in `teams` array.

##### Parameters

* id — Return unique team id
* city — Return team home city via string
* name — Return team name via string
  
##### Request
  
```
GET teams
```
  
##### Return
  
```
{
 "teams": [
  {
   "id": 1702,
   "city": "buffalo",
   "name": "bills",
   "created_at": "2017-12-12T21:25:15.635Z",
   "updated_at": "2017-12-12T21:25:15.635Z"
  },
  {
   "id": 1705,
   "city": "new york",
   "name": "jets",
   "created_at": "2017-12-12T21:25:15.653Z",
   "updated_at": "2017-12-12T21:25:15.653Z"
  },
  ...
}
```

##### Error

none

*************************

#### GET `teams/:id`

##### Recognized Values
  * city - Return team home city via string
  * name - Return team name via string
  * players - Returns team players via array of player objects
  
##### Request
  
```
GET teams/1705
```
  
##### Response
  
```
{
  "team":
   {
    "id": 1705,
    "city": "new york",
    "name": "jets",
    "created_at": "2017-12-12T21:25:15.653Z",
    "updated_at": "2017-12-12T21:25:15.653Z"
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

#### GET `players`

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


*************

#### GET `players/:id`

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

**************

#### Contributors:

##### Jen Woodson: 
* GitHub: [@jenPlusPlus](https://github.com/jenPlusPlus)

##### Adam Mescher: 
* GitHub: [@adammescher](https://github.com/adammescher)
