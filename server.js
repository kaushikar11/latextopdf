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
  console.log('Received LaTeX content:', latex); // Log received LaTeX content

  if (!latex) {
    console.error('LaTeX content is required');
    return res.status(400).send('LaTeX content is required');
  }

  const tempDir = path.join(__dirname, 'temp');
  console.log('Temporary directory:', tempDir); // Log temporary directory path

  // Create temp directory if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log('Created temporary directory'); // Log when directory is created
  }

  const inputFile = path.join(tempDir, 'input.tex');
  const outputFile = path.join(tempDir, 'input.pdf');
  console.log('Input file path:', inputFile); // Log input file path
  console.log('Output file path:', outputFile); // Log output file path

  // Write LaTeX content to the input file
  fs.writeFileSync(inputFile, latex);
  console.log('LaTeX content written to input file'); // Log after writing to the file

  // Convert LaTeX to PDF using pdflatex
  exec(`pdflatex -output-directory=${tempDir} ${inputFile}`, (error, stdout, stderr) => {
    console.log('Executing pdflatex command'); // Log before executing command

    if (error) {
      console.error(`Error during LaTeX to PDF conversion: ${error.message}`);
      console.error(`Full error: ${error}`); // Log full error object
      console.error(`stdout: ${stdout}`); // Log standard output
      console.error(`stderr: ${stderr}`); // Log standard error
      return res.status(500).send('Error converting LaTeX to PDF');
    }

    if (stderr) {
      console.error(`pdflatex stderr: ${stderr}`); // Log any stderr messages
    }

    // Verify if the PDF file has been created
    if (!fs.existsSync(outputFile)) {
      console.error('PDF file not found after conversion');
      return res.status(500).send('PDF generation failed');
    }
    
    console.log('PDF file created successfully'); // Log when PDF is successfully created

    // Send the PDF file to the client
    res.download(outputFile, 'converted_document.pdf', (err) => {
      if (err) {
        console.error(`Error sending file: ${err.message}`);
      } else {
        console.log('PDF file sent to client'); // Log when file is sent successfully
      }

      // Clean up temporary files asynchronously
      fs.unlink(inputFile, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Failed to delete input file: ${unlinkErr.message}`);
        } else {
          console.log('Input file deleted successfully'); // Log when input file is deleted
        }
      });
      fs.unlink(outputFile, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Failed to delete output file: ${unlinkErr.message}`);
        } else {
          console.log('Output file deleted successfully'); // Log when output file is deleted
        }
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
