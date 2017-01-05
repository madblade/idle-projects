# generator-immerse 
Yeoman (Node.js + JavaScript frontapp)-scaffolder and (Heroku, Openshift)-deployer.

## Not really intended for anyone outside of me ATM...

## Installation

First, install [Yeoman](http://yeoman.io) and generator-immerse using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-immerse
```

## Scaffolding

First create a directory:

```bash
mkdir projectName; cd projectName
```

Then, proceed with the generator:

```bash
yo immerse
```

Prefer 'Grunt' or 'Both' buildsystem(s) if you wish to deploy to Openshift/Heroku with this generator.

## Deployment

### Openshift
To deploy to Openshift:

```bash
***add openshift cartridge***
rhc setup
***username*** ***password***
yo immerse:openshift
***project name***
```

To redeploy after modification:

```bash
grunt build
grunt buildcontrol:openshift
```

### Heroku

To deploy to Heroku:

```bash
heroku auth:login
yo immerse:heroku
```

Redeploy:

```bash
grunt build
grunt buildcontrol:heroku
```

NB. With Openshift, sockets have to be mapped to :8000.
However with Heroku, sockets do use autoconfig. 
Hence you MUST init the client connection engine with the 'autoconfig' option set to 'true'.
(client/app/app.js(:28) :: this.connectionEngine.init(true);).

## License

Apache-2.0 © [M. S.]()

