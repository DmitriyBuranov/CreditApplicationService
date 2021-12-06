import {helper} from "./helper"

export const clientService = {
    GetClients,
    CreateClient,
    UpdateClient,
    GetClientById
};


async function GetClients(searchExpression) {
    let response = await fetch('api/v1/Clients' + (helper.IsBlank(searchExpression) ? "" : "/BySurname" + searchExpression))
    return  response.json();   
};


async function GetClientById(id) {
    let response = await fetch('/api/v1/Clients/' + id)
    return  response.json();   
};

async function CreateClient(client) {
    const dataForRequest = {
        name: client.name,
        surname: client.surname,
        birthday: new Date(client.birthday).toISOString(),
        createdAt: new Date(),
        salary: Number(client.salary)
    }

    let response = await fetch("/api/v1/Clients/", {
        method: 'POST',
        body: JSON.stringify(dataForRequest),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return  response.json();
};

async function UpdateClient(client) {
    const dataForRequest = {
        name: client.name,
        surname: client.surname,
        birthday: new Date(client.birthday).toISOString(),
        createdAt: new Date(client.createdAt).toISOString(),
        salary: Number(client.salary)
    }

    let response = await fetch("/api/v1/Clients/"+ client.id, {
        method: 'PUT', 
        body: JSON.stringify(dataForRequest) ,
        headers: {
            'Content-Type': 'application/json'
          },
    })

    return  response.json();   
}