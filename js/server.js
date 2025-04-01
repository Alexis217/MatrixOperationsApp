const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Endpoint para operaciones con matrices
app.post("/operate-matrices", (req, res) => {
  try {
    const { operation, matrix1, matrix2 } = req.body;
    let result;

    if (operation === "sum") {
      result = sumMatrices(matrix1, matrix2);
    } else if (operation === "multiply") {
      result = multiplyMatrices(matrix1, matrix2);
    } else {
      throw new Error("Operación no válida");
    }

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Funciones para operaciones con matrices (igual que antes)
function sumMatrices(matrix1, matrix2) {
  return matrix1.map((row, i) => row.map((val, j) => val + matrix2[i][j]));
}

function multiplyMatrices(matrix1, matrix2) {
  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrix1[0].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

const PORT = 4500;
app.listen(PORT, () => {
  console.log(`Servidor Node.js/Express corriendo en http://localhost:${PORT}`);
});
