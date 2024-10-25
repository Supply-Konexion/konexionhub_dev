import * as React from "react";

import { Grid, Paper } from "@mui/material";
import { Container } from "reactstrap";

import { ParagraphTextPage } from "components/cardBodyStyle";

export default function Section4(props) {
  return (
    <div
      className="section"
      id="basic-elements"
      style={{ background: "#f9f9f9" }}
    >
      <Container>
        <Grid sx={{ flexGrow: 1 }} container>
          <Grid item xs={12}>
            <center>
              <ParagraphTextPage
                style={{
                  marginBottom: 50,
                  width: 500,
                }}
              >
                {props.data[3].textSecondary}
              </ParagraphTextPage>
            </center>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={4}>
              {props.data[3].images.map((data, i) => (
                <Grid key={i} md={2} item>
                  <Paper
                    sx={{
                      height: 300,
                      width: 168,
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      src={`${props.urlServices}documents/images_templates/${data.images}`}
                      alt={`img${i}`}
                      loading="lazy"
                      style={{ height: 300 }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
