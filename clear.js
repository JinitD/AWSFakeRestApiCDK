const fs = require('fs');
const path = require('path');

let directory = './Out';

// Función para eliminar una carpeta y su contenido de forma recursiva
function deleteFolderRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) { // Recurse
        deleteFolderRecursive(curPath);
      } else { // Delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
}

// Limpia la carpeta
deleteFolderRecursive(directory);

console.log(`La carpeta ${directory} ha sido limpiada.`);