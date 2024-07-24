import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import Person from '@mui/icons-material/Person';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

import { useAuth } from '../components/AuthContext';

const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const UserValidateTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props}
    classes={{ popper: className }}
    disableHoverListener
    title={
      <React.Fragment>
        {props.userlength==='true' ? <Check color="success" /> : <Clear sx={{ color: pink[500] }} />}
        {"Minimum 5 charaters"}
      </React.Fragment>
    }
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    display: 'flex',
    alignItems: 'center',
  },
}));

const PassValidateTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props}
    classes={{ popper: className }}
    disableHoverListener
    title={
      <React.Fragment>
        <div className='alignValidation'>
        {props.passlength==='true' ? <Check color="success" /> : <Clear sx={{ color: pink[500] }} />}
        {"Minimum 8 charaters"}
        </div>
        <div className='alignValidation'>
        {props.passupper==='true' ? <Check color="success" /> : <Clear sx={{ color: pink[500] }} />}
        {"A capital (uppercase) letter"}
        </div>
        <div className='alignValidation'>
        {props.passlower==='true' ? <Check color="success" /> : <Clear sx={{ color: pink[500] }} />}
        {"A lowercase letter"}
        </div>
        <div className='alignValidation'>
        {props.passnum==='true' ? <Check color="success" /> : <Clear sx={{ color: pink[500] }} />}
        {"A number"}
        </div>
      </React.Fragment>
    }
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
  ['.alignValidation']: {
    display: 'flex',
    alignItems: 'center',
  }
}));

const Signup = () => {
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [tt1Open, setTt1Open] = useState(false);
  const [userLengthCheck, setUserLengthCheck] = useState(false);
  const [tt2Open, setTt2Open] = useState(false);
  const [passLengthCheck, setPassLengthCheck] = useState(false);
  const [passUpperCheck, setPassUpperCheck] = useState(false);
  const [passLowerCheck, setPassLowerCheck] = useState(false);
  const [passNumCheck, setPassNumCheck] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Validation
  const handleUserChange = (e) => setUser(e.target.value);
  const handlePassChange = (e) => setPass(e.target.value);

  const handleTt1Focus = () => {
    setTt1Open(true)
    setTt2Open(false)
  };

  const handleTt2Focus = () => {
    setTt2Open(true)
    setTt1Open(false)
  };

  useEffect(() => {
    setUserLengthCheck(user.length >= 5 ? true:false)
  }, [user])

  useEffect(() => {
    setPassLengthCheck(pass.length >= 8 ? true:false)
    setPassUpperCheck(/[A-Z]/.test(pass) ? true:false)
    setPassLowerCheck(/[a-z]/.test(pass) ? true:false)
    setPassNumCheck(/[\d+]/.test(pass) ? true:false)
  }, [pass])

  const handleLogin = (e) => {
    e.preventDefault();
    const accDetails = {
      username: user,
      password: pass,
      role: 'user'
    }
    if (accDetails.user === "" || accDetails.pass === "") {
      alert("Please enter a value");
    }
    else if (!userLengthCheck || !passLengthCheck || !passUpperCheck || !passLowerCheck || !passNumCheck) {
      alert("Failed requirement");
    }
    else {
      accDetails.uuid = crypto.randomUUID();
      console.log("form data", accDetails);
      signup(accDetails);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create account
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <UserValidateTooltip
              placement='right'
              open={tt1Open} 
              userlength={userLengthCheck.toString()}
              onFocus={handleTt1Focus}
              >
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Username"
                name="user"
                value={user}
                onChange={handleUserChange}
                autoFocus
              />
            </UserValidateTooltip>
            <PassValidateTooltip
              placement='right'
              open={tt2Open}
              passlength={passLengthCheck.toString()}
              passupper={passUpperCheck.toString()}
              passlower={passLowerCheck.toString()}
              passnum={passNumCheck.toString()}
              onFocus={handleTt2Focus}
              >
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>,
                }}
                value={pass}
                onChange={handlePassChange}
              />
            </PassValidateTooltip>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
