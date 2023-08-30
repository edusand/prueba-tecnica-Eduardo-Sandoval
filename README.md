Configuracion:

```
	git clone https://github.com/edusand/prueba-tecnica-Eduardo-Sandoval.git
	cd prueba-tecnica-Eduardo-Sandoval
	
	instalar nodejs de la pagina oficial o instalar homebrew para `brew install node`(mac)
	sudo dnf install nodejs (fedora linux 38)
	npm install
	
	brew install openssl (mac)
	sudo dnf install openssl
	openssl req -newkey rsa:2048 -nodes -keyout server.key -x509 -days 365 -out server.cert
```
	SSL es necesario para usar geolocalizacion en lugares aparte de localhost (android me da mejor precision que fedora)
	(funciona con valores vacios)
		Country Name: []
		State or Province: []
		City: []
		Organization Name: []
		Organization Unit Name: []
		Common Name: localhost
		Email Address: []
```

```npm start```

ir a `https://localhost:8000`
o a `https://<ip-de-la-maquina-en-lan>:8000` (es necesario abrir puertos en la maquina)
