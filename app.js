const express = require('express');
const engine = require('ejs-locals');
const pool = require('./model/utility.js');
const upload = require('./controller/multer.js');

const app = express();

app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err){
            console.log(err);
        }else{
            connection.query('SELECT message, filePath FROM message', (err, result) => {
                if(err){
                    console.log(err);
                }else{
                    // console.log(result);
                    res.render('index', {data: result})
                    connection.release();
                }
            })
        }
    })
})

app.post('/api/upload', upload.single('file'), async (req, res) => {
    // console.log(req.file)
    const fileURL = `https://d14pt48ka0wwug.cloudfront.net/${req.file.originalname}`;
    const {msg} = req.body;

    pool.getConnection((err, connection) => {
        if(err){
            console.log(err)
        }else{
            connection.query(`INSERT INTO message (message, filePath) VALUES(?,?)`, [msg, fileURL],  (err, result) => {
                if(err){
                    console.log(err)
                }else{
                    // console.log(result)
                    connection.release();
                }
            })
        }
    })
    res.json({
        success: "true",
        urls: req.file.location
    })
})


const port = 3000;
const host = '0.0.0.0';

app.listen(port, host);
console.log('Server listen at port 3000');