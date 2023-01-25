import { Button, Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';
import userPic from "../assets/user.svg";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { StyledTextField } from "../components/styled-components";
import { DatePicker } from "@mui/x-date-pickers";
import authorizedAxios from '../api/authorizedAxios';
import { ErrorMessage } from "@hookform/error-message";


const fields = {
  role: 'role',
  name: 'name',
  surname: 'surname',
  gender: 'gender',
  birthDate: 'birthDate',
  locality: 'locality',
  institution: 'institution',
  class: 'class',
  email: 'email',
  phone: 'phone',
  address: 'address'
}

const newUserValidationSchema = Yup.object().shape({
  role: Yup.string()
});

const CreateAccount = () => {

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
    resolver: yupResolver(newUserValidationSchema)
  });

  const onSubmit = data => {
    setIsLoading(true)
    authorizedAxios.post('users',
      {
        email: data.email,
        lastName: data.surname,
        firstName: data.name,
        gender: data.gender,
        phoneNumber: data.phone,
        domicile: data.locality,
        birthDate: data.birthDate,
        school: 47,
        role_id: parseInt(data.role),
        class_id: 0
      })

      .then((response) => { navigate("/") })
      .catch((err) => {
        const formError = { type: "server", message: err.response?.data?.error ? err.response.data.error : err.message }
        setError("errorBox", formError)
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  return (
    <Grid container>
      <Grid item container direction={"column"} m={10} xs={12} >
        <Grid item mb={2}>
          <Typography variant="h5">
            Create new account
          </Typography>
        </Grid>
        <Grid item mb={2}>
          <Typography sx={{ color: 'error.main' }}>
            <ErrorMessage errors={errors} name="errorBox" />
          </Typography>
        </Grid>
        <Grid item container columnSpacing={5} sx={{ bgcolor: `primary.light`, borderRadius: '10px', minWidth: '50vw', p: 2 }} alignItems="center">
          <Grid item >
            <Typography variant="h6">Status</Typography>
          </Grid>
          <Grid item >
            <Controller
              control={control}
              name={fields.role}
              render={({ field: { onChange, value = 2 } }) => (
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    size="small"
                    id={fields.role}
                    name={fields.role}
                    value={value}
                    label="Status"
                    {...register(fields.role)}
                    onChange={onChange}
                    error={!!errors.role}
                  >
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>Director</MenuItem>
                    <MenuItem value={5}>Teacher</MenuItem>
                    <MenuItem value={6}>Student</MenuItem>
                  </Select>
                </FormControl>
              )} />
          </Grid>
        </Grid>
        <Grid item container columnSpacing={5} rowSpacing={1} sx={{ bgcolor: `primary.light`, borderRadius: '10px', minWidth: '50vw', p: 2 }} justifyItems="center" mt={5} direction={"column"}>
          <Grid item >
            <Typography variant="h6">Personal details</Typography>
          </Grid>
          <Grid item container alignItems={"center"} columnSpacing={2}>
            <Grid item>
              <Typography >
                Name
              </Typography>
            </Grid>
            <Grid item>
              <StyledTextField
                size="small"
                required
                fullWidth
                id={fields.name}
                label="Name"
                name={fields.name}
                autoFocus
                {...register(fields.name)}
                error={!!errors.name}
                helperText={errors.name && errors.name.message.toString()}
              />
            </Grid>
          </Grid>
          <Grid item container alignItems={"center"} columnSpacing={2}>
            <Grid item>
              <Typography >
                Surname
              </Typography>
            </Grid>
            <Grid item>
              <StyledTextField
                size="small"
                required
                fullWidth
                id={fields.surname}
                label="Surname"
                name={fields.surname}
                autoFocus
                {...register(fields.surname)}
                error={!!errors.surname}
                helperText={errors.surname && errors.surname.message.toString()}
              />
            </Grid>
          </Grid>
          <Grid item container alignItems={"center"} columnSpacing={2}>
            <Grid item>
              <Typography >
                Gender
              </Typography>
            </Grid>
            <Grid item>
              <Controller
                name={fields.gender}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    value={value}
                    onChange={onChange}
                    {...register(fields.gender)}
                    id={fields.gender}
                    name={fields.gender}
                    row
                  >
                    <FormControlLabel
                      value={"M"}
                      label={"M"}
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value={"F"}
                      label={"F"}
                      control={<Radio />}
                    />
                  </RadioGroup>
                )}
              />
            </Grid>
          </Grid>
          <Grid item container alignItems={"center"} columnSpacing={2}>
            <Grid item>
              <Typography >
                Date of birth
              </Typography>
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name={fields.birthDate}
                render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                  <DatePicker
                    disableFuture
                    {...field}
                    inputRef={ref}
                    label="Date"
                    renderInput={(inputProps) => (
                      <TextField
                        {...inputProps}
                        onBlur={onBlur}
                        name={name}
                        error={!!errors.birthDate}
                        helperText={errors.birthDate && errors.birthDate.message.toString()}
                        size="small"
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item container alignItems={"center"} columnSpacing={2}>
            <Grid item>
              <Typography >
                Locality
              </Typography>
            </Grid>
            <Grid item>
              <StyledTextField
                size="small"
                required
                fullWidth
                id={fields.locality}
                label="Locality"
                name={fields.locality}
                autoFocus
                {...register(fields.locality)}
                error={!!errors.locality}
                helperText={errors.locality && errors.locality.message.toString()}
              />
            </Grid>
          </Grid>
          <Grid item container alignItems={"center"} columnSpacing={2}>
            <Grid item>
              <Typography >
                Education institution
              </Typography>
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name={fields.institution}
                render={({ field: { onChange, value = 2 } }) => (
                  <FormControl fullWidth>
                    <InputLabel>Institution</InputLabel>
                    <Select
                      fullWidth
                      required
                      size="small"
                      id={fields.institution}
                      name={fields.institution}
                      value={value}
                      label="Institution"
                      {...register(fields.institution)}
                      onChange={onChange}
                      error={!!errors.institution}
                    >
                      <MenuItem value={2}>I.P.L.T. Ginta Latina</MenuItem>
                      <MenuItem value={47}>Cool School</MenuItem>
                      <MenuItem value={48}>Nice School</MenuItem>
                    </Select>
                  </FormControl>
                )} />
            </Grid>
          </Grid>
          <Grid item container alignItems={"center"} columnSpacing={2}>
            <Grid item>
              <Typography >
                Class
              </Typography>
            </Grid>
            <Grid item>
              <StyledTextField
                size="small"
                required
                fullWidth
                id={fields.class}
                label="Class"
                name={fields.class}
                autoFocus
                {...register(fields.class)}
                error={!!errors.class}
                helperText={errors.class && errors.class.message.toString()}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container columnSpacing={5} rowSpacing={1} sx={{ bgcolor: `primary.light`, borderRadius: '10px', minWidth: '50vw', p: 2 }} justifyItems="center" mt={5} direction={"column"}>
          <Grid item >
            <Typography variant="h6">Account details</Typography>
          </Grid>
          <Grid item container alignItems={"center"} columnSpacing={2}>
            <Grid item>
              <Typography >
                Email
              </Typography>
            </Grid>
            <Grid item>
              <StyledTextField
                size="small"
                required
                fullWidth
                id={fields.email}
                label="Email"
                name={fields.email}
                autoFocus
                {...register(fields.email)}
                error={!!errors.email}
                helperText={errors.email && errors.email.message.toString()}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container columnSpacing={5} rowSpacing={1} sx={{ bgcolor: `primary.light`, borderRadius: '10px', minWidth: '50vw', p: 2 }} justifyItems="center" mt={5} direction={"column"}>
          <Grid item >
            <Typography variant="h6">Contact details</Typography>
          </Grid>
          <Grid item container alignItems={"center"} columnSpacing={2}>
            <Grid item>
              <Typography >
                Phone
              </Typography>
            </Grid>
            <Grid item>
              <StyledTextField
                size="small"
                required
                fullWidth
                id={fields.phone}
                label="Phone"
                name={fields.phone}
                autoFocus
                {...register(fields.phone)}
                error={!!errors.phone}
                helperText={errors.phone && errors.phone.message.toString()}
              />
            </Grid>
          </Grid>
          <Grid item container alignItems={"center"} columnSpacing={2}>
            <Grid item>
              <Typography >
                Address
              </Typography>
            </Grid>
            <Grid item>
              <StyledTextField
                size="small"
                required
                fullWidth
                id={fields.address}
                label="Address"
                name={fields.address}
                autoFocus
                {...register(fields.address)}
                error={!!errors.address}
                helperText={errors.address && errors.address.message.toString()}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CreateAccount