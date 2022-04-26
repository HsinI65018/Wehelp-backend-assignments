const express = require('express');
const upload = require('./controller/multer')

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
    res.render('hello')
})

app.post('/api/upload', upload.single('file'), async (req, res) => {
    // console.log(req.file)
    res.json({
        message: "Uploaded!",
        urls: req.file.location
    })
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listen at port 3000')
});