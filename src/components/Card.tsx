import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//Types
type PropTypes = {
  heading: string;
  mainTitle: string;
  subTitle?: string;
  description: string;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleUpdate: React.MouseEventHandler<HTMLButtonElement>;
};
export default function OutlinedCard({
  heading,
  mainTitle,
  subTitle,
  description,
  handleDelete,
  handleUpdate,
}: PropTypes) {
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="h5" component="div">
          {mainTitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subTitle}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleDelete} size="small">
          Delete
        </Button>
        <Button onClick={handleUpdate} size="small">
          Update
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
