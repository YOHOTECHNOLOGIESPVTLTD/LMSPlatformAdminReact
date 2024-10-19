// ** React Imports
import { forwardRef, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
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
import { TextField, Tooltip, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DeleteDialog from 'components/modal/DeleteModel';
// import OptionsMenu from 'components/option-menu';
import { Link } from 'react-router-dom';
import PaymentAddDrawer from './PaymentAddDrawer';
import PaymentCardHeader from './PaymentCardHeader';
import PaymentEditDrawer from './PaymentEditDrawer';
// ** Styled Components
// import { selectBatches } from 'features/batch-management/batches/redux/batchSelectors';
// import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import FeesTableSkeleton from 'components/cards/Skeleton/PaymentSkeleton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';

import { selectPayments,selectLoading } from '../redux/paymentSelectors';
import { getAllPayments } from '../redux/paymentThunks';
import { getImageUrl } from 'themes/imageUtlis';
import { formateDate } from 'utils';

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}));

const CustomNoRowsOverlay = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontSize: '18px',
      }}
    >
      <Typography variant="body1" color="textSecondary">
        No data available
      </Typography>
    </Box>
  );
};

// ** renders client column
const renderClient = (row) => {
  if (row?.institute?.image) {
    return <Avatar src={getImageUrl(row?.institute?.image)} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <Avatar
        skin="light"
        color={row?.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row?.institute?.institute_name.toUpperCase() || 'John Doe')}
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
  const [endDateRange, setEndDateRange] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  function convertDateFormat(input) {
    // Create a new Date object from the original date string
    var originalDate = new Date(input);
    // Extract the year, month, and day components
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are 0-based
    var day = ('0' + originalDate.getDate()).slice(-2);

    // Form the yyyy-mm-dd date string
    var formattedDateString = year + '-' + month + '-' + day;

    return formattedDateString;
  }


  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(payments);

  useEffect(() => {
    dispatch(
      getAllPayments({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId, refetch]);

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };



  const handleRowClick = (rowData) => {
    setSelectedRows(rowData);
  };

  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
      const data = {
        start_date: convertDateFormat(start),
        end_date: convertDateFormat(end),
        branch_id: selectedBranchId
      };
      dispatch(getAllPayments(data));
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  // useEffect(() => {
  //   dispatch(
  //     getAllBatches({
  //       branch_id: selectedBranchId
  //     })
  //   );
  // }, [dispatch, selectedBranchId]);

  // const batch = useSelector(selectBatches);

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
      minWidth: 200,
      field: 'institute_name',
      headerName: 'Institute Name',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {row.institute.institute_name}
              </Typography>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 400,fontSize:"12px" ,mt:0.5}}>
                {row.institute.email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'plans',
      headerName: ' current plan',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row?.currentSubscriptionPlan?.planId?.identity}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'issuedDate',
      headerName: 'Issued Date',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{ formateDate(row?.currentSubscriptionPlan?.startDate)} - {formateDate(row?.currentSubscriptionPlan?.endDate)}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 100,
      field: 'total',
      headerName: 'Amount Paid',
      renderCell: ({ row }) =>
       <Typography sx={{ color: 'text.secondary', ml: 2 }}>{`$${row.paid_amount || 0}`}</Typography>
    },
  ];

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="View">
            <IconButton component={Link} state={{ id : row?.institute?.uuid }} size="small" sx={{ color: 'text.secondary' }} to={`/payment-management/payments/${row.uuid}/view`}>
              <Icon icon="tabler:eye" />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Edit" >
            <IconButton component={Link} size='small' sx={{ color: "text.secondary"}} to={`/apps/invoice/edit/${row.id}`} >
              <Icon icon="tabler:edit" fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download" >
            <IconButton  size='small' sx={{ color: "text.secondary"}} >
              <Icon icon="tabler:download" fontSize={20} />
            </IconButton>
          </Tooltip> */}
          {/* <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'View',
                icon: <Icon icon="tabler:eye" fontSize={20} />,
                menuItemProps: {
                  component: Link,
                  to: `/apps/invoice/preview/${row.id}`
                }
              },
              {
                text: 'Edit',
                to: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon="tabler:edit" fontSize={20} />,
                menuItemProps: {
                  onClick: () => {
                    handleRowClick(row);
                    toggleEditUserDrawer(); // Toggle the edit drawer when either the text or the icon is clicked
                  }
                }
              },
              {
                text: 'Download',
                icon: <Icon icon="tabler:download" fontSize={20} />
              }
            ]}
          /> */}
        </Box>
      )
    }
  ];

  const loading = useSelector(selectLoading)

  return (
    <DatePickerWrapper>
      {/* <CardHeader title="Fee" sx={{ 
        "&.MuiCardHeader-title" : {
          fontSize: "20px"
        }
      }} titleTypographyProps={true} /> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "none"}}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {/* <Autocomplete
                    // multiple
                    fullWidth
                    options={batch}
                    filterSelectedOptions
                    onChange={(e, newValue) => {
                      // const batchId = newValue.map((item) => item.batch.batch_id);
                      console.log(newValue);
                      const data = {
                        batch_id: newValue.batch.batch_id,
                        branch_id: selectedBranchId
                      };
                      dispatch(getAllPayments(data));
                    }}
                    // defaultValue={[top100Films[13]]}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                  /> */}
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
          {!loading && <PaymentCardHeader selectedBranchId={selectedBranchId}  selectedRows={selectedRows}  toggle={toggleAddUserDrawer} /> }
        </Grid>
        <Grid item xs={12}>
          <Card>
            {loading ? (
              <FeesTableSkeleton />
            ) : (
              <DataGrid
                sx={{ 
              "& .MuiDataGrid-row" : {
                border : "1px solid #e6e5e7",
                borderLeft: "none",
                borderRight: "none",
                ":hover" : {
                   backgroundColor : "#f5f5f7",
                   border : "1px solid #e6e5e7",
                   borderLeft: "none",
                   borderRight: "none"
                }
              },
              "& .MuiDataGrid-columnHeaders" : {
                   border : "1px solid #e6e5e7",
                   borderLeft: "none",
                   borderRight: "none"
              }
                }}
                autoHeight
                pagination
                rowHeight={62}
                // rows={StudentFees}
                rows={payments?.data ?? []}
                columns={columns}
                disableRowSelectionOnClick
                hideFooter={true}
                hideFooterPagination={true}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
                slots={{
                  noRowsOverlay : CustomNoRowsOverlay
                }}
                disableColumnMenu={true}
                disableColumnFilter={true}
              />
            )}
          </Card>
        </Grid>
      </Grid>

      <PaymentAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      <PaymentEditDrawer
        setRefetch={setRefetch}
        open={editUserOpen}
        toggle={toggleEditUserDrawer}
        selectedRows={selectedRows}
        handleRowClick={handleRowClick}
      />
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
