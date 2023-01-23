import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { StyledTextField } from '../components/styled-components';
import { Dispatch } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { roles, localStorageKeys } from '../constants';
import { ErrorMessage } from '@hookform/error-message'

const fields = {
  email: 'email',
  password: 'password'
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required'),
  //.email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters')
});

const Login:React.FC<{setLoggedIn: Dispatch<React.SetStateAction<Boolean>>}> = ({setLoggedIn}) => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    console.log(JSON.stringify(data));
    if (data.email == roles.director) localStorage.setItem(localStorageKeys.role, roles.director)
    else if (data.email == roles.teacher) localStorage.setItem(localStorageKeys.role, roles.teacher)
    else if (data.email == roles.student) localStorage.setItem(localStorageKeys.role, roles.student)
    else {
      const formError = { type: "server", message: "Email or Password Incorrect" }
      setError("errorBox", formError)
      return
    }
    setLoggedIn(true)
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', color: 'black' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography sx={{color: 'error.main'}}>
            <ErrorMessage errors={errors} name="errorBox" />
          </Typography>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id={fields.email}
            label="Email Address"
            name={fields.email}
            autoComplete="email"
            autoFocus
            {...register(fields.email)}
            error={!!errors.email}
            helperText={errors.email && errors.email.message.toString()}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name={fields.password}
            label="Password"
            type="password"
            id={fields.password}
            autoComplete="current-password"
            {...register(fields.password)}
            error={!!errors.password}
            helperText={errors.password && errors.password.message.toString()}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login