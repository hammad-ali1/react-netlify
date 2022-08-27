import LoginImage from "../../assets/login.jpg";
import {
  Button as MUIButton,
  Box,
  Typography,
  IconButton,
  Stack,
  InputAdornment,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import {
  MailRounded,
  LockRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { RoundedButton } from "../../theme/styledComponents";
//Redux
import { useAppDispatch } from "../../app/hooks";
import { openSignUpForm } from "../Dialog/dialogSlice";
//Hooks
import useLogIn from "../../hooks/useLogin";
export default function LoginForm() {
  const dispatch = useAppDispatch();
  const {
    values,
    handleChange,
    handleClickShowPassword,
    handleFormSubmit,
    isEmailError,
  } = useLogIn();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Stack direction="row">
        <Box sx={{ display: "flex" }}>
          <img
            src={LoginImage}
            alt="login"
            width="100%"
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box sx={{ "& > :not(style)": { m: 1 } }} minWidth="300px">
          <Typography className="blueHeading" variant="h5">
            Login To Account
          </Typography>
          <Stack spacing={3}>
            <FormControl>
              <TextField
                id="email"
                label="Email"
                type="email"
                error={isEmailError}
                placeholder="fa20-bcs-000"
                onChange={handleChange("email")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailRounded />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography>@cuilahore.edu.pk</Typography>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <FormHelperText>
                {isEmailError && "Enter reg no as fa20-bcs-000"}
              </FormHelperText>
            </FormControl>

            <TextField
              id="password"
              label="Password"
              placeholder="password"
              value={values.password}
              onChange={handleChange("password")}
              type={values.showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <RoundedButton onClick={handleFormSubmit}>Log In</RoundedButton>
          </Stack>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Typography>Don't have an account?</Typography>
        <MUIButton
          style={{ padding: "0" }}
          onClick={() => dispatch(openSignUpForm())}
        >
          Sign Up
        </MUIButton>
      </Stack>
    </Box>
  );
}
