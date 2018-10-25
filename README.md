# TypeScript SuperNode Starter

A starter template for TypeScript and Node for Supernode.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install Node 8 LTS

```
brew install node@8
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository to your github repository folder

```
$ git clone https://github.com/supernode-as/TypeScript-SuperNode-Starter.git
```

Run install

```
$ npm install
$ npm audit fix
```
Configure database

```
$ brew install mongodb
$ mkdir -p /data/db
````
Give your user account ownership and permissions to the db files
```
$ sudo chown -R `id -un` /data/db
```
Now you can run mongodb from terminal
```
$ mongod
```
Now you can run the project
```
$ gulp
```
This will start the webserver on port 3001. You can access the webpage on link below. Nodemon is watching for changes and browsersync will refresh on changes.

http://localhost:3001

## Starting coding
Templates are defined with nunjucks in `\views\`

Sass files are located in `\src\public\css`

To run a build you run following command
```
npm run build
```