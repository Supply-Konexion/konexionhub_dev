/*eslint-disable*/
import React, { Fragment } from "react";

import { NavLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ListItemText, List, Hidden, Drawer } from "@mui/material";

import {
  AccountCircle,
  Remove,
  GridView,
  Store,
  PhotoLibrary,
} from "@mui/icons-material";

// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";

import {
  sidebarStyle,
  ListItemStyle,
  DrawerStyle,
} from "components/sidebarStyle.js";

const useStyles = makeStyles(sidebarStyle);

export default function Sidebar(props) {
  const { logo, image, routes } = props;

  const classes = useStyles();

  const linksUrl = (url) => () => {
    // if (url === "/dashboard")
    //setOpen(false);
    props.url(url);
  };

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const urlLinksIcon = (iconSelect) => {
    switch (iconSelect) {
      case "/datacompany":
        return (
          <Store
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon, {
              [" " + classes.purpleIcon]: activeRoute("/account" + iconSelect),
            })}
          />
        );
      case "/myaccount":
        return (
          <AccountCircle
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon, {
              [" " + classes.purpleIcon]: activeRoute("/account" + iconSelect),
            })}
          />
        );
      case "/properties":
        return (
          <PhotoLibrary
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon, {
              [" " + classes.purpleIcon]: activeRoute("/account" + iconSelect),
            })}
          />
        );
      default:
        return (
          <Remove
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon, {
              [" " + classes.purpleIcon]: activeRoute("/account" + iconSelect),
            })}
          />
        );
    }
  };

  /*const handleOpen = (pro) => () => {
      let statusMenu = open;
      if (menu != pro) {
        statusMenu = false;
      }

      setOpen(!statusMenu);
      setMenu(pro);
    };*/

  var links = (
    <List className={classes.list}>
      <NavLink
        to={"/account/dashboard-customer"}
        //className={activePro + classes.item}
        activeClassName="active"
      >
        <ListItemStyle
          button
          onClick={linksUrl("/dashboard-customer")}
          className={classes.itemLinkCollapse}
        >
          <GridView
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon, {
              [" " + classes.purpleIcon]: activeRoute(
                "/account/dashboard-customer"
              ),
            })}
          />
          <ListItemText
            primary="Inicio"
            // className={classes.itemLinkCollapseName}
            className={classNames(classes.itemText, "", {
              [classes.itemTextRTL]: props.rtlActive,
              [" " + classes.itemTextPurple]: activeRoute(
                "/account/dashboard-customer"
              ),
            })}
            disableTypography={true}
          />
        </ListItemStyle>
      </NavLink>
      {routes
        .sort((a, b) => a.nOrder - b.nOrder) // Ordenar los elementos según nOrder
        .map((prop, key) => {
          return (
            <Fragment key={key}>
              <Fragment key={key}>
                <NavLink
                  to={"/account" + prop.resources[0].path}
                  //className={activePro + classes.item}
                  activeClassName="active"
                  key={key}
                >
                  <ListItemStyle
                    button
                    //className={classes.itemLink + listItemClasses}
                    onClick={linksUrl(prop.resources[0].path)}
                  >
                    {urlLinksIcon(prop.resources[0].path)}
                    <ListItemText
                      primary={prop.resources[0].name}
                      className={classNames(classes.itemText, "", {
                        [classes.itemTextRTL]: props.rtlActive,
                        [" " + classes.itemTextPurple]: activeRoute(
                          "/account" + prop.resources[0].path
                        ),
                      })}
                      disableTypography={true}
                    />
                  </ListItemStyle>
                </NavLink>
                {/* <Fragment key={prop.resource.id}>
              <ListItem
                key={prop.resource.id}
                button
                onClick={handleOpen(prop.resource.id)}
                className={classes.itemLinkCollapse}
              >
                <Remove />
                <ListItemText
                  primary={prop.resource.name}
                  className={classes.itemLinkCollapseName}
                  disableTypography={true}
                />
                {menu === prop.resource.id && open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse
                in={menu === prop.resource.id ? open : false}
                timeout="auto"
                unmountOnExit
                style={{ backgroundColor: "rgb(247, 247, 247)" }}
              >
                {
                  <List component="div" key={key}>
                    {prop.resource.map((prop2) => {
                      return (
                        <ListItem
                          key={prop2.id}
                          button
                          onClick={linksUrl(prop2.path)}
                          className={classes.itemLinkCollapseSubmenu}
                        >
                          <ArrowRight
                            style={{
                              minWidth: " 0px !important",
                              color: "#000",
                            }}
                          />
                          <ListItemText
                            primary={prop2.name}
                            className={classes.itemLinkCollapseNameSub}
                            disableTypography={true}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                }
              </Collapse>*/}
              </Fragment>
            </Fragment>
          );
        })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <img src={logo} alt="logo" className={classes.img} />
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <DrawerStyle
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}         
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </DrawerStyle>
      </Hidden>
      <Hidden smDown implementation="css">
        <DrawerStyle
          onClose={props.handleDrawerToggle}
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : (
            <div className={classes.background} />
          )}
        </DrawerStyle>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
