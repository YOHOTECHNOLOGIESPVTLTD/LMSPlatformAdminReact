import React from 'react';
// ** React Imports
import { useState, forwardRef } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// ** Third Party Imports
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';

// ** Custom Components Imports
import CustomTextField from 'components/mui/text-field';

// ** Styled Components
import DatePickerWrapper from 'styles/libs/react-datepicker';

/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ''}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <CustomTextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
});

/* eslint-enable */
const OfflineExamFilterCard = () => {
  // ** State
  const [dates, setDates] = useState([]);
  const [statusValue, setStatusValue] = useState('');
  const [endDateRange, setEndDateRange] = useState(null);
  const [startDateRange, setStartDateRange] = useState(null);

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

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Filters" />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Status"
                    SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="downloaded">Downloaded</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="partial payment">Partial Payment</MenuItem>
                    <MenuItem value="past due">Past Due</MenuItem>
                    <MenuItem value="sent">Sent</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Course"
                    SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="downloaded">Downloaded</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="partial payment">Partial Payment</MenuItem>
                    <MenuItem value="past due">Past Due</MenuItem>
                    <MenuItem value="sent">Sent</MenuItem>
                  </CustomTextField>
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
                      <CustomInput dates={dates} setDates={setDates} label="Exam Date" end={endDateRange} start={startDateRange} />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default OfflineExamFilterCard;
