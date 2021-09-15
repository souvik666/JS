const express = require('express')
const db = require('./db.json')
let app = express()
app.use(express.json())

/* get '/' this will return all the books */

app.get("/", (req, res) => {
    res.send(db)
})

/* post '/books' - pass an user to it and it will append it to the end of the users and return it */

app.post("/books", validate({ firstname: "required" }), (req, res) => {
    /*  console.log(req.body)
     res.send(req.body) */
})
//get '/books/:id' - this will return user with a specific id
app.get("/books", IDvalidate({ id: "required" }), function (req, res) {
    /* console.log(req.body) */
})

//patch '/books/:id' - pass a different author and published year only and update those on the book that matched the id

app.patch("/books", Pathme({ id: "required", author: "required", published: "required" }), (req, res) => {

})

//delete '/books:id' - delete the book that matched the id

app.delete("/books", deleteme({ id: "required" }), function (req, res) {

})

//deleteing data 

function deleteme(data) {
    return function (req, res, next) {
        Object.keys(data).forEach(function (items) {
            if (data[items] === "required") {
                if (!req.query[items]) {
                    res.send(`please enter the ${items}`)
                } else {
                    let no = (req.query[items])
                    let arr = []
                    db.forEach(function (el) {
                        if (el.id !== Number(no)) {
                            arr.push(el)
                        }

                    })
                    res.send(arr)

                }
            }
        })
        next()
    }
}

//updating the value
function Pathme(data) {
    return function (req, res, next) {
        Object.keys(data).forEach(function (items) {
            if (data[items] === "required") {
                if (!req.query[items]) {
                    res.send(`please enter the ${items}`)
                } else {
                    db.forEach(function (el) {
                        let { id, author, published } = el
                        if (id === Number(req.query['id'])) {
                            el.author = req.query['author']
                            el.published = req.query['published']
                            res.send(el)
                        }

                    })

                }
            }
        })
        next()
    }

}

//get '/books/:id' - this will return user with a specific id
function IDvalidate(data) {
    return function (req, res, next) {
        Object.keys(data).forEach(function (items) {
            if (data[items] === "required") {
                if (!req.query[items]) {
                    res.send(`please enter the ${items}`)
                } else {
                    /* res.send(req.query[items]) */
                    db.forEach(function (el) {
                        let { id } = el
                        if (id === Number(req.query[items])) {
                            res.send(el)
                        }
                    })
                }
            }
        })
        next()
    }

}


//validation function
function validate(data) {
    return function (req, res, next) {
        Object.keys(data).forEach(function (items) {
            if (data[items] === "required") {
                if (!req.query[items]) {
                    res.send(`please enter the ${items}`)
                } else {
                    res.send(req.query[items])
                }
            }
        })
        next()
    }

}

//listing
app.listen(3000, () => {
    console.log("Listing on port 3000")
})