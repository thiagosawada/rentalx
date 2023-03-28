Car rental API in Node.js, using Express, TypeORM, tsyringe, PostgreSQL, Nodemailer, Handlebars, Jest, Swagger, AWS S3, EC2, PM2, Sentry, Docker and GitHub Actions

### Car registration
**FR**  
It must be possible to register a new car.  

**UC**  
It should not be possible to register a car with an existing license plate.  
The car should be registered with availability by default.  
The user responsible for the registration must be an administrator user.  

### Car listing
**FR**  
It must be possible to list all available cars.  
It must be possible to list all available cars by category name.  
It must be possible to list all available cars by brand name.  
It must be possible to list all available cars by car name.  

**UC**  
The user does not need to be registered in the system.  

### Car specification registration
**FR**  
It must be possible to register a specification for a car.  

**UC**  
It should not be possible to register a specification for an unregistered car.  
It should not be possible to register an existing specification for the same car.  
The user responsible for the registration must be an administrator user.  

### Car image registration
**FR**  
It must be possible to register the car's image.  

**NFR**  
Use multer for file uploads.  

**UC**  
The user must be able to register more than one image for the same car.  
The user responsible for the registration must be an administrator user.  

### Car rental
**FR**  
It must be possible to register a rental.  

**UC**  
The rental must have a minimum duration of 24 hours.  
It should not be possible to register a new rental if there is already one open for the same user.  
It should not be possible to register a new rental if there is already one open for the same car.  
The user must be logged into the application.  
When renting a car, the car's status must be changed to unavailable.  

### Car return
**FR**  
It must be possible to return a car.  

**UC**
If the car is returned with less than 24 hours, a full day should be charged.  
When returning, the car should be made available for another rental.  
When returning, the user should be made available for another rental.  
When returning, the total rental amount should be calculated.  
If the return time is later than the scheduled delivery time, a proportional fine should be charged for the delay.  
If there is a fine, it should be added to the total rental amount.  
The user must be logged into the application.  

### Listing of rentals for the user
**FR**  
It must be possible to search for all rentals for the user.  

**UC**  
The user must be logged into the application.  

### Password recovery
**FR**  
It must be possible for the user to recover the password by providing the email.  
The user must receive an email with the steps to recover the password.  
The user must be able to enter a new password.  

**UC**  
The user needs to enter a new password.  
The link sent for recovery must expire in 3 hours.  
