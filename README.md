# Build Your Own Backend

[![Waffle.io - Issues in progress](https://badge.waffle.io/jenPlusPlus/build-your-own-backend.png?label=in%20progress&title=In%20Progress)](http://waffle.io/jenPlusPlus/build-your-own-backend)

[Project Spec](http://frontend.turing.io/projects/build-your-own-backend.html)

[Heroku Deployment](https://jen-adam-byob.herokuapp.com/)

# API Documentation

## About

This API gives access to NFL team rosters. 

This API is [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API and returns [JSON](http://json.org/).

**********

## Table of Contents

* [Endpoints](#endpoints)
  * [Team Resources](#team-resources)
    * `GET` teams
    * `GET` teams/:id
    * `POST` teams
    * `PATCH` teams/:id
    * `DELETE` teams/:id
  * [Player Resources](#player-resources)
    * `GET` players
    * `GET` teams/:id/players
    * `GET` players/:id
    * `GET` teams/:teamID/players/:playerID
    * `POST` teams/:id/players
    * `PATCH` teams/:teamID/players/:playerID
    * `DELETE` teams/:teamID/players/playerID
* [Contributors](#contributors)
    
**************

## Endpoints

### Team Resources

#### GET `teams`

##### Description

Returns all teams as objects in `teams` array as JSON.

##### Parameters

| parameters | data type | description |
|------------|-----------|-------------|
| id         | integer   | unique id of team            |
| city       | string    | team city            |
| name       | string    | team nickname            |
  
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

##### Errors

none

*************************

#### GET `teams/:id`

##### Description

Returns one team with given unique id as an object as JSON.

##### Recognized Values

| parameters | data type | description |
|------------|-----------|-------------|
| id         | integer   | unique id of team            |
| city       | string    | team city            |
| name       | string    | team nickname            |
  
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

##### Errrors 

* 404: Team does not exist with given unique id

****************
  
#### POST `teams`

##### Description

Create a new team and returns the id of the created team as integer via JSON.

* MUST BE AUTHORIZED TO USE THIS ENDPOINT

##### Essential Information:

| parameter  | data type | description |
|------------|-----------|-------------|
| city       | string    | team city   |
| name       | string    | team name   |

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

##### Errors

* 403: Not authorized - You must have JSON Web Token to access this endpoint.
* 422: Unprocessible Entity - Invalid parameter or parameter value within post body.

****************
  
##### PATCH `teams/:id`

##### Description

Edit team name and city by passing JSON and returns edited team as object via JSON. 

* MUST BE AUTHORIZED TO USE THIS ENDPOINT

##### Potential Information: 

| parameter  | data type | description |
|------------|-----------|-------------|
| city       | string    | team city; e.g. "raleigh"   |
| name       | string    | team name; e.g. "robots"  |


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

##### Errors

* 403: Not authorized - You must generate and include a valid JSON Web Token to access this endpoint.
* 404: Team does not exist with given unique id
* 422: Unprocessible Entity - Invalid parameter or parameter value within post body.

***************
  
#### DELETE `teams/:id`

##### Description

Remove team from database and server returns HTTP status code `204: No Content`.

* MUST BE AUTHORIZED TO USE THIS ENDPOINT

##### Request
  
```
DELETE teams/1708
```
  
##### Response
  
```
// no JSON response
```

##### Errors

* 403: Not authorized - You must generate and include a valid JSON Web Token to access this endpoint.
* 404: Team does not exist with given unique id

*************

### Player Resources

#### GET `players`

##### Description

Returns all players as array of player objects via JSON.

##### Parameters

| parameter | data type | description |
|------------|-----------|-------------|
| id         | integer   | player id, unique; e.g. 203             |
| team_id    | integer   | player team id, e.g. 21            |
| name       | string    | player name, first and last. e.g. "John Wolfe" |
| position   | string    | player position, e.g. "QB", "RB", "SS"            |
| age        | number    | player age, e.g. 34            |
| height     | string    | player height, e.g. "6-5"            |
| weight     | integer   | player weight, e.g. 285            |
| experience | string    | player's number of years in the legaue, R denotes rookie. e.g. '7', 'R'            |
| college    | string    | player college, e.g. 'NC State'            |

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

##### Description

Returns one player with given unique id as object via JSON

##### Request
  
```
GET players/22396
```
  
##### Response
  
```
{
    "player": {
        "id": 22396,
        "team_id": 1712,
        "number": 17,
        "name": "Philip Rivers",
        "position": "QB",
        "age": 36,
        "height": "6-5",
        "weight": 228,
        "experience": "14",
        "college": "NC State",
        "created_at": "2017-12-12T21:25:16.206Z",
        "updated_at": "2017-12-12T21:25:16.206Z"
    }
}
```

****************

#### GET `teams/:id/players`

##### Recognized Values

| parameter | data type | description |
|------------|-----------|-------------|
| id         | integer   | player id, unique; e.g. 203             |
| team_id    | integer   | player team id, e.g. 21            |
| name       | string    | player name, first and last. e.g. "John Wolfe" |
| position   | string    | player position, e.g. "QB", "RB", "SS"            |
| age        | number    | player age, e.g. 34            |
| height     | string    | player height, e.g. "6-5"            |
| weight     | integer   | player weight, e.g. 285            |
| experience | string    | player's number of years in the legaue, R denotes rookie. e.g. '7', 'R'            |
| college    | string    | player college, e.g. 'NC State'            |


##### Request
  
```
GET teams/17/players
```
  
##### Response
  
```
{
    "players": [
     {
         "id": 22396,
         "team_id": 1712,
         "number": 17,
         "name": "Philip Rivers",
         "position": "QB",
         "age": 36,
         "height": "6-5",
         "weight": 228,
         "experience": "14",
         "college": "NC State",
         "created_at": "2017-12-12T21:25:16.206Z",
         "updated_at": "2017-12-12T21:25:16.206Z"
     },
     ...
    ]
}
```

##### Errors

* 404: Team not found - no team associated with supplied unique ID.

*********
  
#### GET `teams/:id/players/:id`

##### Description

Returns one player with given unique id from one team with given unique id as object via JSON.

##### Recognized Values

| parameter | data type | description |
|------------|-----------|-------------|
| id         | integer   | player id, unique; e.g. 203             |
| team_id    | integer   | player team id, e.g. 21            |
| name       | string    | player name, first and last. e.g. "John Wolfe" |
| position   | string    | player position, e.g. "QB", "RB", "SS"            |
| age        | number    | player age, e.g. 34            |
| height     | string    | player height, e.g. "6-5"            |
| weight     | integer   | player weight, e.g. 285            |
| experience | string    | player's number of years in the legaue, R denotes rookie. e.g. '7', 'R'            |
| college    | string    | player college, e.g. 'NC State'            |

##### Request
  
```
GET teams/1/players/22396
```
  
##### Response
  
```
{
    "player": {
        "id": 22396,
        "team_id": 1712,
        "number": 17,
        "name": "Philip Rivers",
        "position": "QB",
        "age": 36,
        "height": "6-5",
        "weight": 228,
        "experience": "14",
        "college": "NC State",
        "created_at": "2017-12-12T21:25:16.206Z",
        "updated_at": "2017-12-12T21:25:16.206Z"
    }
}
```

##### Errors 

* 404: Team / Player not found - no team / player associated with supplied unique IDs.

*********

#### PATCH `teams/:id/players/:id`

##### Description

* MUST BE AUTHORIZED TO USE THIS ENDPOINT

##### Recognized Values

| parameter | data type | description |
|------------|-----------|-------------|
| name       | string    | player name, first and last. e.g. "John Wolfe" |
| position   | string    | player position, e.g. "QB", "RB", "SS"            |
| age        | number    | player age, e.g. 34            |
| height     | string    | player height, e.g. "6-5"            |
| weight     | integer   | player weight, e.g. 285            |
| experience | string    | player's number of years in the legaue, R denotes rookie. e.g. '7', 'R'            |
| college    | string    | player college, e.g. 'NC State'            |

##### Request
  
```
PATCH teams/:id

patch body: {
 token: 'JWT token string'
}
```
  
##### Response
  
```
{
    "player": {
        "id": 22396,
        "team_id": 1712,
        "number": 17,
        "name": "Philip Rivers",
        "position": "QB",
        "age": 36,
        "height": "6-5",
        "weight": 228,
        "experience": "14",
        "college": "NC State",
        "created_at": "2017-12-12T21:25:16.206Z",
        "updated_at": "2017-12-12T21:25:16.206Z"
    }
}
```

##### Errors 

* 403: Not authorized. You must have JSON Web Token to access this endpoint.


**************

#### POST `teams/:id/players`

##### Description

Create a player with a team_id of the given unique team id in the URL

* MUST BE AUTHORIZED TO USE THIS ENDPOINT

##### Required Values

| parameter | data type | description |
|------------|-----------|-------------|
| name       | string    | player name, first and last. e.g. "John Wolfe" |
| position   | string    | player position, e.g. "QB", "RB", "SS"            |
| age        | number    | player age, e.g. 34            |
| height     | string    | player height, e.g. "6-5"            |
| weight     | integer   | player weight, e.g. 285            |
| experience | string    | player's number of years in the legaue, R denotes rookie. e.g. '7', 'R'            |
| college    | string    | player college, e.g. 'NC State'            |

##### Request
  
```
POST teams/17/players
```
  
##### Response
  
```
{
 team: {
  id: 11347,
 }
}
```

##### Errors

* 403: Not authorized. You must have JSON Web Token to access this endpoint.
* 404: Team not found - no team associated with supplied unique ID.


***************

#### DELETE `teams/:id/players/:id`

##### Description

Remove team with given unique id and responds with HTTP 204.

* MUST BE AUTHORIZED TO USE THIS ENDPOINT

##### Request
  
```
DELETE teams/17/players/34875
```
  
##### Response
  
```
{ // no json response }
```

##### Errors

* 403: Not authorized. You must have JSON Web Token to access this endpoint.
* 404: Team / player not found - no team /player associated with supplied unique ID.

**************

#### Contributors:

##### Jen Woodson: 
* GitHub: [@jenPlusPlus](https://github.com/jenPlusPlus)

##### Adam Mescher: 
* GitHub: [@adammescher](https://github.com/adammescher)
