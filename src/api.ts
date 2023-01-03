const BASE_URL = `http://localhost:8080`;

export async function login(data: any) {
  return await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export async function createAccount(data: any) {
  return await fetch(`${BASE_URL}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export async function getTodos() {
  return await fetch(`${BASE_URL}/todos`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("TOKEN") + "",
    },
  }).then((response) => response.json());
}

export async function getTodoById(id: string | undefined) {
  return await fetch(`${BASE_URL}/todos/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("TOKEN") + "",
    },
  }).then((response) => response.json());
}

export async function createTodo(data: any) {
  return await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("TOKEN") + "",
    },
    mode: "cors",
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export async function updateTodo(data: any, id: any) {
  return await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("TOKEN") + "",
    },
    mode: "cors",
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export async function deleteTodo(id: any) {
  return await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("TOKEN") + "",
    },
  }).then((response) => response.json());
}
