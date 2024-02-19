// ** React Imports
import { forwardRef, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
// ** Third Party Imports
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
// ** Utils Import
import { getInitials } from 'utils/get-initials';
// ** Custom Components Imports
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import FeesCardHeader from './AttendanceHeader';

// ** Styled Components
import DatePickerWrapper from 'styles/libs/react-datepicker';

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}));

// ** renders client column
const renderClient = (row) => {
  if (row.avatar.length) {
    return <Avatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <Avatar
        skin="light"
        color={row.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row.name || 'John Doe')}
      </Avatar>
    );
  }
};

const defaultColumns = [
  {
    flex: 0,
    minWidth: 100,
    field: 'id',
    headerName: 'ID',
    renderCell: ({ row }) => (
      <Typography component={LinkStyled} to={`/apps/invoice/preview/${row.id}`}>
        {`#${row.id}`}
      </Typography>
    )
  },
  {
    minWidth: 400,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }) => {
      const { name, companyEmail } = row;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {name}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
              {companyEmail}
            </Typography>
          </Box>
        </Box>
      );
    }
  },

  {
    minWidth: 300,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) =>
      row.Status !== 1 ? (
        <TextField
          select
          fullWidth
          defaultValue="1"
          size="small"
          sx={{
            '& .MuiSelect-select': {
              //  backgroundColor:'#00d32433'
              border: '2px solid #65B741',
              color: '#65B741',
              borderRadius: 1
            }
          }}
        >
          <MenuItem value="1">Present</MenuItem>
          <MenuItem value="0">Absent</MenuItem>
        </TextField>
      ) : (
        <TextField
          select
          fullWidth
          defaultValue="0"
          size="small"
          sx={{
            '& .MuiSelect-select': {
              //  backgroundColor:'#ff686847'
              border: '2px solid #FF6868',
              color: '#FF6868',
              borderRadius: 1
            }
          }}
        >
          <MenuItem value="1">Present</MenuItem>
          <MenuItem value="0">Absent</MenuItem>
        </TextField>
      )
  }
];

/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ''}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
});

/* eslint-enable */
const AttendanceTable = () => {
  // ** State
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [endDateRange, setEndDateRange] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  // ** Hooks
  const handleFilter = (val) => {
    setValue(val);
  };

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };

  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const columns = [...defaultColumns];

  const store = [
    {
      id: 1,
      Status: 0,
      name: 'Anish',
      Email: 'anish.yohotechnologies.com',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 2,
      Status: 1,
      name: 'Mohammed Thasthakir',
      Email: 'mohammedthasthakir.yohotechnologies.com',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 3,
      Status: 0,
      name: 'TDeeban',
      Email: 'deeban.yohotechnologies.com',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 4,
      Status: 0,
      name: 'Midhin Sundar',
      Email: 'midhinsundar.yohotechnologies.com',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 5,
      Status: 1,
      name: 'Divya Bharathi',
      Email: 'divyabharathi.yohotechnologies.com',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 6,
      Status: 0,
      name: 'Sanjay',
      Email: 'sanjay.yohotechnologies.com',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 7,
      Status: 1,
      name: 'Thulasi Ram',
      Email: 'thulasiram.yohotechnologies.com',
      avatar: '',
      avatarColor: 'primary'
    }
  ];

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Filters" />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Invoice Status"
                    SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="downloaded">Downloaded</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="partial payment">Partial Payment</MenuItem>
                    <MenuItem value="past due">Past Due</MenuItem>
                    <MenuItem value="sent">Sent</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id="date-range-picker-months"
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput dates={dates} setDates={setDates} label="Invoice Date" end={endDateRange} start={startDateRange} />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <FeesCardHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              rows={store}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default AttendanceTable;
