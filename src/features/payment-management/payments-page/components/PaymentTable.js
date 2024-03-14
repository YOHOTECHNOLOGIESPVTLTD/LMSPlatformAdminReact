// ** React Imports
import { forwardRef, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
// ** Icon Imports
import Icon from 'components/icon';
// ** Third Party Imports
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
// ** Utils Import
import { getInitials } from 'utils/get-initials';
// ** Custom Components Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import DeleteDialog from 'components/modal/DeleteModel';
// import DeleteDialog from 'components';
import CustomChip from 'components/mui/chip';
import OptionsMenu from 'components/option-menu';
import { Link } from 'react-router-dom';
import FeesAddDrawer from './PaymentAddDrawer';
import FeesCardHeader from './PaymentCardHeader';
import FeesEditDrawer from './PaymentEditDrawer';
import FeesViewDrawer from './PaymentViewDrawer';
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
const FeesTable = () => {
  // ** State
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState('');
  const [endDateRange, setEndDateRange] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [viewUserOpen, setViewUserOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const toggleViewUserDrawer = () => {
    setViewUserOpen(!viewUserOpen);
    console.log('Toggle drawer');
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };

  // const handleStatusChange = () => {
  //   setDeleteDialogOpen(true);
  // };

  // ** Hooks
  const handleFilter = (val) => {
    setValue(val);
  };

  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const students = [
    { students_id: '1', students_name: 'students 1' },
    { students_id: '2', students_name: 'students 2' },
    { students_id: '3', students_name: 'students 3' }
  ];

  const [selectedstudents, setSelectedstudents] = useState([]);
  const [selectedbatch, setSelectedbatch] = useState([]);

  const batch = [
    { batch_id: '1', batch_name: 'batch 1' },
    { batch_id: '2', batch_name: 'batch 2' },
    { batch_id: '3', batch_name: 'batch 3' }
  ];

  const defaultColumns = [
    {
      flex: 0.1,
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
      flex: 1.25,
      minWidth: 140,
      field: 'transactionId',
      headerName: 'Transaction ID',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.transactionid}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 210,
      field: 'name',
      headerName: 'Institutes',
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
      flex: 1.25,
      minWidth: 120,
      field: 'total',
      headerName: 'Amount Paid',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary', ml: 2 }}>{`$${row.total || 0}`}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'issuedDate',
      headerName: 'Issued Date',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.issuedDate}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'status',
      headerName: 'Status',
      renderCell: () => {
        return (
          // <TextField size="small" select defaultValue="" label="status" id="custom-select" onChange={(e) => handleStatusChange(e, row)}>
          //   <MenuItem value={10}>{row.balance}</MenuItem>
          //   <MenuItem value={20}>Twenty</MenuItem>
          //   <MenuItem value={30}>Thirty</MenuItem>
          // </TextField>
          <CustomChip size="medium" label='paid' variant='tonal' rounded color='success' skin="light" sx={{width:100}}/>
        );
      }
    }
  ];

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="View">
            <IconButton size="small" onClick={toggleViewUserDrawer} sx={{ color: 'text.secondary' }} to={`/apps/invoice/preview/${row.id}`}>
              <Icon icon="tabler:eye" />
            </IconButton>
          </Tooltip>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'Download',
                icon: <Icon icon="tabler:download" fontSize={20} />
              },
              {
                text: 'Edit',
                to: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon="tabler:edit" fontSize={20} />,
                menuItemProps: { onClick: toggleEditUserDrawer }
              },
              {
                text: 'Delete',
                to: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon="tabler:archive-filled" fontSize={20} />,
                // menuItemProps: { onClick: toggleEditUserDrawer }
              }
            ]}
          />
        </Box>
      )
    }
  ];

  const store = [
    {
      id: 1,
      invoiceStatus: 'Sent',
      name: 'John Doe',
      companyEmail: 'john.doe@example.com',
      total: 100,
      issuedDate: '2025-01-01',
      balance: 55,
      avatar: '',
      avatarColor: 'primary',
      transactionid: '5'
    },
    {
      id: 2,
      invoiceStatus: 'Sent',
      name: 'John Doe',
      companyEmail: 'arunbalaji.com',
      total: 200,
      issuedDate: '2000-01-01',
      balance: 50,
      avatar: '',
      avatarColor: 'primary',
      transactionid: '12'
    },
    {
      id: 3,
      invoiceStatus: 'Sent',
      name: 'John Doe',
      companyEmail: 'john.doe@example.com',
      total: 300,
      issuedDate: '25-01-01',
      balance: 40,
      avatar: '',
      avatarColor: 'primary',
      transactionid: '5'
    },
    {
      id: 4,
      invoiceStatus: 'Sent',
      name: 'John Doe',
      companyEmail: 'john.doe@example.com',
      total: 40,
      issuedDate: '202-01-01',
      balance: 30,
      avatar: '',
      avatarColor: 'primary',
      transactionid: '25'
    },
    {
      id: 5,
      invoiceStatus: 'Sent',
      name: 'John Doe',
      companyEmail: 'john.doe@example.com',
      total: 50,
      issuedDate: '20-01-01',
      balance: 0,
      avatar: '',
      avatarColor: 'primary',
      transactionid: '55'
    }
  ];

  return (
    <DatePickerWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Payments" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disableCloseOnSelect
                    multiple
                    id="select-multiple-chip"
                    options={[{ batch_id: 'selectAll', batch_name: 'Select All' }, ...batch]}
                    getOptionLabel={(option) => option.batch_name}
                    value={selectedbatch}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.batch_id === 'selectAll')) {
                        setSelectedbatch(batch.filter((option) => option.batch_id !== 'selectAll'));
                      } else {
                        setSelectedbatch(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Batch"
                        InputProps={{
                          ...params.InputProps,
                          style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                        }}
                      />
                    )}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.batch_name}
                      </li>
                    )}
                    renderTags={(value) => (
                      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {value.map((option, index) => (
                          <CustomChip
                            key={option.batch_id}
                            label={option.batch_name}
                            onDelete={() => {
                              const updatedValue = [...value];
                              updatedValue.splice(index, 1);
                              setSelectedbatch(updatedValue);
                            }}
                            color="primary"
                            sx={{ m: 0.75 }}
                          />
                        ))}
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) => option.batch_id === value.batch_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disableCloseOnSelect
                    multiple
                    id="select-multiple-chip"
                    options={[{ students_id: 'selectAll', students_name: 'Select All' }, ...students]}
                    getOptionLabel={(option) => option.students_name}
                    value={selectedstudents}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.students_id === 'selectAll')) {
                        setSelectedstudents(students.filter((option) => option.students_id !== 'selectAll'));
                      } else {
                        setSelectedstudents(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Students"
                        InputProps={{
                          ...params.InputProps,
                          style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                        }}
                      />
                    )}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.students_name}
                      </li>
                    )}
                    renderTags={(value) => (
                      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {value.map((option, index) => (
                          <CustomChip
                            key={option.students_id}
                            label={option.students_name}
                            onDelete={() => {
                              const updatedValue = [...value];
                              updatedValue.splice(index, 1);
                              setSelectedstudents(updatedValue);
                            }}
                            color="primary"
                            sx={{ m: 0.75 }}
                          />
                        ))}
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) => option.students_id === value.students_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
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
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label="Start date End date"
                        end={endDateRange}
                        start={startDateRange}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <FeesCardHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
            <DataGrid
              sx={{ p: 2 }}
              autoHeight
              pagination
              rowHeight={62}
              rows={store}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
            />
          </Card>
        </Grid>
      </Grid>

      <FeesAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      <FeesEditDrawer open={editUserOpen} toggle={toggleEditUserDrawer} />
      <FeesViewDrawer open={viewUserOpen} toggle={toggleViewUserDrawer} />
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
      />
    </DatePickerWrapper>
  );
};

export default FeesTable;
