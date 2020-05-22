# PugetSound Schools Server
Server-side code, including database management and routes

## Routes

### Auth Routes
|Method|Path|Purpose|
|-----|---------------|-------------------------|
|POST| `/login` |
|POST| `/signup` |

### Users Routes
|Method|Path|Purpose|
|-----|---------------|-------------------------|
|GET| `/` |
|GET| `/students` |
|GET| `/students/:id` |
|GET| `/teacher` |
|GET| `/class/:classid` |
|PUT| `/` |
|PUT| `/classes/:id` |

### Classes Routes
|Method|Path|Purpose|
|-----|---------------|-------------------------|
|GET| `/` |
|GET| `/:id` |
|GET| `/student/:id` |
|GET| `/teacher/:id` |
|POST| `/` |
|PUT| `/signup/:id` |
|PUT| `/:id` |

### Assignments Routes
|Method|Path|Purpose|
|-----|---------------|-------------------------|
|GET| `/` |
|GET| `/class/:classid` |
|GET| `/student/:studentid` |
|GET| `/:id` |
|POST| `/class/:classid` |

## Models

### User
| Column | Type | Notes |
|----------|----------|--------------------|
|firstname| String |
|lastname| String |
|password| String |
|email| String |
|birthdate| Date |
|admin| Boolean |
|position| String |
|grade| String |
|classes| [ObjectId] |
|validPassword| Method |

### Class
| Column | Type | Notes |
|----------|----------|--------------------|
|classname| String |
|subject| String |
|teacher| ObjectId |
|students| [ObjectId, String]
|assignments| [ObjectId] |
|startdate| Date |
|enddate| Date |

### Assignment
| Column | Type | Notes |
|----------|----------|--------------------|
|class| ObjectId |
|teacher| ObjectId |
|students| [ObjectId, String, String] |
|questions| String |
|dateAssigned| Date |
|dateDue| Date |

## Required Technologies
* TypeScript

## Instructions for Use

### Assign a JWT token
Create an evironment variable called "JWT_SECRET"