import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { signUp } from '../../../api/Api_Wrapper';
import MuiAlert from '@mui/material/Alert';



// TODO remove, this demo shouldn't need to reset the theme.


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultTheme = createTheme();

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));


export function SignUp() {
  const [imageSrc, setImageSrc] = React.useState(null)
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState(new FormData());
  const [error, setError] = React.useState({ errorCode: 0, msg: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);

      // Validate form fields
      const validationErrors = {};
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.get('email') || !emailRegex.test(data.get('email'))) {
        validationErrors.email = 'Invalid email address';
      }

      // Password validation (minimum 6 characters)
      if (!data.get('password') || data.get('password').length < 6) {
        validationErrors.password = 'Password must be at least 6 characters';
      }

      // Phone number validation (10 digits)
      const phoneRegex = /^\d{10}$/;
      if (!data.get('phone') || !phoneRegex.test(data.get('phone'))) {
        validationErrors.phone = 'Invalid phone number (10 digits)';
      }

      // Zip code validation (5 digits)
      const zipCodeRegex = /^\d{6}$/;
      if (!data.get('zipCode') || !zipCodeRegex.test(data.get('zipCode'))) {
        validationErrors.zipCode = 'Invalid ZIP code (5 digits)';
      }

      // Set errors or submit the form
      console.log("00000", Object.keys(validationErrors))
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        setErrors({});
        const signData = await signUp(formData)
        if (signData?.status) {
          setError({ errorCode: 1, msg: signData?.message });
          setTimeout(() => {
            navigate("/signin")
            setError({ errorCode: 0, msg: "" });
          }, 1000);
        } else {
          setError({ errorCode: 2, msg: signData?.message });
          setTimeout(() => {
            setError({ errorCode: 0, msg: "" });
          }, 2000);
        }
        console.log("---->", signData?.message);
      }

    } catch (error) {
      console.log("--(((", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      formData.set(e.target.name, e.target.files[0]);
    } else {
      formData.set(e.target.name, e.target.value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              sx={{ marginBottom: "20px" }}
              badgeContent={
                // <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <TextField
                  required
                  size='small'
                  type={"file"}
                  id="file"
                  // label="choose file"
                  sx={{ width: "10px", height: "10px" }}
                  name="file"
                  onChange={(e) => {
                    handleImageChange(e)
                    handleChange(e)
                  }}
                // autoComplete="family-name"
                />
              }
            >
              <Avatar alt="Travis Howard" src={imageSrc} />
            </Badge>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="First Name"
                  autoFocus
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  error={!!errors.email}
                  helperText={errors.email}
                  type='email'
                  onChange={handleChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="phone"
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                  onChange={handleChange}
                  type='number'
                  fullWidth
                  id="phone"
                  label="Phone number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  id="zipCode"
                  label="zipCode"
                  onChange={handleChange}
                  name="zipCode"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password}
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
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
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {error.errorCode == 1 && <Alert severity="success">{error?.msg}</Alert>}
      {error?.errorCode == 2 && <Alert severity="error">{error?.msg}</Alert>}
    </ThemeProvider>
  );
}