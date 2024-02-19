// ** MUI Imports
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from 'components/mui/avatar';
import { Link } from 'react-router-dom';

const NonTeachingStaffCard = () => {
  const data = [
    {
      id: '1',
      name: 'John',
      email: 'demo@gmail.com',
      rating: '3',
      reviews: '100',
      img: 'https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain',
      isConnected: '0',
      Present: '10',
      Absent: '4',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Doe',
      email: 'demo@gmail.com',
      rating: '4',
      reviews: '150',
      img: 'https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg',
      isConnected: '1',
      Present: '10',
      Absent: '4',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Alex Fransis',
      email: 'demo@gmail.com',
      rating: '5',
      reviews: '160',
      img: 'https://i1.wp.com/essentiallypop.com/epop/wp-content/uploads/2017/03/Alex-Francis-1.png?fit=1126%2C1130&ssl=1',
      isConnected: '0',
      Present: '10',
      Absent: '4',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Mark Zuckerberg',
      email: 'demo@gmail.com',
      rating: '5',
      reviews: '200',
      img: 'https://th.bing.com/th/id/OIP.2E3Y6iZbN-18fnzwBpX__wExDM?rs=1&pid=ImgDetMain',
      isConnected: '1',
      Present: '10',
      Absent: '4',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Elon Musk',
      email: 'demo@gmail.com',
      rating: '5',
      reviews: '100',
      img: 'https://i1.wp.com/pagesix.com/wp-content/uploads/sites/3/2016/03/471769884.jpg?quality=90&strip=all&ssl=1',
      isConnected: '0',
      Present: '10',
      Absent: '4',
      status: 'inactive'
    },
    {
      id: '6',
      name: 'Jeff Bezos',
      email: 'demo@gmail.com',
      rating: '4',
      reviews: '70',
      img: 'https://crooksandliars.com/files/primary_image/19/02/gettyimages-1079533948_copy.jpeg',
      isConnected: '1',
      Present: '10',
      Absent: '4',
      status: 'Active'
    },
    {
      id: '7',
      name: 'Bill Gates',
      email: 'demo@gmail.com',
      rating: '3',
      reviews: '700',
      img: 'https://www.rollingstone.com/wp-content/uploads/2021/02/Gates_thumb_clean.jpg',
      isConnected: '1',
      Present: '10',
      Absent: '4',
      status: 'inactive'
    },
    {
      id: '8',
      name: 'Larry Page',
      email: 'demo@gmail.com',
      rating: '4',
      reviews: '900',
      img: 'https://th.bing.com/th/id/R.928fbc6429d99bb33e5d3387d331d994?rik=eiZ1vn1%2bvpr7Zg&riu=http%3a%2f%2fcrowdforthink.com%2fassets%2fuploads%2fstories%2fada9c87f4bb7fc4b55c927ac678a74bb.jpeg&ehk=RPx6fS4SVklzSA%2fQQCWMZ4%2fIUKRbAevxTx0tk3Vh1v0%3d&risl=&pid=ImgRaw&r=0',
      isConnected: '1',
      Present: '10',
      Absent: '4',
      status: 'inactive'
    },
    {
      id: '9',
      name: 'Sundar Pichai',
      email: 'demo@gmail.com',
      rating: '5',
      reviews: '1000',
      img: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2015/8/11/7/original/sunder-pichai-twitter.JPG',
      isConnected: '1',
      Present: '10',
      Absent: '4',
      status: 'inactive'
    },
    {
      id: '10',
      name: 'Satya Nadella',
      email: 'demo@gmail.com',
      rating: '3.5',
      reviews: '6600',
      img: 'https://pawantech12.github.io/timeshop/images/image1.jpg',
      isConnected: '1',
      Present: '10',
      Absent: '4',
      status: 'Active'
    }
  ];

  return (
    <>
      <Grid>
        <Grid container xs={12} spacing={2} mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          {data.map((item, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <Card sx={{ position: 'relative', p: 1.5 }}>
                <CardContent sx={{ pt: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Avatar src={item.img} sx={{ mb: 3, width: 100, height: 100 }} />
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="h6">{item.email}</Typography>

                    <Box
                      sx={{
                        mt: 3,
                        mb: 3,
                        gap: 2,
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography variant="h4">{item.Present}</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Present</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography variant="h4">{item.Absent}</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Absent</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', mt: 1 }}
                    >
                      <Grid>
                        <Button component={Link} to={item.id} variant="tonal" sx={{ px: 4 }}>
                          View Attendance
                        </Button>
                      </Grid>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default NonTeachingStaffCard;
