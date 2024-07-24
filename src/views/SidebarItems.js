import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PermMedia from '@mui/icons-material/PermMedia';

const MainListItems = ({ gotoPage }) => {
  const [selectedIndex, setSelectedIndex] = useState();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClickOpen1 = () => {
    setOpen1(!open1);
    setSelectedIndex(1);
  };
  const handleClickOpen2 = () => {
    setOpen2(!open2);
    setSelectedIndex(2);
  };

  const handleDisplay = (e) => {
    gotoPage(e.currentTarget.getAttribute('name'));

  }

  return (
    <List component="nav">
      <ListItemButton onClick={handleClickOpen1}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            name="account"
            onClick={handleDisplay}
            selected={selectedIndex === 1}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickOpen2}>
        <ListItemIcon>
          <PermMedia />
        </ListItemIcon>
        <ListItemText primary="Audio" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            name="audio"
            onClick={handleDisplay}
            selected={selectedIndex === 2}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}

export default MainListItems;
