const API_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (email, password) =>{
  const response = await fetch(`${API_URL}/auth/register`, {
    method : "POST",
    headers : {"Content-Type": "application/json"},
    body : JSON.stringify({email, password}),
  });

  if (!response.ok){
    const error = await response.text();
    throw new Error(error);
  }

  return await response.text();
}

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);

    return data.token;
};

export const logout = () => {
    localStorage.removeItem("token");
};


export const getToken = () => {
    return localStorage.getItem("token");
};


export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};