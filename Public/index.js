const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();

app.use(express.static('public'));

app.post('/upload', upload.single('file'), function(req, res) {
  res.send('File uploaded and processed!');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
