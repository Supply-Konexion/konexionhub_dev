const config = {
  port: process.env.PORT || 3001,
  //recoveryUrl: "http://localhost:3000/recovery",
  //baseUrl: "http://localhost:3000",
  baseUrl: "http://web.usame.aplios.software/",
  DBNAME: "konexionbd",
  DBUSER: "root",
  DBPASS: "root",
  /*DBNAME: "apliosso_usame",
  DBUSER: "apliosso_usame",
  DBPASS: "apliosso_usame",*/
  mailFrom: "info@mg.simplesas.com",
  domain: "mg.simplesas.com",
  mailgunApiKey: "0e6f923e1c910e9a21b3de7778694357-86220e6a-f4039c25",
};

module.exports = { config };
