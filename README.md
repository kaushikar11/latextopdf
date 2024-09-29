Here’s the fully corrected and properly formatted **README** file with all the requested content structured in markdown:

---

# 📝 LaTeX to PDF Converter API (Dockerized)

![Docker Pulls](https://img.shields.io/docker/pulls/kaushikkaushik/latextopdf)  
Convert LaTeX code to PDF using an API. Containerized using TeX Live and served through a lightweight Flask API.

---

## 📚 Overview

This project provides an API to convert LaTeX code to PDF. Send LaTeX code as input via a POST request, and the API will return a compiled PDF file. The application is containerized with TeX Live, making it easy to run anywhere using Docker.

- **Input:** LaTeX code (string format)
- **Output:** PDF file
- **Environment:** TeX Live (for compiling LaTeX)
- **Containerization:** Docker for easy deployment

---

## 🚀 Features

- **Simple API:** Easy-to-use API for converting LaTeX to PDF.
- **Containerized:** Runs in a Docker container with all dependencies included.
- **Efficient:** Uses TeX Live for fast and reliable LaTeX compilation.
- **Customizable:** Extend the API to add additional LaTeX features if needed.

---

## 🛠️ Setup

### Prerequisites

1. Install **Docker** on your system.
2. Pull the Docker image:

   ```bash
   docker pull kaushikkaushik/latextopdf:v1
   ```

3. Run the Docker Container:

   ```bash
   docker run -d -p 4000:4000 kaushikkaushik/latextopdf:v1
   ```

This will run the LaTeX to PDF converter API on port 4000.

---

## 📋 API Usage

### Convert LaTeX Code to PDF

**Endpoint:**  
`POST /convert`

### Request Body:

Send the LaTeX code in JSON format.

```json
{
  "latex_code": "Your LaTeX code here"
}
```

### Example Request (using curl):

```bash
curl -X POST http://localhost:4000/convert \
-H "Content-Type: application/json" \
-d '{"latex_code": "Your LaTeX code here"}' \
--output output.pdf
```

The PDF will be saved as `output.pdf`.

---

## 💻 Local Development

### Clone the Repository:

```bash
git clone https://github.com/kaushikkaushik/latextopdf.git
cd latextopdf
```

### Build and Run the Docker Image Locally:

If you want to build the image locally:

```bash
docker build -t latextopdf .
docker run -d -p 4000:4000 latextopdf
```

---

## 📦 Docker Hub

The image is also available on Docker Hub:
![Docker Image](docker.io/kaushikkaushik/latextopdf:v1)
```bash
docker pull kaushikkaushik/latextopdf:v1
```

---

## 🧪 Example LaTeX Code

You can use this LaTeX example to test the API:

```latex
\documentclass{article}
\begin{document}
Hello, World! This is a LaTeX document.
\end{document}
```

---

## ⚙️ Technologies Used

- **TeX Live:** Comprehensive LaTeX distribution.
- **Docker:** Containerization for easy deployment.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Developed by Kaushik.

---

## 🌟 Show your support

Give a ⭐️ if you like this project!

---

This README file is now properly formatted with all the necessary instructions, examples, and relevant code blocks.

