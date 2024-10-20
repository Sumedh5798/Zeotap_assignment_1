# Application 1: Rule Engine with AST
Created the application using Node.js for the backend, Mongoose for the database and Ejs for the frontend.

## Dependencies:-
"dependencies": {
    "body-parser": "^1.20.3",
    "ejs": "^3.1.10",
    "express": "^4.21.1",
    "mongoose": "^8.7.2"
  }
For the dependencies installation please follow these steps
npm i body-parser ejs express mongoose
When you fork the project make sure your running the on the port no 3000.

## Pictures of project:-

![image](https://github.com/user-attachments/assets/87801bdf-a2ff-44df-802e-cfce73570d59)

![image](https://github.com/user-attachments/assets/1b3b6c83-c863-4dd2-b18e-c4e201cfda70)

![image](https://github.com/user-attachments/assets/d53e1d13-86a2-498f-a7ed-05081440026e)


 

If candidate is eligible, you will see this result

 

If candidate is not eligible you will see this result


 



## How to use this app: -
1.Once project is open in vs code type this command node app.js the code will run and then go to the chrome and in URL section type http://localhost:3000/ then app is ready to use.

2.First of all, in the create rule section add your rule and then click on the click rule button Note (Your rule should be in a particular format
 Ex 1. age > 30 AND salary > 50000 
 Ex2. ((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)  

Please use this type of format to create rule.
3.Then in evaluate section select the rule you want to use then add the candidate information then click on the Evaluate button then you going to redirect of evaluate page where you get the answer whether the candidate is eligible or not. 

Github link- https://github.com/Sumedh5798/Zeotap_assignment_1/tree/master
