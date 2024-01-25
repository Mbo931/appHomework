export async function register(userData) {
  try {
    const response = await axios.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function login(userData) {
  try {
    const response = await axios.post("/auth/signin", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}