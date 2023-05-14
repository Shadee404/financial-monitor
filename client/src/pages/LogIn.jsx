import { useState } from 'react';
import Logo from '../../public/logo.svg';
import People from '../../public/people.png';
import { Box, Typography, TextField } from '@mui/material';
import { Colors } from '../styles';
import AuthorBtn from '../components/ButtonSubmit';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MainText from '../components/MainText';
function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    // Validate email
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
    // Validate password
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    // Validate password confirmation

    setErrors(errors);
    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Registration successful');
    }
  };

  return (
    <Box
      sx={{
        width: '1280px',
        margin: '0 auto',
        padding: '33px 26px 26px 100px',
      }}
    >
      <Box display={'flex'} gap={'80px'}>
        <Box>
          <img src={Logo} alt='Budget Buddy' />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '80px',
            }}
          >
            <MainText />
            <Box
              sx={{
                display: 'flex',
                gap: '50px',
                width: '295px',
                height: '51px',
                padding: '4px',
                borderRadius: '19px',
                marginTop: '50px',
                backgroundColor: Colors.secondary,
              }}
            >
              <Box
                sx={{
                  padding: '12px 46px',
                  borderRadius: '19px',
                  backgroundColor: Colors.primary,
                  color: Colors.white,
                  cursor: 'pointer',
                }}
              >
                <Typography fontSize={16}>Log in</Typography>
              </Box>
              <Typography
                fontSize={16}
                color={Colors.notActive}
                padding={'12px 0'}
              >
                <Link to='/' component={<SignUp />}>
                  Sign up
                </Link>
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box>
                <TextField
                  variant='standard'
                  label='Email'
                  color='third'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{
                    width: '300px',
                    margin: '60px 0 45px 0 ',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              </Box>
              <Box>
                <TextField
                  variant='standard'
                  type={seePassword ? 'text' : 'password'}
                  label='Password'
                  color='third'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  sx={{
                    width: '300px',
                    fontFamily: 'Roboto', // Set the font to Inter
                  }}
                />
                <VisibilityIcon
                  onClick={() => setSeePassword(!seePassword)}
                  sx={{
                    cursor: 'pointer',
                    color: 'gray',
                    marginBottom: '-30px',
                  }}
                />
              </Box>
              <AuthorBtn
                type='submit'
                text='Register'
                sx={{ marginTop: '70px', marginLeft: '75px' }}
              ></AuthorBtn>
            </form>
          </Box>
        </Box>
        <Box>
          <img src={People} alt='' />
        </Box>
      </Box>
    </Box>
  );
}

export default LogIn;