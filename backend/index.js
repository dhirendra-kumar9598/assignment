const express = require("express");
const app = express();
require("./db/config");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const saltRounds = 10;
const products = require("./products");
dotenv.config();
const port = process.env.PORT;
const User = require("./db/models/users");
const Product = require("./db/models/products");
const Cart = require("./db/models/cart");
const Category = require("./db/models/category");
const Order = require("./db/models/orders");
// const Razorpay = require("razorpay");
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.get("/addProducts", async (req, res) => {
  const save = await Product.insertMany(products);
  console.log(save);
  if (save) {
    res.status(200).send({ data: "saved" });
  } else {
    res.status(400).send({ data: "Something went wrong" });
  }
});

app.post("/", async (req, res) => {
  // res.send(req.body.auth);
  const data = await Category.find().limit(10);

  // console.log(data);
  res.send(data);
});

//Sign up from app
app.post("/registerApp", async (req, res) => {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.pass;
  console.log(firstname, lastname, phone, email, password);
  try {
    if (!(firstname && lastname && phone && email && password)) {
      res.status(400).send({ data: "Enter all fields" });
    } else {
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        res.status(400).send({ data: "User already exist" });
      } else {
        const encrPass = await bcrypt.hash(password, 10);
        console.log(encrPass);
        const newUser = new User({
          firstname,
          lastname,
          phone,
          email,
          address: "",
          password: encrPass,
        });
        const result = await newUser.save();
        console.log(result);
        const token = await jwt.sign(
          {
            user: result._id,
          },
          process.env.TOKEN_KEY
        );

        res.status(200).send({ user: token });
      }
    }
  } catch (e) {
    console.log("Something went wrong");
  }
});

//Login api
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, pass } = req.body;
  if (!(email && pass)) {
    res.status(400).send({ user: "Please enter all fields" });
  } else {
    try {
      const data = await User.findOne({ email });

      if (data) {
        const encrpytPass = await bcrypt.compare(
          pass,
          data.password,
          (error, succ) => {
            if (succ) {
              console.log("encrypt");
              const token = jwt.sign({ user: data._id }, process.env.TOKEN_KEY);
              Usertoken = token;
              console.log(token);
              res.status(200).send({ user: token });
            } else {
              console.log("Wrong password");
              res.status(500).send({ err: "Password not matched" });
            }
          }
        );
      } else {
        res.status(400).send({ user: "No user found" });
      }
    } catch (e) {
      console.log(e);
    }
  }
});

//User Detail page
app.get("/userDetails", async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decode.user);
    const userDetails = await User.findById(decode.user).select("-password"); //findbyid find in the id
    if (userDetails) {
      return res.status(200).send({ data: userDetails });
    } else {
      return res.status(400).send({ data: "No user found" });
    }
  } catch (e) {
    console.log(e);
  }
});

//Update user details
app.post("/updateUser", async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decode.user);
    const userDetails = await User.findById(decode.user);
    if (!userDetails) {
      return res.status(400).send({ data: "No user found" });
    }
    console.log(req.body.fname, req.body.lname, req.body.email, req.body.phone);
    const data = await User.updateOne(
      { _id: decode.user },
      {
        firstname: req.body.fname,
        lastname: req.body.lname,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
      }
    );
    console.log(data.matchedCount);
    if (data.matchedCount == 1) {
      res.status(200).send({ status: "Updated" });
    } else {
      res.status(400).send({ status: "Not updated" });
    }
  } catch (e) {
    console.log(e);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = "./uploads";

    fs.access(dir, (error) => {
      if (error) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      } else {
        return cb(null, dir);
      }
    });
  },
  filename: function (req, file, cb) {
    const token = req.headers.token;
    const user = jwt.verify(token, process.env.TOKEN_KEY);
    const user_id = user.user;
    return cb(null, uuidv4() + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/uploadImage", upload.single("file"), async (req, res) => {
  console.log("called");
  const token = req.headers.token;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }
  const decode = jwt.verify(token, process.env.TOKEN_KEY);
  console.log(decode.user);
  const userDetails = await User.findById(decode.user);
  if (!userDetails) {
    return res.status(400).send({ data: "No user found" });
  }
  const imgUrl =
    req.file != null && req.file != undefined ? req.file.path : null;
  console.log("file details ====>", req.file);
  const post = await User.findOneAndUpdate(
    { _id: userDetails._id },
    {
      imageUrl: imgUrl,
    }
  );
  if (post) {
    return res.status(200).send({ data: "success" });
  } else {
    return res.status(400).send({ data: "error" });
  }
});

//Product listing
app.post("/products", async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decode.user);
    const userDetails = await User.findById(decode.user);
    if (!userDetails) {
      return res.status(400).send({ data: "No user found" });
    }
    const products = await Product.find({});
    const resu = JSON.stringify(products);
    // console.log(resu);
    if (products) {
      return res.status(200).send({ data: products });
    } else {
      return res.status(400).send({ data: "Something went wrong" });
    }
  } catch (e) {
    console.log(e);
  }
});

//list distinct category items
app.get("/getCat", async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decode.user);
    const userDetails = await User.findById(decode.user);
    if (!userDetails) {
      return res.status(400).send({ data: "No user found" });
    }
    const catdata = [];
    const categories = await Product.find({}).distinct("category");
    const images = await categories.map(
      async (item) => await Product.findOne({ category: item })
    );
    // Promise.all(images).then((item) => catdata.push(item));
    const pr = await Promise.all(images);
    console.log(categories);
    if (pr) {
      return res.status(200).send({ data: pr });
    } else {
      return res.status(400).send({ data: "Something went wrong" });
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/cart", async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    const userDetails = await User.findById(decode.user);
    if (!userDetails) {
      return res.status(400).send({ data: "No user found" });
    }
    console.log(userDetails);

    const ctItems = await Cart.find({ user_id: userDetails._id });
    const pItems = [];

    ctItems.map((items) => {
      pItems.push(items.id);
    });

    const products = await Product.find({ id: pItems });
    // console.log(products);

    if (products) {
      return res.status(200).send({ data: products });
    } else {
      return res.status(500).send({ data: "Something went wrong" });
    }
  } catch (e) {
    console.log(e);
  }
});

//Category wise items
app.get("/catItem", async (req, res) => {
  const { token, item } = req.headers;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decode.user);
    const userDetails = await User.findById(decode.user);
    if (!userDetails) {
      return res.status(400).send({ data: "No user found" });
    }
    console.log("called");
    const CatItems = await Product.find({
      category: { $regex: new RegExp(item, "i") },
    });
    console.log(CatItems);
    if (CatItems.length > 0) {
      return res.status(200).send({ item: CatItems });
    } else {
      res.status(400).send({ data: "No items" });
    }
  } catch (e) {
    console.log(e);
  }
});

//brand wise items
app.post("/brandItem", async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decode.user);
    const userDetails = await User.findById(decode.user);
    if (!userDetails) {
      return res.status(400).send({ data: "No user found" });
    }
    const { item } = req.headers;
    const BrandItems = await Product.find({
      brand: { $regex: new RegExp(item, "i") },
    });
    if (BrandItems.length > 0) {
      return res.status(200).send({ item: BrandItems });
    } else {
      res.status(400).send({ data: "No items" });
    }
  } catch (e) {
    console.log(e);
  }
});

//For app
app.get("/isItemInCart", async (req, res) => {
  const token = req.headers.token;
  const id = req.headers.id;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }

  try {
    //First we will get user token and then deocde it and obtain th euser id
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decode["user"]);

    const data = await Cart.find({ id: id, user_id: decode["user"] });

    if (data.length != 0) {
      console.log("Item already in cart");
      res.status(200).send({ data: true });
    } else {
      console.log("Item not in cart");
      res.status(401).send({ data: false });
    }
  } catch (e) {
    console.log(e);
  }
});

//Add to cart
app.get("/addToCart", async (req, res) => {
  const token = req.headers.token;
  const id = req.headers.id;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }
  try {
    //First we will get user token and then deocde it and obtain th euser id
    const decode = await jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decode["user"]);

    const data = await Cart.find({ id: id, user_id: decode["user"] });

    if (data.length != 0) {
      // let quant = req.body.quantity;
      // //Bug in incrementing the quantity of product in cart

      // console.log(quant);
      // const result = await Cart.findOneAndUpdate(
      //   { id: req.body.id ,user_id:decode},
      //   { quantity: quant + 1 }
      // );
      // if (result) {
      //   console.log("increased")
      //   res.send({ data: "Quantity increased" });
      // } else {
      //   console.log("not increased")
      //   res.send({ data: "not saved" });
      // }
      console.log("Item already in cart");
      res.status(400).send({ data: "not saved" });
    } else {
      const data = new Cart({
        id: id,
        user_id: decode["user"],
        quantity: 1,
      });

      const result = data.save();
      if (result) {
        res.status(200).send({ data: "saved" });
      } else {
        res.status(400).send({ data: "not saved" });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

app.get("/removeFrmCart", async (req, res) => {
  const { token, id } = req.headers;
  if (!token) {
    return res.status(400).send({ data: "No token found" });
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    // console.log(decode["user"]);
    const item = await Cart.findOneAndDelete({
      id: id,
      user_id: decode["user"],
    });

    if (item) {
      res.status(200).send({ status: "success" });
    } else {
      res.status(500).send({ status: "error" });
    }
  } catch (e) {
    console.log(e);
  }
});

app.get("/getBrands", async (req, res) => {
  const pr = await Product.find().distinct("brand");
  console.log(pr);
  res.send(pr);
});

app.listen(port || 4000, () => {
  console.log("server started");
});
