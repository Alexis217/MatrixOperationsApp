document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const nodeBtn = document.getElementById("node-btn");
  const pythonBtn = document.getElementById("python-btn");
  const sumBtn = document.getElementById("sum-btn");
  const multiplyBtn = document.getElementById("multiply-btn");
  const generateBtn = document.getElementById("generate-matrices");
  const calculateBtn = document.getElementById("calculate");
  const matricesContainer = document.getElementById("matrices-container");
  const resultContainer = document.getElementById("result-container");

  // Variables de estado
  let currentOperation = "sum";
  let currentServer = "node"; // 'node' o 'python'

  // Configuración de servidores
  const serverUrls = {
    node: "http://localhost:4500",
    python: "http://localhost:5000",
  };

  // Selección de servidor
  nodeBtn.addEventListener("click", () => {
    currentServer = "node";
    nodeBtn.classList.add("active");
    pythonBtn.classList.remove("active");
    console.log("Servidor seleccionado: Node.js");
  });

  pythonBtn.addEventListener("click", () => {
    currentServer = "python";
    pythonBtn.classList.add("active");
    nodeBtn.classList.remove("active");
    console.log("Servidor seleccionado: Python");
  });

  // Selección de operación
  sumBtn.addEventListener("click", () => {
    currentOperation = "sum";
    sumBtn.classList.add("active");
    multiplyBtn.classList.remove("active");
    console.log("Operación seleccionada: Suma");
  });

  multiplyBtn.addEventListener("click", () => {
    currentOperation = "multiply";
    multiplyBtn.classList.add("active");
    sumBtn.classList.remove("active");
    console.log("Operación seleccionada: Multiplicación");
  });

  // Generar matrices
  generateBtn.addEventListener("click", () => {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1) {
      alert(
        "Por favor ingrese valores válidos para filas y columnas (números mayores a 0)"
      );
      return;
    }

    generateMatrixInputs("matrix1", rows, cols);
    generateMatrixInputs("matrix2", rows, cols);

    matricesContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");

    console.log(`Matrices generadas: ${rows}x${cols}`);
  });

  // Calcular operación
  calculateBtn.addEventListener("click", async () => {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    const matrix1 = getMatrixValues("matrix1", rows, cols);
    const matrix2 = getMatrixValues("matrix2", rows, cols);

    if (!matrix1 || !matrix2) {
      alert(
        "Por favor complete todos los valores de las matrices con números válidos"
      );
      return;
    }

    try {
      calculateBtn.disabled = true;
      calculateBtn.textContent = "Calculando...";

      const operationData = {
        operation: currentOperation,
        matrix1,
        matrix2,
      };

      const response = await fetch(
        `${serverUrls[currentServer]}/operate-matrices`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(operationData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      displayResult(data.result, currentServer);
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Error al conectar con el servidor ${
          currentServer === "node" ? "Node.js" : "Python"
        }: ${error.message}`
      );
    } finally {
      calculateBtn.disabled = false;
      calculateBtn.textContent = "Calcular";
    }
  });

  // Función para generar inputs de matriz
  function generateMatrixInputs(containerId, rows, cols) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    for (let i = 0; i < rows; i++) {
      const rowDiv = document.createElement("div");
      rowDiv.className = "matrix-row";

      for (let j = 0; j < cols; j++) {
        const input = document.createElement("input");
        input.type = "number";
        input.className = "matrix-cell";
        input.dataset.row = i;
        input.dataset.col = j;
        input.value = "0";
        input.step = "any";
        rowDiv.appendChild(input);
      }

      container.appendChild(rowDiv);
    }
  }

  // Función para obtener valores de matriz
  function getMatrixValues(containerId, rows, cols) {
    const container = document.getElementById(containerId);
    const matrix = [];

    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        const input = container.querySelector(
          `.matrix-cell[data-row="${i}"][data-col="${j}"]`
        );
        const value = parseFloat(input.value);

        if (isNaN(value)) {
          input.focus();
          input.style.borderColor = "red";
          return null;
        }

        input.style.borderColor = "";
        matrix[i][j] = value;
      }
    }

    return matrix;
  }

  // Función para mostrar resultado
  function displayResult(resultMatrix, serverUsed) {
    const resultDiv = document.getElementById("result-matrix");
    resultDiv.innerHTML = "";

    const table = document.createElement("table");

    resultMatrix.forEach((row) => {
      const tr = document.createElement("tr");

      row.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });

      table.appendChild(tr);
    });

    resultDiv.appendChild(table);

    const serverUsedElement = document.getElementById("server-used");
    serverUsedElement.textContent = `Procesado por: ${
      serverUsed === "node" ? "Node.js" : "Python (Flask)"
    }`;

    resultContainer.classList.remove("hidden");

    // Hacer scroll suave al resultado
    resultContainer.scrollIntoView({ behavior: "smooth" });
  }
});
