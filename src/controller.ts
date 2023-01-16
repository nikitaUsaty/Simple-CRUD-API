import { data } from './data'
import { v4 as uuidv4 } from 'uuid'
import { IPerson } from './interface'

//get all persons
export async function getAllPerson() {
  return new Promise((resolve, _) => resolve(data))
}

//get a person with id
export async function getPerson(id: string) {
  return new Promise((resolve, reject) => {
    let person = data.find((person: IPerson) => person.id === id)
    if (person) {
      resolve(person)
    } else {
      reject(`Person with id ${id} was not found `)
    }
  })
}

//post a new person
export async function createNewPerson(person: IPerson) {
  return new Promise((resolve, reject) => {
    const requiredFields = ['name', 'age', 'hobbies']
    let newPerson = {
      ...person,
      id: uuidv4(),
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
export async function updatePerson(id: string, body: any) {
  return new Promise((resolve, reject) => {
    let person = data.find((person: IPerson) => person.id === id)

    if (!person) {
      reject(`No Person with id ${id} found`)
    }

    let updatedPerson = JSON.parse(body)
    updatedPerson['id'] = id
    const foundIndex = data.findIndex((x) => x.id == id)
    data[foundIndex] = updatedPerson
    resolve(updatedPerson)
  })
}

//delete a person
export async function deletePerson(id: string) {
  return new Promise((resolve, reject) => {
    let person = data.find((person: IPerson) => person.id === id)
    if (!person) {
      reject(`Person with id ${id} was not found`)
    }

    resolve(`Person with id ${id} has been deleted`)

    data.splice(data.indexOf(person!), 1)
  })
}

module.exports = { getAllPerson, getPerson, createNewPerson, updatePerson, deletePerson }
