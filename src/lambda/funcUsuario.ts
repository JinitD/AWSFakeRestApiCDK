import { response } from "../util/utils";
import fetch from "node-fetch";

export const funcUsuario = async (eventevent: any, context: any) => {
    try {
        if (!eventevent.body) {
            return response(400, { message: 'Se esperaba contenido en el cuerpo' });
        }
        const URL_BUILD = process.env.BASE_URL+"/usuarios";

        const request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        var data = await fetch(URL_BUILD,request)
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log('respuesta :', response);
                return response.json();
            })

        return response(200, {message: "Operacion realizada correctamente", data: data});

    } catch (error: any) {
        console.log(error)
        return response(500, { error: error.message });
    }
};
