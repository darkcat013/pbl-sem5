import { Grid, Typography } from "@mui/material"
import userPic from "../assets/user.svg";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';

const Profile = () => {
  return (
    <Grid container direction={"column"} marginTop={1} paddingLeft={3} paddingRight={3} spacing={10}>
      <Grid item container xs={12} direction={"row"} spacing={10}>
        <Grid item xs={4}>
          <Grid item container direction={"column"} alignContent={"center"}>
            <Grid item>
              <img src={userPic} alt="user" style={{ height: '128px', width: '128px' }} />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Name Surname
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid item container direction={"row"} sx={{ bgcolor: 'primary.light', borderRadius: '10px' }} paddingBottom={3} spacing={3}>
            <Grid item container>
              <Typography variant="h5">
                Personal details
              </Typography>
            </Grid>
            <Grid item container spacing={5} direction={"column"} xs={5}>
              <Grid item>
                <Grid item>
                  <Typography variant="h6">
                    Name
                  </Typography>
                </Grid>
                <Grid item>
                  Name
                </Grid>
              </Grid>
              <Grid item>
                <Grid item>
                  <Typography variant="h6">
                    Gender
                  </Typography>
                </Grid>
                <Grid item>
                  M
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={5} direction={"column"} xs={7}>
              <Grid item>
                <Grid item>
                  <Typography variant="h6">
                    Surname
                  </Typography>
                </Grid>
                <Grid item>
                  Surname
                </Grid>
              </Grid>

              <Grid item>
                <Grid item>
                  <Typography variant="h6">
                    Date of birth
                  </Typography>
                </Grid>
                <Grid item>
                  March 23, 2008 (15 yrs old)
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} direction={"row"} spacing={10}>
        <Grid item xs={4}>
          <Grid item container direction={"column"} sx={{ bgcolor: 'primary.light', borderRadius: '10px' }} paddingBottom={3} spacing={3}>
            <Grid item>
              <Typography variant="h5">
                Contact details
              </Typography>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={3}>
                <EmailIcon sx={{ fontSize: "42px" }} />
              </Grid>
              <Grid item container direction={"column"} xs={9}>
                <Grid item>
                  E-mail
                </Grid>
                <Grid item>
                  user@mail.com
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={3}>
                <LocalPhoneIcon sx={{ fontSize: "42px" }} />
              </Grid>
              <Grid item container direction={"column"} xs={9}>
                <Grid item>
                  Phone
                </Grid>
                <Grid item>
                  + (373) 60 010 010
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={3}>
                <PlaceIcon sx={{ fontSize: "42px" }} />
              </Grid>
              <Grid item container direction={"column"} xs={9}>
                <Grid item>
                  Address
                </Grid>
                <Grid item>
                  str. Florilor 8/20, Chisinau
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid item container direction={"row"} sx={{ bgcolor: 'primary.light', borderRadius: '10px' }} paddingBottom={3} spacing={3}>
            <Grid item container>
              <Typography variant="h5">
                Academic details
              </Typography>
            </Grid>
            <Grid item container spacing={5} direction={"column"} xs={5}>
              <Grid item>
                <Grid item>
                  <Typography variant="h6">
                    Locality
                  </Typography>
                </Grid>
                <Grid item>
                  Chisinau
                </Grid>
              </Grid>
              <Grid item>
                <Grid item>
                  <Typography variant="h6">
                    Education institution
                  </Typography>
                </Grid>
                <Grid item>
                  Theoretical Lyceum "Ion Creanga"
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={5} direction={"column"} xs={7}>
              <Grid item>
                <Grid item>
                  <Typography variant="h6">
                    Class
                  </Typography>
                </Grid>
                <Grid item>
                  9A
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Profile