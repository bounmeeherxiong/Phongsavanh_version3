import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CategoryIcon from "@material-ui/icons/Category";
import BarChartIcon from "@material-ui/icons/BarChart";
import Collapse from "@material-ui/core/Collapse";
import HomeIcon from "@material-ui/icons/Home";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import PublicIcon from '@material-ui/icons/Public';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Home(props) {
  const Navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [listOpent, setListOpent] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setListOpent(!listOpent);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Phongsavanh Group
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => Navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            ໜ້າຫຼັກ
            <ListItemText />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            ການຕັ້ງຄ່າ
            <ListItemText />
          </ListItem>
          <Collapse in={listOpent} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                ຜູ້ໃຊ້
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => Navigate("/AccountCategory")}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                ປະເພດ
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => Navigate("/CategoryDetail")}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                ລາຍລະອຽດຂອງປະເພດ
              </ListItem>
              <ListItem button className={classes.nested} onClick={()=>Navigate("/CurrencyCode")}>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                ລະຫັດສະກຸນເງີນ
              </ListItem>
              <ListItem button className={classes.nested} onClick={()=>Navigate("/Currencies")}>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                ສະກຸນເງີນ
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                ອາກອນ
              </ListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            ປະເພດບັນຊີ
            <ListItemText />
          </ListItem>
          <ListItem button onClick={() => Navigate("/ChartAccount")}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            ຕາຕະລາງບັນຊີ
            <ListItemText />
          </ListItem>
          <ListItem button  onClick={()=>Navigate("Journal")} >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            ລົງບັນຊີປະຈຳວັນ
            <ListItemText />
          </ListItem>
          <ListItem button  onClick={()=>Navigate("Test")} >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            Test
            <ListItemText />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
