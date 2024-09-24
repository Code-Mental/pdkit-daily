import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useNavigate } from "react-router-dom";
import { useAppStore } from '../appStore';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandLess';
import ExpandLess from '@mui/icons-material/ExpandMore';
import  Expand  from '@mui/icons-material';
import Icon from '@mui/material/Icon';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();
  // const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);
  const [isCollapse, setIsCollapse] = React.useState(false);
  const handleCollapse = () => {
    setIsCollapse(!isCollapse)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >

                <HomeWorkIcon/>
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/about") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >

                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Products" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}



          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/AddPro") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >

                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Products Code" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/ViewPro") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >

                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="View Products " sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>







          {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/addProducts") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Add Products" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/categories") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/subcategories") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="SubCategories" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding sx={{ display: 'block' }} onClick={handleCollapse}>

            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
              {isCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/users") }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Add User" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/ViewUsers") }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="View Users" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Collapse>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/test") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Test" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>



          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/displayproducts") }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="SubCategories" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>














        </List>

      </Drawer>
    </Box>
  );
}
