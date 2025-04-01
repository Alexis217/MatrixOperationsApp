# **App de Operaciones con Matrices**

**Una aplicación web con doble backend (Node.js + Python) para cálculos con matrices**

## **📌 Resumen**

Este proyecto es una aplicación web que permite a los usuarios realizar **sumas y multiplicaciones de matrices** utilizando un backend en **Node.js/Express** o **Python/Flask**. El frontend es compartido entre ambos servidores, demostrando cómo diferentes tecnologías pueden manejar las mismas operaciones.

### **✨ Características Clave**

✅ **Soporte para doble backend** – Alterna entre Node.js y Python para los cálculos  
✅ **Operaciones con matrices** – Suma o multiplica matrices de dimensiones válidas  
✅ **Interfaz interactiva** – Generación dinámica de entradas según el tamaño de la matriz  
✅ **Manejo de errores** – Valida entradas y muestra errores descriptivos

## **🚀 Tecnologías Utilizadas**

| **Frontend** | **Backend**       |
| ------------ | ----------------- |
| HTML5        | Node.js (Express) |
| CSS3         | Python (Flask)    |
| JavaScript   |

## **⚙️ Instalación y Configuración**

### **Requisitos Previos**

- Node.js (v14+)
- Python (v3.8+)
- npm / pip

### **Pasos de Instalación**

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Alexis217/MatrixOperationsApp.git
   ```

2. **Configurar el servidor de Node.js**

   ```bash
   cd js
   npm install
   ```

3. **Configurar el servidor de Python**

   ```bash
   cd python
   pip install flask
   ```

4. **Ejecutar los servidores**

   - **Servidor Node.js (Express)**

     ```bash
     cd js
     node server.js
     ```

     (Corre en `http://localhost:4500`)

   - **Servidor Python (Flask)**
     ```bash
     cd python
     python app.py
     ```
     (Corre en `http://localhost:5000`)

5. **Abrir en el navegador**  
   Visita cualquiera de estas opciones:
   - `http://localhost:4500` (Node.js)
   - `http://localhost:5000` (Python)

## **📖 Uso**

1. **Selecciona un backend** (Node.js o Python)
2. **Elige una operación** (Suma o Multiplicación)
3. **Introduce las dimensiones de la matriz** (filas y columnas)
4. **Llena los valores de la matriz**
5. **Haz clic en "Calcular"** para ver el resultado

## **📂 Estructura del Proyecto**

```
MatrixOperationsApp/
├── js/       # Backend en Node.js (Express)
│   └── server.js
├── python/     # Backend en Python (Flask)
│   └── app.py
└── public/            # Archivos frontend compartidos
    ├── index.html
    ├── style.css
    └── script.js
```

**🌟 ¡Disfruta calculando matrices de forma sencilla!**  
👉 _Pruébalo ahora con_ `Node.js` _o_ `Python`!
