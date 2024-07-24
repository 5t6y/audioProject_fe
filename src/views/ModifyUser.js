import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { CreateAccount, DeleteAccount } from '../components/Account_dataHandle'

const ModifyUserComp = () => {
  // Create, update, delete account
  const [account, setAccount] = useState({
    user: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdate = () => {
    //   CreateAccount(account)
  }

  return (
    <React.Fragment>
      <Typography variant="h5" align='center'>Change username</Typography>
      <form>
        <div>
          <label htmlFor="user">Enter user: </label>
          <input
            id="user"
            type="text"
            value={account.user}
            onChange={(e) =>
              setAccount(account => ({
                ...account,
                user: e.target.value
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="pass">Enter password: </label>
          <input
            id="pass"
            type={
              showPassword ? "text" : "password"
            }
            value={account.password}
            onChange={(e) =>
              setAccount(account => ({
                ...account,
                password: e.target.value
              }))
            }
          />
        </div>
        <div className="divBottom">
          <button onClick={handleUpdate}>Update</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ModifyUserComp;
