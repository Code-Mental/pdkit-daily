import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore, Inbox, Mail, Star } from '@mui/icons-material';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
            <ListItem button onClick={handleClick}>
            <ListItemIcon>
                <Inbox />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                <ListItemIcon>
                    <Star />
                </ListItemIcon>
                <ListItemText primary="Starred" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                <ListItemIcon>
                    <Mail />
                </ListItemIcon>
                <ListItemText primary="Sent Mail" />
                </ListItem>
            </List>
            </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
