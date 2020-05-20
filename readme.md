# PugetSound Schools Server
Server-side code, including database management and routes

## Routes
### Auth
* POST, '/login',
* POST, '/signup',

### Users
* GET,  '/students',    all students
* GET,  '/teachers',    all teachers
* GET,  '/students/:classid',   students by class
* PUT,  '/',            Update user info

### Classes
* POST, '/',                Create a new class
* GET,  '/:id',             Get a class by ID
* PUT,  '/students/:id',    Add/remove students for a class
* PUT,  '/:id',             Update information for a class
* GET,  '/student/:id',     Get all classes for a student by ID
* GET,  '/teacher/:id',     Get all classes for a teacher by ID

### Assignments
* POST, '/class/:classid',
* GET,  '/class/:classid',
* GET,  '/student/:studentid',
* GET,  '/:id

## Required Technologies
* TypeScript