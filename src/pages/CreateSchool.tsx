import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import unauthorizedAxios from '../api/unauthorizedAxios';
import { getAccessToken, setAccessToken, setRefreshToken } from '../utils/tokens';
import authorizedAxios from '../api/authorizedAxios';
import { ErrorMessage } from '@hookform/error-message';
import { Container, Box, Avatar, Typography, Button } from '@mui/material';
import { StyledTextField } from '../components/styled-components';
import { useNavigate } from 'react-router-dom';


const fields = {
  name: 'name'
}

const schoolValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "School must have a name")
    .max(255, "Name too long")
});

const CreateSchool = () => {

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
    resolver: yupResolver(schoolValidationSchema)
  });

  const onSubmit = data => {
    setIsLoading(true)
    //await delay(1000);
    authorizedAxios
      .post(`schools`, { name: data.name })
      .catch((err) => {
        const formError = { type: "server", message: err.response?.data?.error ? err.response.data.error : err.message }
        setError("errorBox", formError)
      })
      .finally(() => {
        setIsLoading(false)
        navigate("/schools")
      })
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Create new school
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Typography sx={{ color: 'error.main' }}>
          <ErrorMessage errors={errors} name="errorBox" />
        </Typography>
        <StyledTextField
          margin="normal"
          required
          fullWidth
          id={fields.name}
          label="School name"
          name={fields.name}
          autoFocus
          {...register(fields.name)}
          error={!!errors.name}
          helperText={errors.name && errors.name.message.toString()}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          Create
        </Button>
      </Box>
    </Container>
  )
}

export default CreateSchool