const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.port || 4000;

app.use(cors());
app.use(express.json());

app.post('/convert', (req, res) => {
  const { latex } = req.body;
  if (!latex) {
    return res.status(400).send('LaTeX content is required');
  }

  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const inputFile = path.join(tempDir, 'input.tex');
  const outputFile = path.join(tempDir, 'output.pdf');

  fs.writeFileSync(inputFile, latex);

  exec(`pdflatex ${inputFile}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Error converting LaTeX to PDF');
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }

    res.download(outputFile, 'converted_document.pdf', (err) => {
      if (err) {
        console.error(`Error sending file: ${err}`);
      }
      // Clean up temporary files
      fs.unlinkSync(inputFile);
      fs.unlinkSync(outputFile);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});