# vending-machine

phpmyadmin:
image: phpmyadmin:5.1.0-apache
container_name: phpmyadmin
restart: unless-stopped
ports: - 8200:80
environment:
PMA_HOST: mysql
PMA_PORT: 3306
PMA_USER: laravel8
PMA_PASSWORD: 123456
networks: - app-network
