1. 配置ssl(startcom ..etc.)

	server {
		listen 443 ssl;
		server_name xxxx xxxx;
		ssl_certificate (path to cert);
		ssl_certificate_key (path to cert key);
	}

	server{//rewrite to https，很多方法，这是其中之一
		listen 80;
		server_name yyyy yyy;
		return 301 https://$server_name$request_uri;
	}