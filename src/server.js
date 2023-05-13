import express from 'express';
import router from './routes/index.router.js'
import not_found_handler from './middlewares/not_found_handler.js';

const server = express()

const PORT = 8080;
const ready = () => console.log('server ready on port ' + PORT)


server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use('/', router)
server.use('/public', express.static('public'))
server.use(not_found_handler)

server.listen(PORT, ready)