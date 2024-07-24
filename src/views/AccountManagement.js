import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ModifyUserComp from "./ModifyUser";
import ModifyPassComp from "./ModifyPassword";
import { DeleteAccount } from '../components/Account_dataHandle';

const Account = (props) => {
  const [page, setPage] = useState('');
  const user = props.user;

  const handleDisplay = (e) => {
    if (e.currentTarget.getAttribute('name') == 'deleteAcc') {
      if (window.confirm("Confirm delete of account?")) {
        DeleteAccount(user);
      }
    }
    else {
      setPage(e.currentTarget.getAttribute('name'));
    }
  }

  return (
    <React.Fragment>
      {page == 'modifyUser' ?
        <ModifyUserComp />
        : (page == 'modifyPass' ?
          <ModifyPassComp />
          :
          <div>
            <Typography variant="h5" align='center'>Account Management</Typography>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <nav>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton name='modifyUser' onClick={handleDisplay}>
                      <ListItemText primary="Username" />
                      <ArrowForwardIos />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
              <Divider variant="middle" />
              <nav>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton name='modifyPass' onClick={handleDisplay}>
                      <ListItemText primary="Password" />
                      <ArrowForwardIos />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
              <Divider variant="middle" />
              <nav>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton name='deleteAcc' onClick={handleDisplay}>
                      <ListItemText primary="Delete account" />
                      <ArrowForwardIos />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Box>
          </div>
        )
      }
    </React.Fragment>
  );
};

export default Account;
