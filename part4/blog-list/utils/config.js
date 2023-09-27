require('dotenv').config()

/* const PORT = process.env.PORT */
/* const MONGODB_URI = process.env.MONGODB_URI
 */

const PORT = 3003
// REMEMBER PASSWORD!
const MONGODB_URI = "mongodb+srv://kakolgab:<password>@fullstack.ilfyoih.mongodb.net/?retryWrites=true&w=majority"

module.exports = {
  MONGODB_URI,
  PORT
}