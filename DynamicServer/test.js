const fs = require('fs');

const userString = fs.readFileSync('./db/db.json').toString()
const userArray = JSON.parse(userString)
console.log(userArray)

const newUser = {
    "id": 4,
    "name": "newUser",
    "password": "xxx"
}

userArray.push(newUser)
const newString = JSON.stringify(userArray)
fs.writeFileSync('./db/db.json',newString)