import { Stack, Typography, Box } from "@mui/material";
import Button from "../Button/Button";
import VerificationImage from "../../assets/verification.jpg";
function AccountVerification() {
  return (
    <Stack direction="row">
      <Box sx={{ display: "flex" }}>
        <img
          src={VerificationImage}
          alt="verification"
          style={{ width: "100%", objectFit: "contain" }}
        />
      </Box>
      <Stack minWidth="300px" justifyContent="center" alignItems="center">
        <Typography variant="h5" textAlign="center">
          Account Created Successfully 😀.
        </Typography>
        <Typography variant="h6" textAlign="center">
          Make Sure To Check Your Spam Folder
        </Typography>
        <Button text="Send Verification Email" callback={() => {}} />
      </Stack>
    </Stack>
  );
}

export default AccountVerification;
