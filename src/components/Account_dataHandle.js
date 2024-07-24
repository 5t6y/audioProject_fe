import { useHistory } from 'react-router-dom';
import { useLocalStorage } from "../hooks/useLocalStorage";

export const GetAllUsers = async (data) => {
  const [userToken, setUserToken] = useLocalStorage("token");
  try {
    const response = await fetch("http://localhost:5555/user/GetAllUsersList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + userToken,
      },
    });
    const res = await response.json();
    return res.usersList;
  } catch (err) {
    console.error(err);
  }
};

export const CreateAccount = async (data) => {
  try {
    const response = await fetch("http://localhost:5555/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.success) {
      alert("Create account successfully!");
    }
    else {
      alert("Error creating account");
    }
  } catch (err) {
    console.error(err);
  }
};

export const UpdateAccountPassword = async (data) => {
  try {
    // const response = await fetch("http://localhost:5000/createAccount", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const res = await response.json();
    // if (res.success) {
    //   alert("Create account successfully!");
    // }
    // else {
    //   alert("Error creating account");
    // }
  } catch (err) {
    console.error(err);
  }
};

export const UpdateAccountUsername = async (data) => {
  try {
    // const response = await fetch("http://localhost:5000/createAccount", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const res = await response.json();
    // if (res.success) {
    //   alert("Create account successfully!");
    // }
    // else {
    //   alert("Error creating account");
    // }
  } catch (err) {
    console.error(err);
  }
};

export const DeleteAccount = async (data) => {
  const history = useHistory();
  const [user, setUser] = useLocalStorage("user");
  const [userToken, setUserToken] = useLocalStorage("token");
  
  try {
    const response = await fetch("http://localhost:5000/removeAccount/" + data.user, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      req: data.user,
    });
    const res = await response.json();
    if (res.success) {
      setUser(null);
      setUserToken(null);
      history.replace('/home');
      alert("Delete account successfully!");
    }
    else {
      alert("Error deleting account");
    }
  } catch (err) {
    console.error(err);
  }
};
