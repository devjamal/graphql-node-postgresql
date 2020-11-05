var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var app = express();

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        user(id: Int!) :User
        users:[User]
    }
    type User {
          id: ID!,
          name: String,
          email: String,
          mobile_number: String
    }
    type mutation {
        createUser(name: String): User
    }
`);


const Users = [
    {
        id: 1,
        name: 'React.js',
        email: "abc test1",
        mobile_number: "85259639"
    },
    {
        id: 2,
        name: 'Node.js',
        email: "abc test2",
        mobile_number: "8963529639"

    },
    {
        id: 3,
        name: 'JavaScript',
        email: "abc test3",
        mobile_number: "9705259639"
    }
]


let id = 4
class User {
    constructor(user) {
        Object.assign(this, user)
        User.name = user.name || []
        User.id = id++
    }
}


// Root resolver
const root = {
    user: ({ id }) => {
        return Users.find(user => user.id === id)
    },
    users: () => {
        return Users
    },

    createUser: ({ name }) => {
        const user = new Users({ name })
        Users.push(user)
        return user
    }
}
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);



console.log('Running a GraphQL API server at localhost:4000/graphql');