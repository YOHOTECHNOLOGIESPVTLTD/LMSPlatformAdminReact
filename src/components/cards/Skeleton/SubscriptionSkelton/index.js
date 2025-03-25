import { Grid, Card } from "@mui/material"
import CustomSkeleton from ".."



const SubscriptionSkelton = () => {
    return(
           <Grid container >
             <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between",mb: "32px"}} >
                <CustomSkeleton width={217} height={32} />
                <CustomSkeleton width={179} height={44} borderRadius={"8px"} />
             </Grid>
             <Grid item xs={12} >
               <Card sx={{ display: "flex", justifyContent: 'space-between', padding: "20px", boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}>
                 {
                    [...Array(3)].map((_, index) => (
                      <Grid sx={{ width: "351px", height: "600px"}} key={`subscription-skeleton-${index}`}>                  
                            <CustomSkeleton width={351} height={600} />
                        </Grid>
                    ))
                 }
               </Card>
             </Grid>
           </Grid>
    )
}

export default SubscriptionSkelton