const jwt = require("jsonwebtoken");

/* ----------------------------------------------AUTHENTICATION---------------------------------------- */

const authenticate = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(400)
        .send({ status: false, msg: "token must be present" });
    }
    let verifyToken = jwt.verify(token, "UNIBIT_TASK");
    console.log(verifyToken);
    if (!verifyToken) {
      return res.status(401).send({ status: false, msg: "token is invalid" });
    }
    req.verifyToken = verifyToken;
    console.log("Authentication successfull");
  } catch (error) {
    console.log("Authentication Failed");
    return res.status(500).send({ status: false, msg: error.message });
  }
  next();
};

/* -----------------------------------------AUTHORISATION----------------------------------------------------- */

const auth2 = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];

    console.log(token);

    if (!token) {
      return res
        .status(400)
        .send({ status: false, msg: "token must be present" });
    }

    let verifyToken = jwt.verify(token, "UNIBIT_TASK");

    const { authorId } = req.body;

    let loggedinAuthor = verifyToken.authorId.toString();

    if (authorId !== loggedinAuthor) {
      return res
        .status(403)
        .send({ status: false, msg: "author is not allowed for this request" });
    }
    console.log("Authorise successfull");
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }

  next();
};

module.exports.authenticate = authenticate;

module.exports.auth2 = auth2;
