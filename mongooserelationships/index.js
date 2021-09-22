const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect(`mongodb://127.0.0.1:27017/books`);
};

//books schema
const booksSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    required: true,
  },
  name: { type: "string", required: true },
  body: { type: "string", required: true },
  CheckedOut: false,
  section: { type: "string", required: true },
});
const books = mongoose.model("books", booksSchema);

//author schema
const authorSchema = new mongoose.Schema(
  {
    first_name: { type: "string", required: true },
    last_name: { type: "string", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const author = mongoose.model("author", authorSchema);

//create a new author
/* 127.0.0.1:2345/author */
app.post("/author", async (req, res) => {
  const authorbody = await author.create(req.body);
  return res.status(200).send({ authorbody });
});

//find books that are checked out
/* 127.0.0.1:2345/books/checked */
app.get("/books/checked", async (req, res) => {
  let checked_out_books = await books.find({ CheckedOut: "true" });
  return res.status(200).send({ checked_out_books });
});

//create newbooks
/* 127.0.0.1:2345/newbooks */
app.post("/newbook", async (req, res) => {
  let body = await req.body;
  let createmyBook = await books.create(req.body);
  res.status(200).send({ createmyBook: createmyBook });
});

//get all books
/* 127.0.0.1:2345/books */
app.get("/books", async (req, res) => {
  let myres = await books.find().populate("author").lean().exec();
  res.send(myres);
});

//getsectionwise book
/* 127.0.0.1:2345/sectionwise/A/ */
app.get("/sectionwise/:section", async (req, res) => {
  const qr = req.params.section;
  const fetecdData = await books.find({ section: qr }).populate("author");
  res.status(200).send({ fetecdData });
});

//find books in a section that are not checked out
/* 127.0.0.1:2345/sectionwise/A/true*/
app.get("/sectionwise/:start/:end", async (req, res) => {
  const data = await books.find({
    $and: [{ section: req.params.start }, { CheckedOut: req.params.end }],
  });
  res.send({ data });
});

//find all books written by an author
/* 127.0.0.1:2345/author/hello */
app.get("/author/:author", async (req, res) => {
  let whoisauth = await author.find();
  let dataset = await books.find({ author: whoisauth[0]._id });
  res.send(dataset);
});

//listner
app.listen(2345, async () => {
  await connect();
  console.log(`{listening on port:2345}`);
});
