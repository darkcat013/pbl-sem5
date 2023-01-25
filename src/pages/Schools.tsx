import { useEffect, useState } from 'react';
import authorizedAxios from '../api/authorizedAxios';
import Typography from '@mui/material/Typography';
const Schools = () => {
  const [schools, setSchools] = useState<any[]>(null)
  useEffect(() => {
    authorizedAxios.get("schools?page_id=1&page_size=10").then((response) => { setSchools(response.data) })
  }, [])

  return (
    <>
      <Typography variant="h5">
        List of schools
      </Typography>

      <ul>
        {schools && schools.map(s => {
          if (s.name != "admin") return <li key={s.name}>{s.name}</li>
        })}
      </ul>
    </>
  )
}

export default Schools