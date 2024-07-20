# Froker

It is backend for the a money lending platform.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

## Run
```bash
nodemon server.js
```

## Signup - /signup
1. User signup into the platform using all the correct details
![alt text](image.png)
2. User who is below 20 years of age
![alt text](image-1.png)
3. User who has a salary of less than 25k
![alt text](image-2.png)
4. Already registered user
![alt text](image-3.png)
5. If user by mistakenly enter an invalid email
![alt text](image-4.png)

## Login - /login
1. User login into the platform using all the correct details
![alt text](image-5.png)
2. If user by mistakenly enters an invalid email
![alt text](image-6.png)
3. If user by mistakenly enters a wrong password
![alt text](image-7.png)
4. If unregistered user tries to login
![alt text](image-8.png)

## Get user - /user
1. Authenticated user tries to access his/her details
![alt text](image-9.png)
2. If user pass in a wrong token or if an unauthenticated person tries to access the data
![alt text](image-10.png)
3. If token not found
![alt text](image-11.png)

## Borrow - /borrow
1. Authenticated and eligible user tries to borrow
![alt text](image-12.png)
2. Non eligible person tries to borrow
![alt text](image-13.png)
3. If token not found
![alt text](image-11.png)