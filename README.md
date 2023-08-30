Configuracion:

`git clone https://github.com/edusand/prueba-tecnica-tidingo.git`
`cd prueba-tecnica-tidingo`

`npm install`

`sudo dnf install openssl`
`openssl req -newkey rsa:2048 -nodes -keyout server.key -out server.csr`
	Country Name: MX
	State or Province: Nayarit
	City: Tepic
	Organization Name: [Default Company]
	Organization Unit Name: []
	Common Name: localhost
	Email Address: user@email.com
	A Challenge Password: 1234
	An Optional Company Name: []

Ahora tomas tu API Key y la insertas como valor para la variable `API_KEY` de `main.js`

`npm start`