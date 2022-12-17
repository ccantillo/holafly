const {swapiService} = require('../services')
const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {

        try {
            let people = await swapiService.getPeople(req.params.id, app);
            res.send(people);
        } catch (error) {
            res.send(error);
        }

    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {

        try {
            let planet = await swapiService.getPlanet(req.params.id, app);
            res.send(planet);
        } catch (error) {
            res.send(error) 
        }

    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        try {
            let WeightOnPlanet = await swapiService.getRandomWeightOnPlanet(req.params.id, app);
            res.json(WeightOnPlanet);
        } catch (error) {
            res.status(error.status);
            res.send(error.message);
        }
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;