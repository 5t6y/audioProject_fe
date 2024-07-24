import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { UpdateAccountPassword } from '../components/Account_dataHandle'

const Pass1ValidateTooltip = styled(({ className, ...props }) => (
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

const Pass2ValidateTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props}
    classes={{ popper: className }}
    disableHoverListener
    title={
      <React.Fragment>
        {props.passsame==='true' ? <Check color="success" /> : <Clear sx={{ color: pink[500] }} />}
        {"Same password"}
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

const ModifyPassComp = () => {
  const [showPassword1, setshowPassword1] = useState(false);
  const [showPassword2, setshowPassword2] = useState(false);
  const handleClickshowPassword1 = () => setshowPassword1((show) => !show);
  const handleClickshowPassword2 = () => setshowPassword2((show) => !show);

  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const handlePass1Change = (e) => setPass1(e.target.value);
  const handlePass2Change = (e) => setPass2(e.target.value);

  const [tt1Open, setTt1Open] = useState(false);
  const [tt2Open, setTt2Open] = useState(false);
  const [passLengthCheck, setPassLengthCheck] = useState(false);
  const [passUpperCheck, setPassUpperCheck] = useState(false);
  const [passLowerCheck, setPassLowerCheck] = useState(false);
  const [passNumCheck, setPassNumCheck] = useState(false);
  const [passSameCheck, setPassSameCheck] = useState(false);

  const handleTt1Focus = () => {
    setTt1Open(true)
    setTt2Open(false)
  };

  const handleTt2Focus = () => {
    setTt2Open(true)
    setTt1Open(false)
  };

  useEffect(() => {
    setPassLengthCheck(pass1.length >= 8 ? true:false)
    setPassUpperCheck(/[A-Z]/.test(pass1) ? true:false)
    setPassLowerCheck(/[a-z]/.test(pass1) ? true:false)
    setPassNumCheck(/[\d+]/.test(pass1) ? true:false)
  }, [pass1])

  useEffect(() => {
    setPassSameCheck(pass1 === pass2 ? true:false)
  }, [pass1, pass2])

  const handleUpdate = (e) => {
    e.preventDefault();
    if (pass1 === "" || pass2 === "") {
      alert("Please enter a value");
    }
    else if (!passSameCheck || !passLengthCheck || !passUpperCheck || !passLowerCheck || !passNumCheck) {
      alert("Failed requestment");
    }
    else {
      UpdateAccountPassword(pass1);
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h5" align='center'>Change password</Typography>
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
        <Pass1ValidateTooltip
              placement='right'
              open={tt1Open}
              passlength={passLengthCheck.toString()}
              passupper={passUpperCheck.toString()}
              passlower={passLowerCheck.toString()}
              passnum={passNumCheck.toString()}
              onFocus={handleTt1Focus}
              >
          <TextField
            margin="normal"
            fullWidth
            id="password1"
            label="New password"
            name="password1"
            type={showPassword1 ? 'text' : 'password'}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickshowPassword1}
                  edge="end"
                >
                  {showPassword1 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
            }}
            value={pass1}
            onChange={handlePass1Change}
          />
          </Pass1ValidateTooltip>
          <Pass2ValidateTooltip
              placement='right'
              open={tt2Open}
              passsame={passSameCheck.toString()}
              onFocus={handleTt2Focus}
              >
          <TextField
            margin="normal"
            fullWidth
            id="password2"
            label="Repeat new password"
            name="password2"
            type={showPassword2 ? 'text' : 'password'}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickshowPassword2}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
            }}
            value={pass2}
            onChange={handlePass2Change}
          />
          </Pass2ValidateTooltip>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ModifyPassComp;
