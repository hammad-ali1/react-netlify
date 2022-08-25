import SignUpImage from "../../assets/signup.jpg";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  InputAdornment,
  TextField,
  FormControl,
  FormHelperText,
  Button as MUIButton,
} from "@mui/material";
import {
  AccountCircle,
  MailRounded,
  LockRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import Button from "../Button/Button";
//Redux
import { useAppDispatch } from "../../app/hooks";
import { openLoginForm } from "../Dialog/dialogSlice";

//Hooks
import useSignUp, { Values } from "../../hooks/useSignUp";
export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const {
    values,
    setValues,
    handleFormSubmit,
    isEmailError,
    isPasswordError,
    submitErrorMessage,
  } = useSignUp();

  const handleChange =
    (prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
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
            src={SignUpImage}
            alt="login"
            width="100%"
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box sx={{ "& > :not(style)": { m: 1 } }} minWidth="300px">
          <Typography className="blueHeading" variant="h5">
            Create An Account
          </Typography>
          <FormControl>
            <Stack spacing={3}>
              <FormControl>
                <TextField
                  id="name"
                  label="Name"
                  placeholder="name"
                  onChange={handleChange("name")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <FormHelperText sx={{ textAlign: "center" }}>
                  You don't have to give your real name
                </FormHelperText>
              </FormControl>
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
                <FormHelperText error>
                  {isEmailError && "Enter reg no as fa20-bcs-000"}
                </FormHelperText>
              </FormControl>

              <TextField
                id="password"
                error={isPasswordError}
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <FormControl>
                <TextField
                  id="confirmPassword"
                  placeholder="password"
                  error={isPasswordError}
                  label="Confirm Password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
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
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <FormHelperText error>
                  {isPasswordError && "Password does not match"}
                </FormHelperText>
              </FormControl>
              <Button text="Sign Up" callback={handleFormSubmit} />
            </Stack>
            <FormHelperText error>{submitErrorMessage}</FormHelperText>
          </FormControl>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Typography>Already have an account?</Typography>
        <MUIButton
          style={{ padding: "0" }}
          onClick={() => dispatch(openLoginForm())}
        >
          Log In
        </MUIButton>
      </Stack>
    </Box>
  );
}
