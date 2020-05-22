# PugetSound Schools Server
Server-side code, including database management and routes

## Routes

### Auth Routes
|Method|Path|Purpose|
|-----|---------------|-------------------------|
|POST| `/login` | Takes a user's credentials and logs them in |
|POST| `/signup` | Signs a new user up if their email is unique |

### Users Routes
|Method|Path|Purpose|
|-----|---------------|-------------------------|
|GET| `/` | Returns a stub to ensure controller works. |
|GET| `/students` | Returns all students |
|GET| `/students/:id` | Returns a student by the ID |
|GET| `/teacher` | Returns all teachers |
|GET| `/class/:classid` | Returns all students in a class by the the class ID |
|PUT| `/` | Updates a user's information |
|PUT| `/classes/:id` | Assigns a student to classes they sign up for |

### Classes Routes
|Method|Path|Purpose|
|-----|---------------|-------------------------|
|GET| `/` | Returns all the classes |
|GET| `/:id` | Returns a specific class by ID |
|GET| `/student/:id` | Returns all classes a student has signed up for |
|GET| `/teacher/:id` | Returns all classes a teacher is in control of |
|POST| `/` | Creates a new Class |
|PUT| `/:id` | Updates class by ID |

### Assignments Routes
|Method|Path|Purpose|
|-----|---------------|-------------------------|
|GET| `/` | Returns a stub to ensure the controller works. |
|GET| `/class/:classid` | Returns all assignments for a class |
|GET| `/student/:studentid` | Returns all assignments assigned to a student |
|GET| `/:id` |  |
|POST| `/class/:classid` |  |

## Models

### User

The User model is used to build both students and teachers

| Column | Type | Notes |
|----------|----------|--------------------|
|firstname| String | The user's Given Name |
|lastname| String | The user's Surname |
|password| String | A hashed version of the user's password |
|email| String | The user's email. Must be unique. |
|birthdate| Date | The user's birthdate. |
|admin| Boolean | Determines if the user has Administrator permissions |
|position| String | Specifies whether the user is a Student or Teacher |
|grade| String | Only necessary for Student users. Contains their overall grade. |
|classes| [ObjectId] | An array of ObjectId's referencing classes |
|validPassword| Method | When logging in, hashes the input password and checks if it matches the stored version |

### Class
| Column | Type | Notes |
|----------|----------|--------------------|
|classname| String | The name of the specific class |
|subject| String | What subject the class falls under |
|teacher| ObjectId | The Teacher reference ID |
|teachername| String | The teacher's first and last name
|students| {student:ObjectId, grade:String} |  |
|assignments| [ObjectId] | Any array of reference ID's for assignments assigned to the class |
|startdate| Date | The date the class starts |
|enddate| Date | The date the class ends |

### Assignment
| Column | Type | Notes |
|----------|----------|--------------------|
|class| ObjectId | Reference ID for the class the assignment is assigned to |
|teacher| ObjectId | Reference ID for the teacher in charge of the class |
|students| {id:ObjectId, grade:String, answer:String} | "id" is the reference ID of a student; "grade" is how well the student performed; and "answer" is the response the student provided |
|questions| String | The questions that make up the assignment |
|dateAssigned| Date | The date the assignment begins |
|dateDue| Date | The date the assignment must be complete |

## Required Technologies
* TypeScript
* MongoDB and Mongoose

## Instructions for Use

### Assign a JWT token
Create an evironment variable called "JWT_SECRET"

### Change variable references to reflect your project
* Change the "name" property of package.json to reflect your project