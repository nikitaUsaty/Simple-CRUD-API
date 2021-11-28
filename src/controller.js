const data = require('./data')
const { v4: uuidv4 } = require('uuid')

//get all persons
async function getAllPerson() {
  return new Promise((resolve, _) => resolve(data))
}

//get a person with id
async function getPerson(id) {
  return new Promise((resolve, reject) => {
    let person = data.find((person) => person.id === id)
    if (person) {
      resolve(person)
    } else {
      reject(`Person with id ${id} was not found `)
    }
  })
}

//post a new person
async function createNewPerson(person) {
  return new Promise((resolve, reject) => {
    const requiredFields = ['name', 'age', 'hobbies']
    let newPerson = {
      id: uuidv4(),
      ...person,
    }
    for (let i = 0; i < requiredFields.length; i++) {
      const fields = Object.keys(newPerson)
      if (!fields.includes(requiredFields[i])) {
        reject(`Some of the required fields ${requiredFields[i]} has not been passed`)
      }
    }
    data.push(newPerson)
    resolve(newPerson)
  })
}

// update a person
async function updatePerson(id, body) {
  return new Promise((resolve, reject) => {
    let person = data.find((person) => person.id === id)

    if (!person) {
      reject(`No Person with id ${id} found`)
    }

    let updatedPerson = JSON.parse(body)
    updatedPerson['id'] = id

    resolve(updatedPerson)
  })
}

//delete a person
async function deletePerson(id) {
  return new Promise((resolve, reject) => {
    let person = data.find((person) => person.id === id)
    if (!person) {
      reject(`Person with id ${id} was not found`)
    }

    resolve(`Person with id ${id} has been deleted`)

    data.splice(data.indexOf(person), 1)
  })
}

module.exports = { getAllPerson, getPerson, createNewPerson, updatePerson, deletePerson }
