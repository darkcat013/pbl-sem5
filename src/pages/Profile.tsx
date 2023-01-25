import { Grid, Typography } from "@mui/material"
import userPic from "../assets/user.svg";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';
import { useEffect } from 'react';
import authorizedAxios from "../api/authorizedAxios";
import { useUserStore } from "../contexts/UserContext";
import { Observer } from "mobx-react";

const Profile = () => {
  const userStore = useUserStore();

  return (
    <Observer>
      {() =>
        <Grid container direction={"column"} marginTop={1} paddingLeft={3} paddingRight={3} spacing={10}>
          <Grid item container xs={12} direction={"row"} spacing={10}>
            <Grid item xs={4}>
              <Grid item container direction={"column"} alignContent={"center"}>
                <Grid item>
                  <img src={userPic} alt="user" style={{ height: '128px', width: '128px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {userStore.user?.firstName + " " + userStore.user?.lastName}
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
                      {userStore.user?.firstName}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Typography variant="h6">
                        Gender
                      </Typography>
                    </Grid>
                    <Grid item>
                      {userStore.user?.gender}
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
                      {userStore.user?.lastName}
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid item>
                      <Typography variant="h6">
                        Date of birth
                      </Typography>
                    </Grid>
                    <Grid item>
                      {userStore.user?.birthDate.Time}
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
                      Email
                    </Grid>
                    <Grid item>
                      {userStore.user?.email}
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
                      {userStore.user?.phoneNumber.String}
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
                      {userStore.user?.domicile.String}
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
                      {userStore.user?.domicile.String}
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
      }
    </Observer>
  )
}

export default Profile