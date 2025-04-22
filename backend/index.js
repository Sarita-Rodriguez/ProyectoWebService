//usamos el protocolo http para lanzar mensaje a nivel de server
var http=require('http');
//crear un servidor para la ejecución del Mensaje
var server = http.createServer();
//creamos una función o método que envíe el mensaje
function mensaje(petic, resp) {
//indica al cliente que la solicitud se ha procesado exitosamente ( 200:es el código de estado)
//se ejecutará la petición con texto plano
resp.writeHead(200, {'content-type': 'text/plain'});
resp.write('Hola Mundo');
resp.end();
}
// Generar la petición al servidor
server.on('request',mensaje);
//Configuramos un puerto y un mensaje en consola para ejecutar
server.listen(3000, function () {
console.log('La Aplicación está funcionando en el puerto 3000');
});