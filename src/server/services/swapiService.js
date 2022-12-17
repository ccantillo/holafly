const fetch = require('node-fetch');
const {swPeople, swPlanet} = require('../../app/db')


const checkAvailability = async (id, model, url, app) => {

    let record = await model.findByPk(id);

    if (!record){
        record = await app.swapiFunctions.genericRequest(url, 'GET', null, true);
    }

    return record
}

const checkPeopleFields = async (people, app) => {

    if (!people.homeworld_id) {
        let planetId = people.homeworld.slice(-2, -1)
        let planet = await getPlanet(planetId, app)
        people.homeworld_name = planet.name
        people.homeworld_id = `/planets/${planetId}`
    }

    return people
}

const getPeople = async (id, app) => {

    let people = await checkAvailability(id, swPeople, `https://swapi.dev/api/people/${id}`, app);

    people = await checkPeopleFields(people, app)

    return people

}

const getPlanet = async (id, app) => {

    let planet = await checkAvailability(id, swPlanet, `https://swapi.dev/api/planets/${id}`, app);

    return planet

}

const getRandomWeightOnPlanet = async (id, app) => {

    let peopleId = Math.floor(Math.random() * 20);
    let planetId = Math.floor(Math.random() * 20);

    let people = await getPeople(peopleId, app);
    let planet = await getPlanet(planetId, app);

    let planetGravity = planet.gravity[0];
    let weight = 0;

    let homeWorldId = people.homeworld.slice(-2, -1)

    if (planetId === homeWorldId) throw {status: 400, message: "se esta intentando saber el peso en el planeta natal"}

    if (!isNaN(planetGravity)) {
        weight = Number(planetGravity) * Number(people.mass)
    }

    return weight

}

module.exports = {
    getPeople,
    getPlanet,
    getRandomWeightOnPlanet
}