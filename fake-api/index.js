const apiUrl = 'https://6553cda05449cfda0f2f33b3.mockapi.io/api/v1/fake/Usuarios';

// Datos que deseas enviar en la solicitud POST (pueden ser objetos, FormData, etc.)
const postData = {
  id: 1,
};

// Configuración para la solicitud POST
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Especifica el tipo de contenido JSON
    // Puedes agregar más encabezados según sea necesario
  },
  body: JSON.stringify(postData), 
};

// Realiza la solicitud POST utilizando fetch
 fetch(apiUrl,requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Respuesta de la solicitud POST:', data);
    // Puedes realizar más operaciones con la respuesta aquí
  })
  .catch(error => {
    console.error('Error en la solicitud POST:', error);
  });