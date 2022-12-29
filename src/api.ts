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
