import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  Collapse,
  ListItem,
  ListItemText,
  List,
  Hidden,
} from "@mui/material";

import {
  ExpandMore,
  ExpandLess,
  ArrowRight,
  Remove,
  GridView,
  PersonOutline,
  HouseSiding,
  AddCard,
  Payment,
  Business,
  PeopleOutline,
} from "@mui/icons-material";

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

  const [openStates, setOpenStates] = useState({});

  const handleCollapseToggle = (id) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const linksUrl = (url) => () => {
    props.url(url);
  };

  const urlLinksIcon = (iconSelect) => {
    switch (iconSelect) {
      case "/myaccount":
        return (
          <PersonOutline
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon)}
          />
        );
      case "/properties":
        return (
          <HouseSiding
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon)}
          />
        );
      case "/plans":
        return (
          <AddCard
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon)}
          />
        );
      case "/payments":
        return (
          <Payment
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon)}
          />
        );
      case "/projects":
        return (
          <Business
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon)}
          />
        );

      case "/users":
        return (
          <PeopleOutline
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon)}
          />
        );

      case "/dashboard-customer":
        return (
          <GridView
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon)}
          />
        );

      case "/dashboard-customer":
        return (
          <GridView
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon)}
          />
        );

      default:
        return (
          <Remove
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon)}
          />
        );
    }
  };

  // Ordenar las rutas
  const sortedRoutes = [...routes].sort((a, b) => a.nOrder - b.nOrder);

  const links = (
    <List className={classes.list}>
      <NavLink to={"/account/dashboard-customer"} activeClassName="active">
        <ListItemStyle button onClick={linksUrl("/dashboard")}>
          <GridView
            sx={{ fontSize: 31 }}
            className={classNames(classes.itemIcon, "", {
              [" " + classes.purpleIconlasses]: activeRoute(
                "/account/dashboard-customer"
              ),
            })}
          />
          <ListItemText
            primary="Inicio"
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
      {sortedRoutes.map((prop, key) => {
        var activePro = " ";
        return (
          <Fragment key={key}>
            {prop.resources.length === 0 ? (
              <NavLink
                to={"/account" + prop.path}
                activeClassName="active"
                className={activePro + classes.item}
              >
                <ListItemStyle button onClick={linksUrl(prop.path)}>
                  {urlLinksIcon(prop.path)}
                  <ListItemText
                    primary={prop.name}
                    className={classNames(classes.itemText, "", {
                      [classes.itemTextRTL]: props.rtlActive,
                      [" " + classes.itemTextPurple]: activeRoute(
                        "/account" + prop.path
                      ),
                    })}
                    disableTypography={true}
                  />
                </ListItemStyle>
              </NavLink>
            ) : (
              <>
                <ListItem
                  button
                  onClick={() => handleCollapseToggle(prop.id)}
                  className={classes.itemLinkCollapse}
                >
                  <Remove
                    sx={{ fontSize: 31 }}
                    className={classNames(classes.itemIcon)}
                  />
                  <ListItemText
                    primary={prop.name}
                    className={classes.itemLinkCollapseName}
                    disableTypography={true}
                  />
                  {openStates[prop.id] ? (
                    <ExpandLess
                      sx={{ fontSize: 31 }}
                      className={classNames(classes.itemIcon)}
                    />
                  ) : (
                    <ExpandMore
                      sx={{ fontSize: 31 }}
                      className={classNames(classes.itemIcon)}
                    />
                  )}
                </ListItem>
                <Collapse
                  in={openStates[prop.id]}
                  timeout="auto"
                  unmountOnExit
                  style={{ backgroundColor: "rgb(247, 247, 247)" }}
                >
                  <List component="div">
                    {prop.resources.map((resource) => (
                      <NavLink
                        to={"/account" + resource.path}
                        activeClassName="active"
                        className={activePro + classes.item}
                      >
                        <ListItem
                          key={resource.id}
                          button
                          onClick={linksUrl(resource.path)}
                          className={classes.itemLinkCollapseSubmenu}
                        >
                          <ArrowRight
                            style={{
                              minWidth: "0px !important",
                              color: "#000000",
                            }}
                          />
                          <ListItemText
                            primary={resource.name}
                            className={classNames(classes.itemText2, "", {
                              [classes.itemTextRTL]: props.rtlActive,
                              [" " + classes.itemTextPurple]: activeRoute(
                                "/account" + resource.path
                              ),
                            })}
                            disableTypography={true}
                          />
                        </ListItem>
                      </NavLink>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </Fragment>
        );
      })}
    </List>
  );

  const brand = (
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
  url: PropTypes.func,
};
