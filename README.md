# TOP-Members-Only
![Members-Only](https://github.com/jasonHYLam/TOP-Members-Only/assets/105083538/fd9b850c-e992-4f7e-a1af-a85c0b55c684)
![members-only logged out](https://github.com/jasonHYLam/TOP-Members-Only/assets/105083538/f84933c5-1098-4759-9ec9-86787d2f776e)

Live Link: https://top-members-only.adaptable.app/home

A silly little message board app. To view the author and timestamp of each message you have to join the membership.

Admins can delete messages.

This was a fun project that introduced me to using user authentication with PassportJS and ExpressJS. 
  
Note that after signing up, you will have to log in manually.

The membership password is `whatshouldido`. There is no hint for admin password.


## What I've Learned

- Using `PassportJS` to sign users in 
- Understanding that `passport.authenticate` returns a function, which then must be called
- Use of `ExpressJS` session
- Using `bcryptjs` to secure passwords, and creating a `confirmPassword` input with a custom validator
- Getting the latest record from MongoDB
- Adding a `username already exists` error without using `custom-validator` and displaying it

