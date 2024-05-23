import { FormControlLabel, IconButton, Stack, Switch } from '@mui/material';
import styled from '@mui/system/styled';
import { DateCalendar, DateCalendarProps, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { ComponentProps } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type CustomPickerDayProps = PickersDayProps<Dayjs> & {
  isSelected: boolean;
  isHovered: boolean;
  isBetween: boolean;
  isStart: boolean;
  isEnd: boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'isSelected' &&
    prop !== 'isHovered' &&
    prop !== 'isBetween' &&
    prop !== 'isStart' &&
    prop !== 'isEnd',
})<CustomPickerDayProps>(({
  theme,
  isSelected,
  isHovered,
  isStart,
  isBetween,
  isEnd,
  /* day, */
}) => {
  // if (day.date() === 17) {
  //   console.log(day.date(), isSelected, isHovered, isStart, isBetween, isEnd);
  // }
  return {
    // width: 36,
    // height: 36,
    borderRadius: '50%',
    ...(isSelected && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    }),
    ...(isHovered && {
      border: '1px solid white',
    }),
    ...(isBetween && {
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: 0,
    }),
    ...(isStart &&
      !isEnd &&
      !isBetween && {
        borderRight: 'none',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
      }),
    ...(isEnd &&
      !isStart &&
      !isBetween && {
        borderLeft: 'none',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
      }),
    ...(isStart &&
      isEnd &&
      !isBetween && {
        borderRadius: '50%',
      }),
  };
});

type DayProps = PickersDayProps<Dayjs> & {
  selectedFromDate?: Dayjs | null;
  selectedToDate?: Dayjs | null;
  hoveredDate?: Dayjs | null;
  range?: boolean;
};

function Day(props: DayProps) {
  const { day, selectedFromDate, selectedToDate, hoveredDate, range, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      disableMargin
      selected={false}
      isSelected={
        (selectedFromDate && day.isSame(selectedFromDate, 'day')) ||
        (range &&
          selectedFromDate &&
          selectedToDate &&
          day.isBetween(selectedFromDate, selectedToDate, 'day', '[]')) ||
        false
      }
      isStart={
        (range &&
          (day.isSame(selectedFromDate, 'day') ||
            (selectedToDate &&
              !hoveredDate?.isSame(selectedToDate, 'day') &&
              hoveredDate?.isAfter(selectedFromDate, 'day') &&
              day.isSame(hoveredDate, 'day')) ||
            (hoveredDate?.isSameOrBefore(selectedFromDate, 'day') &&
              day.isSame(hoveredDate, 'day')))) ||
        day.isSame(selectedFromDate, 'day') ||
        false
      }
      isEnd={
        (range &&
          // To should always have end
          (day.isSame(selectedToDate, 'day') ||
            // Hovered should always have end when we don't have to
            (!selectedToDate && selectedFromDate && day.isSame(hoveredDate, 'day')) ||
            (!hoveredDate?.isSame(selectedFromDate, 'day') &&
              selectedToDate &&
              day.isSame(hoveredDate, 'day')) ||
            (!hoveredDate &&
              selectedFromDate &&
              !selectedToDate &&
              day.isSame(selectedFromDate, 'day')) ||
            (hoveredDate &&
              !selectedToDate &&
              selectedFromDate &&
              hoveredDate.isBefore(selectedFromDate, 'day') &&
              day.isSame(selectedFromDate, 'day')))) ||
        (!range && day.isSame(selectedFromDate, 'day')) ||
        false
      }
      isHovered={
        day.isSame(hoveredDate, 'day') ||
        (range &&
          !selectedToDate &&
          selectedFromDate &&
          hoveredDate?.isAfter(selectedFromDate, 'day') &&
          day.isBetween(selectedFromDate, hoveredDate, 'day', '[]')) ||
        false
      }
      isBetween={
        range && selectedFromDate
          ? (!selectedToDate &&
              hoveredDate &&
              !selectedFromDate.isSame(hoveredDate, 'day') &&
              day.isBetween(selectedFromDate, hoveredDate, 'day', '()')) ||
            (selectedToDate && day.isBetween(selectedFromDate, selectedToDate, 'day', '()')) ||
            false
          : false
      }
    />
  );
}

type DateRangePickerProps = DateCalendarProps<Dayjs> & {
  setHoveredDate: (date: Dayjs | null) => void;
  hoveredDate: Dayjs | null;
  selectedFromDate: Dayjs | null | undefined;
  selectedToDate: Dayjs | null | undefined;
  setRoundTrip?: (roundTrip: boolean) => void;
  roundTrip?: boolean;
  setRangeLabel?: string;
  value: Dayjs | null;
  rootProps?: ComponentProps<typeof Stack>;
  closeDatePopper: () => void;
};

export default function DateRangePicker(props: DateRangePickerProps) {
  const {
    setHoveredDate,
    hoveredDate,
    selectedFromDate,
    selectedToDate,
    slots,
    slotProps,
    setRoundTrip,
    roundTrip = true,
    setRangeLabel,
    value,
    rootProps,
    closeDatePopper,
    ...rest
  } = props;

  return (
    <Stack {...rootProps}>
      <Stack padding={2} direction="row" justifyContent="space-between">
        {setRoundTrip ? (
          <FormControlLabel
            control={<Switch checked={roundTrip} onChange={() => setRoundTrip(!roundTrip)} />}
            label={setRangeLabel}
          />
        ) : null}
        <IconButton onClick={() => closeDatePopper}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack direction="row">
        <DateCalendar
          slots={{ day: Day, ...slots }}
          slotProps={{
            day: (ownerState) => ({
              selectedFromDate,
              selectedToDate,
              range: roundTrip,
              hoveredDate,
              onPointerEnter: () => setHoveredDate(ownerState.day),
              onPointerLeave: () => setHoveredDate(null),
            }),
            ...slotProps,
          }}
          {...rest}
        />
      </Stack>
    </Stack>
  );
}
