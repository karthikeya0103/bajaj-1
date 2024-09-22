const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Buffer } = require("buffer");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const createResponse = (isSuccess, userId, email, rollNumber, data = {}, error = null) => {
  return {
    is_success: isSuccess,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    ...data,
    error: error ? error.message : null,
  };
};

app.post("/bfhl", (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    // Validate input data
    if (!Array.isArray(data)) {
      return res.json(createResponse(false, "karthikeya0103", "karthikeya_manam@srmap.edu.in", "AP21110010605", {}, new Error("Invalid input format. Expected an array.")));
    }

    const numbers = [];
    const alphabets = [];

    data.forEach((item) => {
      if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
      } else if (!isNaN(item)) {
        numbers.push(item);
      }
    });

    const highest_alphabet = alphabets.filter((item) => /^[a-z]$/.test(item)).sort().pop() || null;

    // Handle file processing
    let file_valid = false;
    let file_mime_type = "unknown"; // Default to unknown
    let file_size_kb = null;

    if (file_b64) {
      const fileBuffer = Buffer.from(file_b64, "base64");
      file_size_kb = (fileBuffer.length / 1024).toFixed(2); // Size in KB

      // Determine MIME type from the first bytes
      if (file_b64.startsWith("/9j/")) {
        file_mime_type = "image/jpeg";
        file_valid = true;
      } else if (file_b64.startsWith("iVBORw0KGgo")) {
        file_mime_type = "image/png";
        file_valid = true;
      }
    } else {
      file_size_kb = "0"; // No file provided
    }

    const response = createResponse(
      true,
      "karthikeya0103",
      "karthikeya_manam@srmap.edu.in",
      "AP21110010605",
      {
        numbers,
        alphabets,
        highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
        file_valid,
        file_mime_type,
        file_size_kb: file_size_kb || "0", // Ensure it's a string
      }
    );

    res.json(response);
  } catch (error) {
    res.json(createResponse(false, "karthikeya0103", "karthikeya_manam@srmap.edu.in", "AP21110010605", {}, error));
  }
});

// GET returning hardcoded JSON
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
