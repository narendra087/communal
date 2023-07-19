import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

// ??? BODYPARSER: Body parsing middleware for NodeJS
import bodyParser from 'body-parser'

// ??? CORS: Connext/Express middleware
import cors from 'cors'

// ??? MONGOOSE: Schema-based solution to model MongoDB
import mongoose from 'mongoose'

// ??? MULTER: Handling multipart/form-data, for uploading files
import multer from 'multer'

// ??? HELMET: Secure express app by setting HTTP response headers
import helmet from 'helmet'

// ??? MORGAN: HTTP request logger
import morgan from 'morgan'

import { fileURLToPath } from 'url'

// ***** Configuration

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// ??? Set directory of static files
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// ***** File Storage Setup
const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, 'public/assets')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

// ***** Mongoose Setup
const PORT = process.env.PORT || 6006
mongoose.connect(process.env.MONGO_URL, {
  useNewURLParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch((error) => console.log(error))