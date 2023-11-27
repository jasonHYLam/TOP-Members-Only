# TOP-Members-Only
A silly little message board app. To view the author and timestamp of each message you have to join the membership.
  This was a fun project that introduced me to using user authentication with PassportJS and ExpresJS. 
  Note that after signing up, you will have to log in manually.
  The membership password is `whatshouldido`

## What I've Learned

Using `PassportJS` to sign users in 
Understanding that `passport.authenticate` returns a function, which then must be called
Use of `ExpressJS` session
Using `bcryptjs` to secure passwords, and creating a `confirmPassword` input with a custom validator
Getting the latest record from MongoDB
Adding a `username already exists` error without using `custom-validator` and displaying it

