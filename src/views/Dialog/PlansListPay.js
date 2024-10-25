import React, { Fragment } from "react";

import { Dialog, DialogActions, DialogContent } from "@mui/material";

import PlansList from "views/IndexSections/PlansList";

import { ButtonExit } from "components/cardBodyStyle";

export default function PlansListPay(props) {
  const [success, setSuccess] = React.useState(false);

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  const callBackRefresh = () => {
    setSuccess(true);
    props.callBackRefresh();
  };

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth={success ? "sm" : "md"}
        onClose={handleCloseDialog(true)}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        keepMounted
        scroll="body"
        PaperProps={{
          sx: {
            borderRadius: 6,
          },
        }}
      >
        <DialogContent dividers>
          <PlansList
            hide={props.hide}
            id={props.id}
            callBackRefresh={callBackRefresh}
          />
        </DialogContent>
        <DialogActions>
          <ButtonExit onClick={handleCloseDialog(true)}>Cerrar</ButtonExit>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
