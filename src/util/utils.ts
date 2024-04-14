export const response = (code: number, body: any) => {
    return {
        statusCode: code,
        body: JSON.stringify(body),
    };
}