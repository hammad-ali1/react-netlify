import { useState } from "react";
//@ts-ignore
import LoginImage from "../../assets/login.jpg";
import {
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

import Button from "../Button/Button";

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}
export default function LoginForm() {
  const [values, setValues] = useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const isEmailError =
    values.email !== "" &&
    !new RegExp("^[a-z0-9]{4}-[a-z]{3}-[0-9]{3}$", "i").test(values.email) &&
    values.email.length !== 12;
  return (
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

          <Button text="Log In" callback={() => 1} />
        </Stack>
      </Box>
    </Stack>
  );
}
