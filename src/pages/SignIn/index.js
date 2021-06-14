import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Select,
  TextField
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import axios from "../../configs/axios";
import ShowWithAnimation from "../../components/ShowWithAnimation";

export default function SignIn({ classes, toast }) {
  const initialState = {
    isSubmitted: false,
    user: {
      email: "",
      password: "",
      designation: "",
      showPassword: false
    },
    emailError: false,
    passwordError: {
      error: false,
      minLen: false,
      digits: false,
      upperCh: false,
      lowerCh: false,
      specialSym: false
    },
    designationError: false
  };

  const [isSubmitted, setIsSubmitted] = useState(initialState.isSubmitted);
  const [user, setUser] = useState(initialState.user);
  const [emailError, setEmailError] = useState(initialState.emailError);
  const [passwordError, setPasswordError] = useState(
    initialState.passwordError
  );
  const [designationError, setDesignationError] = useState(
    initialState.designationError
  );

  const passwordErrors = [
    {
      exp: "minLen",
      message: "Your password must be at least 8 characters"
    },
    {
      exp: "digits",
      message: "Your password must contain at least one digit."
    },
    {
      exp: "lowerCh",
      message: "Your password must contain at least one lowercase letter."
    },
    {
      exp: "upperCh",
      message: "Your password must contain at least one uppercase letter."
    },
    {
      exp: "specialSym",
      message: "Your password must contain at least one special character."
    }
  ];

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const validateEmail = () => {
    setEmailError(user.email === "" || !emailRegex.test(user.email));
  };

  const validatePassword = () => {
    setPasswordError({
      minLen: user.password.length >= 0 && user.password.length < 8,
      digits: user.password === "" || !/\d/.test(user.password),
      lowerCh: user.password === "" || !/[a-z]/.test(user.password),
      upperCh: user.password === "" || !/[A-Z]/.test(user.password),
      specialSym: user.password === "" || !/[^a-zA-Z0-9]/.test(user.password),
      error:
        (user.password.length > 0 && user.password.length < 8) ||
        !/\d/.test(user.password) ||
        !/[a-z]/.test(user.password) ||
        !/[A-Z]/.test(user.password) ||
        !/[^a-zA-Z0-9]/.test(user.password)
    });
  };

  const validateDesignation = () => {
    setDesignationError(user.designation === "");
  };

  const onChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value
    });
  };

  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(!emailError && !passwordError.error && !designationError);

    validateEmail();
    validatePassword();
    validateDesignation();

    let { showPassword, ...newUser } = user;
    axios
      .post("/api/auth/signin", newUser)
      .then((res) => {
        toast.handleToastClick({
          toastOpen: true,
          toastMessage: "Signin successfull...",
          toastVariant: "standard",
          toastColor: "success"
        });
        setIsSubmitted(
          user.email !== "" &&
            user.password !== "" &&
            user.designation !== "" &&
            !emailError &&
            !passwordError.error &&
            !designationError
        );
      })
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          toast.handleToastClick({
            toastOpen: true,
            toastMessage: err.response.data.error,
            toastVariant: "standard",
            toastColor: "error"
          });
        } else if (err.request) {
          // client never received a response, or request never left
          console.log(err.message);
          toast.handleToastClick({
            toastOpen: true,
            toastMessage: err.message,
            toastVariant: "standard",
            toastColor: "error"
          });
        } else {
          // anything else
          console.error(err);
          toast.handleToastClick({
            toastOpen: true,
            toastMessage: err.message,
            toastVariant: "standard",
            toastColor: "error"
          });
        }
      });
  };

  return (
    <main className={classes.main}>
      <Container maxWidth="sm">
        {isSubmitted === false && (
          <>
            <Typography
              variant="h1"
              align="center"
              color="inherit"
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                textTransform: "uppercase",
                marginBottom: "1.2rem"
              }}
            >
              Sign In
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                className={classes.field}
                onChange={(e) => onChange(e)}
                onBlur={validateEmail}
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={user.email}
                required
                error={emailError}
                size="small"
              />
              <ShowWithAnimation isMounted={emailError}>
                <List
                  dense
                  disablePadding
                  className={classes.field}
                  style={{ margin: ".5rem auto" }}
                  aria-label="email validation hints"
                >
                  <ListItem
                    style={{ padding: "0 .24rem", margin: ".5rem .5rem" }}
                  >
                    <span
                      className="material-icons md-18"
                      style={{ color: "#f44336", marginRight: ".5em" }}
                    >
                      error_outline
                    </span>
                    <Typography variant="body2" color="error">
                      Please enter your email address.
                    </Typography>
                  </ListItem>
                </List>
              </ShowWithAnimation>
              <FormControl
                className={classes.field}
                variant="outlined"
                required
                size="small"
                error={passwordError.error}
              >
                <InputLabel htmlFor="user_password">Password</InputLabel>
                <OutlinedInput
                  name="password"
                  id="user_password"
                  type={user.showPassword ? "text" : "password"}
                  value={user.password}
                  labelWidth={90}
                  required
                  fullWidth
                  onChange={handleChange("password")}
                  onBlur={validatePassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {user.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* {<pre>{JSON.stringify(passwordError, null, 4)}</pre>} */}
              <ShowWithAnimation isMounted={passwordError.error}>
                <List
                  dense
                  disablePadding
                  className={classes.field}
                  style={{ margin: ".25em auto" }}
                  aria-label="password validation hints"
                >
                  {passwordErrors.map((error, id) => (
                    <ShowWithAnimation
                      isMounted={passwordError[error.exp]}
                      key={id}
                    >
                      <ListItem
                        style={{ padding: "0 .24rem", margin: ".5rem .5rem" }}
                      >
                        <span
                          className="material-icons md-18"
                          style={{ color: "#f44336", marginRight: ".5em" }}
                        >
                          error_outline
                        </span>
                        <Typography variant="body2" color="error">
                          {error.message}
                        </Typography>
                      </ListItem>
                    </ShowWithAnimation>
                  ))}
                </List>
              </ShowWithAnimation>
              {/* <FormControl
								variant="outlined"
								required
								className={classes.field}
								error={designationError}
								size="small"
							>
								<InputLabel id="demo-simple-select-outlined-label">
									Sign In As
								</InputLabel>
								<Select
									value={user.designation}
									onChange={onChange}
									onBlur={validateDesignation}
									error={designationError}
									variant="outlined"
									required
									fullWidth
									labelWidth={90}
									inputProps={{
										name: "designation",
										id: "designation",
									}}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value={"Student"}>Student</MenuItem>
									<MenuItem value={"Faculty"}>Faculty</MenuItem>
									<MenuItem value={"Hod"}>Hod</MenuItem>
								</Select>
							</FormControl> */}
              <FormControl
                variant="outlined"
                required
                className={classes.field}
                error={designationError}
                size="small"
              >
                <InputLabel htmlFor="designation">Sign In As</InputLabel>
                <Select
                  native
                  value={user.designation}
                  onChange={onChange}
                  onBlur={validateDesignation}
                  error={designationError}
                  variant="outlined"
                  required
                  fullWidth
                  label="Sign In As"
                  labelWidth={90}
                  inputProps={{
                    name: "designation",
                    id: "designation"
                  }}
                >
                  {user.designation === "" && (
                    <option aria-label="None" value="" />
                  )}
                  <option value={"Student"}>Student</option>
                  <option value={"Faculty"}>Faculty</option>
                  <option value={"Hod"}>Hod</option>
                </Select>
              </FormControl>
              <ShowWithAnimation isMounted={designationError}>
                <List
                  dense
                  disablePadding
                  className={classes.field}
                  style={{ margin: ".5rem auto" }}
                  aria-label="designation validation hints"
                >
                  <ListItem
                    style={{ padding: "0 .24rem", margin: ".5rem .5rem" }}
                  >
                    <span
                      className="material-icons md-18"
                      style={{ color: "#f44336", marginRight: ".5em" }}
                    >
                      error_outline
                    </span>
                    <Typography variant="body2" color="error">
                      Please choose an option.
                    </Typography>
                  </ListItem>
                </List>
              </ShowWithAnimation>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                endIcon={<span className="material-icons-outlined">login</span>}
                style={{ margin: ".5em auto" }}
              >
                Sign In
              </Button>
              <Grid container style={{ margin: ".5em auto" }}>
                <Grid item xs>
                  <Button href="#" variant="body2">
                    Forgot password?
                  </Button>
                </Grid>
                <Grid item>
                  <Button href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </>
        )}
        {isSubmitted === true && (
          <>
            <Typography variant="h5" color="inherit">
              Details you have submitted are ...
            </Typography>
            <List aria-label="user info" style={{ marginTop: "1rem" }}>
              <ListItem>
                <ListItemIcon>
                  <span className="material-icons-outlined">email</span>
                </ListItemIcon>
                <Typography variant="body1" color="textPrimary">
                  {user.email}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <span className="material-icons-outlined">password</span>
                </ListItemIcon>
                <Typography variant="body1" color="textPrimary">
                  {user.password}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <span className="material-icons-outlined">account_box</span>
                </ListItemIcon>
                <Typography variant="body1" color="textPrimary">
                  {user.designation}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon
                  style={{ margin: ".5em auto" }}
                  onClick={() => {
                    setIsSubmitted(false);
                  }}
                >
                  <IconButton aria-label="delete" color="primary">
                    <span className="material-icons-outlined">arrow_back</span>
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            </List>
          </>
        )}
      </Container>
    </main>
  );
}
