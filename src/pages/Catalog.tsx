import { Typography } from "@mui/material"
import { IconButton } from "@mui/material"
import { Container, Grid } from "@mui/material"
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
  const navigate = useNavigate()
  return (
    <Grid container spacing={10} margin={5}>
      <Grid item container direction={"column"}>
        <Grid item container spacing={10}>
          <Grid item><IconButton onClick={() => navigate("math")}><Typography variant='h5'>Math</Typography></IconButton></Grid>
          <Grid item><IconButton onClick={() => navigate("english")}><Typography variant='h5'>English</Typography></IconButton></Grid>
          <Grid item><IconButton onClick={() => navigate("romanian")}><Typography variant='h5'>Romanian</Typography></IconButton></Grid>
        </Grid>
      </Grid>
      <Grid item container direction={"column"}>
        <Grid item container spacing={10}>
          <Grid item><IconButton onClick={() => navigate("math")}><Typography variant='h5'>Math</Typography></IconButton></Grid>
          <Grid item><IconButton onClick={() => navigate("math")}><Typography variant='h5'>Math</Typography></IconButton></Grid>
          <Grid item><IconButton onClick={() => navigate("math")}><Typography variant='h5'>Math</Typography></IconButton></Grid>
        </Grid>
      </Grid>
      <Grid item container direction={"column"}>
        <Grid item container spacing={10}>
          <Grid item><IconButton onClick={() => navigate("math")}><Typography variant='h5'>Math</Typography></IconButton></Grid>
          <Grid item><IconButton onClick={() => navigate("math")}><Typography variant='h5'>Math</Typography></IconButton></Grid>
          <Grid item><IconButton onClick={() => navigate("math")}><Typography variant='h5'>Math</Typography></IconButton></Grid>
        </Grid>
      </Grid>
      <Grid item container direction={"column"}>
        <Grid item container spacing={10}>
          <Grid item><IconButton onClick={() => navigate("math")}><Typography variant='h5'>Math</Typography></IconButton></Grid>
          <Grid item><IconButton onClick={() => navigate("math")}><Typography variant='h5'>Math</Typography></IconButton></Grid>
          <Grid item><IconButton onClick={() => navigate("math")}><Typography variant='h5'>Math</Typography></IconButton></Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Catalog