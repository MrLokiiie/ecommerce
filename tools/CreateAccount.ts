import axios from "axios";

export async function CreateAccount(name: string, password: string, email: string) {
  if (!name || !password || !email) {
    return console.log("Invalid values.");
  }

  const emailProvider = email.split("@")[1];

  if (emailProvider !== "gmail") {
    return "Must be set to gmail.";
  }
  
  try {
    const createAccount = await axios.post('/api/register', {
      name,
      password,
      email
    });

    return createAccount.data;
  } catch (error) {
    console.log(error);
  }
}