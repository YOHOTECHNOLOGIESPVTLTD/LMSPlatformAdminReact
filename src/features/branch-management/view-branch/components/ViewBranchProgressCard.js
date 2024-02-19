import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';
import ReactApexCharts from 'react-apexcharts';
import { hexToRGBA } from 'utils/hex-to-rgba';

const data = [
  {
    subtitle: '142',
    title: 'Total Classes',
    avatarIcon: 'tabler:ticket'
  },
  {
    subtitle: '28',
    avatarColor: 'info',
    title: 'Total Exams',
    avatarIcon: 'tabler:circle-check'
  }
];

const AnalyticsSupportTracker = () => {
  const theme = useTheme();

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { dashArray: 10 },
    labels: ['Completed Task'],
    colors: [hexToRGBA(theme.palette.primary.main, 1)],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityTo: 0.5,
        opacityFrom: 1,
        shadeIntensity: 0.5,
        stops: [30, 70, 100],
        inverseColors: false,
        gradientToColors: [theme.palette.primary.main]
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 130,
        startAngle: -140,
        hollow: { size: '60%' },
        track: { background: 'transparent' },
        dataLabels: {
          name: {
            offsetY: -15,
            color: theme.palette.text.disabled,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.body2.fontSize
          },
          value: {
            offsetY: 15,
            fontWeight: 500,
            formatter: (value) => `${value}%`,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h1.fontSize
          }
        }
      }
    },
    grid: {
      padding: {
        top: -30,
        bottom: 12
      }
    },
    responsive: [
      {
        breakpoint: 1300,
        options: {
          grid: {
            padding: {
              left: 22
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          grid: {
            padding: {
              left: 0
            }
          }
        }
      }
    ]
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={5}>
            <Typography variant="h1">164</Typography>
            <Typography sx={{ mb: 6, color: 'text.secondary' }}>Total Branches</Typography>
            {data.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: index !== data.length - 1 ? 4 : undefined }}>
                <CustomAvatar skin="light" variant="rounded" color={item.avatarColor} sx={{ mr: 4, width: 34, height: 34 }}>
                  <Icon icon={item.avatarIcon} />
                </CustomAvatar>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                    {item.subtitle}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} sm={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ReactApexCharts type="radialBar" height={325} options={options} series={[85]} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSupportTracker;
