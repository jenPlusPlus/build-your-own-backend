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

Returns all teams as objects in `teams` array as JSON.

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

##### Description

Returns one team with given unique id as an object as JSON.

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

##### Description

Create a new team and returns the id of the created team as integer via JSON.

##### Essential Information:

* city - *string*: City of created team
* name - *string*: Name of created team

##### Request
  
```
POST teams

body: {
 "city": "dayton"
 "name": "triangles"
}
```
  
##### Response
  
```
{
  "id": 1735
}
```

****************
  
##### PATCH `teams/:id`

##### Description

Edit team name and city by passing JSON and returns edited team as object via JSON. 

##### Potential Information: 

* city - *string*: City of created team
* name - *string*: Name of created team

##### Request
  
```
PATCH teams/1715

body: {
  "city": "las vegas" 
}
```
  
##### Response
  
```
{
    "team": {
        "id": 1715,
        "city": "las vegas",
        "name": "raiders",
        "created_at": "2017-12-12T21:25:15.683Z",
        "updated_at": "2017-12-12T21:25:15.683Z"
    }
}
```

***************
  
#### DELETE `teams/:id`

##### Description

Remove team from database and server returns HTTP status code`204: No Content`

##### Request
  
```
DELETE teams/:1708
```
  
##### Response
  
```
// no JSON response
```

*************

### Player Resources

#### GET `players`

##### Description

Returns all players as array of player objects via JSON.

##### Parameters

| parameter | data type | description |
|------------|-----------|-------------|
| id         | integer   |             |
| team_id    | integer   |             |
| name       | string    |             |
| position   | string    |             |
| age        | number    |             |
| height     | string    |             |
| weight     | integer   |             |
| experience | string    |             |
| college    | string    |             |

##### Request
  
```
GET players 
```
  
##### Response
  
```
{
    "players": [
        {
            "id": 21641,
            "team_id": 1703,
            "number": 6,
            "name": "Jay Cutler",
            "position": "QB",
            "age": 34,
            "height": "6-3",
            "weight": 231,
            "experience": "12",
            "college": "Vanderbilt",
            "created_at": "2017-12-12T21:25:15.751Z",
            "updated_at": "2017-12-12T21:25:15.751Z"
        },
        ...
    ]
}
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
