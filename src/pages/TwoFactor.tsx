import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { StyledTextField } from '../components/styled-components';
import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message'
import unauthorizedAxios from '../api/unauthorizedAxios';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, setAccessToken, setRefreshToken } from '../utils/tokens';
import { useAuthStore } from '../contexts/AuthContex';

const fields = {
  otp: 'otp'
}

const twofaValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "Password is 6 digits long")
});

const TwoFactor = () => {
  const authStore = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(twofaValidationSchema)
  });

  const onSubmit = async data => {
    setIsLoading(true)
    //await delay(1000);
    unauthorizedAxios
      .post(`users/twofactor`, { totp_token: data.otp }, {
        headers: { Authorization: `Bearer ${getAccessToken()}` }
      })
      .then((response) => {
        setAccessToken(response.data.access_token)
        setRefreshToken(response.data.refresh_token)
        authStore.setLoggedIn(true)
        navigate("/profile")
      })
      .catch((err) => {
        const formError = { type: "server", message: err.response?.data?.error ? err.response.data.error : err.message }
        setError("errorBox", formError)
      })
      .finally(() => {
        setIsLoading(false)
      })
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
          Two Factor Authentication
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography sx={{ color: 'error.main' }}>
            <ErrorMessage errors={errors} name="errorBox" />
          </Typography>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id={fields.otp}
            label="One time password"
            name={fields.otp}
            autoFocus
            {...register(fields.otp)}
            error={!!errors.otp}
            helperText={errors.otp && errors.otp.message.toString()}
            placeholder='XXXXXX'
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default TwoFactor