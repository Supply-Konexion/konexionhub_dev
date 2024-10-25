import React, { useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

// @material-ui/core components
import ExitToApp from "@mui/icons-material/ExitToApp";

// core components
import { Stack, Avatar, Grid, Button, Box } from "@mui/material";

import PopupLogout from "views/Dialog/PopupLogout";

import avatar from "assets/img/avatar.png";

import { blackColor } from "components/headerLinksStyle.js";

export default function AdminNavbarLinks() {
  const [popupLogout, setpopupLogout] = React.useState(false);

  const { UserAuth } = useContext(UrlServicesContext);

  const handleOpenpopupLogout = () => {
    setpopupLogout(true);
  };

  const handleClosepopupLogout = () => {
    setpopupLogout(false);
  };

  return (
    <div>
      <Grid container style={{ float: "right" }}>
        <Grid xs={12} md={12}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              position: { xs: "absolute", sm: "static" },
              bottom: "5%",
              mb: { xs: 5, sm: 0 },
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Avatar
                src={avatar}
                style={{ marginTop: 8, width: 30, height: 30 }}
              />
            </Box>
            <Box
              component="b"
              sx={{
                pt: "15px",
                fontSize: 10,
                color: { xs: "#ffffff", sm: blackColor },
              }}
            >
              {UserAuth.allname}
              {/*<div style={{ marginTop: "-8px", color: "gray" }}>
                  {UserAuth.profile_name}
                </div>*/}
            </Box>
            <Button
              aria-haspopup="true"
              onClick={handleOpenpopupLogout}
              endIcon={
                <ExitToApp
                  sx={{
                    fontSize: 22,
                    color: { xs: "#ffffff", sm: blackColor },
                    marginLeft: { xs: 0, sm: "-30px" },
                    mt: 0.5,
                  }}
                />
              }
            ></Button>
          </Stack>
        </Grid>
      </Grid>
      {popupLogout ? (
        <PopupLogout open={popupLogout} exit={handleClosepopupLogout} />
      ) : (
        ""
      )}
    </div>
  );
}
