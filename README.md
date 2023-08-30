Configuracion:

```
	git clone https://github.com/edusand/prueba-tecnica-tidingo.git
	cd prueba-tecnica-tidingo
	
	sudo dnf install nodejs
	npm install
	
	sudo dnf install openssl
	openssl req -newkey rsa:2048 -nodes -keyout server.key -x509 -days 365 -out server.cert
```
	SSL es necesario para usar geolocalizacion en lugares aparte de localhost
		Country Name: MX
		State or Province: Nayarit
		City: Tepic
		Organization Name: [Default Company]
		Organization Unit Name: []
		Common Name: localhost
		Email Address: []
```

Ahora tomas tu API Key y la insertas como valor para la variable `API_KEY` de `main.js`

```npm start```

ir a `https://localhost:8000`
o a `https://<ip-de-la-maquina-en-lan>:8000` (es necesario abrir puertos en la maquina)