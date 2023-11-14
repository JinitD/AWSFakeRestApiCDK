const FAKE_API = process.env.API_FAKE;
exports.fakeLambda = async (event) => {

    console.log("fake API!!")

    try {
        const request = {
            method: event.httpMethod,
            headers: { 'Content-Type': 'application/json' },
            body: event.body,
        };

        var datos = await fetch(FAKE_API, request)
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log('respuesta :', response);
                return response;
            })
            .then(async data => {
                console.log('Datos obtenidos:', data);
                return data;
            })


        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Se agrego correctamente"
                , datos: datos
            }),
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }


}

