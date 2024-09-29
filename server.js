const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

app.post('/convert', (req, res) => {
  const { latex } = req.body;
  if (!latex) {
    return res.status(400).send('LaTeX content is required');
  }

  const tempDir = path.join(__dirname, 'temp');

  // Create temp directory if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const inputFile = path.join(tempDir, 'input.tex');
  const outputFile = path.join(tempDir, 'input.pdf');

  // Write LaTeX content to the input file
  fs.writeFileSync(inputFile, latex);

  // Convert LaTeX to PDF using pdflatex
  exec(`pdflatex -output-directory=${tempDir} ${inputFile}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during LaTeX to PDF conversion: ${error.message}`);
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Error converting LaTeX to PDF');
    }

    if (stderr) {
      console.error(`pdflatex stderr: ${stderr}`);
    }

    // Verify if the PDF file has been created
    if (!fs.existsSync(outputFile)) {
      console.error('PDF file not found after conversion');
      return res.status(500).send('PDF generation failed');
    }

    // Send the PDF file to the client
    res.download(outputFile, 'converted_document.pdf', (err) => {
      if (err) {
        console.error(`Error sending file: ${err.message}`);
      }

      // Clean up temporary files asynchronously
      fs.unlink(inputFile, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Failed to delete input file: ${unlinkErr.message}`);
        }
      });
      fs.unlink(outputFile, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Failed to delete output file: ${unlinkErr.message}`);
        }
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
