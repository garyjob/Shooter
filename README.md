# Shooter
This is a arm version of NodeJS that will run on Raspberry API to shoot nerver guns when it receives a HTTP POST Request

## Setting up
#### Installing Nodejs
```console
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
```

#### Installing dependency library
```console
git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin
make
sudo make install
sudo adduser $USER gpio
```

#### Installing project
```console
npm install
```

## Running

Test run
```console
node nerve_gun.js 7
```

## Daemonizing

Setting up RC job for raspberry pi
```console
su pi -c 'node /home/pi/server.js < /dev/null &'
```

