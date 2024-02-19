// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Demo Components
import AboutOverivew from './AboutOverivew'
// import ProjectsTable from './ProjectsTable'
// import ActivityTimeline from './ActivityTimeline'
// import ConnectionsTeams from './ConnectionsTeams'

const ProfileTab = ({ data }) => {
 
  return data &&  (
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <AboutOverivew data={data} about={data?.about} contacts={data?.contacts} teams={data?.teams} overview={data.overview} />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {/* <ActivityTimeline /> */}
          </Grid>
          {/* <ConnectionsTeams connections={data.connections} teams={data.teamsTech} /> */}
          <Grid item xs={12}>
            {/* <ProjectsTable /> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileTab
