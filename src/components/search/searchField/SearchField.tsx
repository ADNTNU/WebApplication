'use client';

import useSearchFieldContext from '@hooks/context/useSearchFieldContext';
import { useRouter } from '@internationalization/navigation';
import {
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FocusEventHandler, RefObject, useEffect, useRef, useState } from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTranslations } from 'next-intl';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import dayjsIsBetween from 'dayjs/plugin/isBetween';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import SearchIcon from '@mui/icons-material/Search';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(dayjsIsBetween);

export type SearchFieldProps = {
  obstructedRef?: RefObject<HTMLDivElement>;
  variant: 'header' | 'landing';
};

const inputIds = {
  from: 'search-field-input-from',
  to: 'search-field-input-to',
  date: 'search-field-input-date',
};

const dateFormat = 'DD/MM/YYYY';

export default function SearchField(props: SearchFieldProps) {
  const { obstructedRef, variant } = props;

  // To add more translations, you have to add them to the
  // pick(messages) in the wrapper server components
  const t = useTranslations('Flights');

  const {
    value,
    setValue,
    setFocusedInputId,
    focusedInputId,
    showHeaderSearchField,
    active,
    setActive,
    validDate,
    setValidDate,
    roundTrip,
    setRoundTrip,
  } = useSearchFieldContext();
  const [shown, setShown] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Dayjs | null>(null);
  const [textValue, setTextValue] = useState<string | null>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        ...(value?.from && { f: value?.from }),
        ...(value?.to && { t: value?.to }),
        ...(value?.fromDate && { fd: value?.fromDate.format(dateFormat) }),
        ...(value?.toDate && { td: value?.toDate.format(dateFormat) }),
      },
    });
  };

  const handleChangeFrom = (fromValue: string) => {
    setValue({ ...value, from: fromValue });
  };

  const handleChangeTo = (toValue: string) => {
    setValue({ ...value, to: toValue });
  };

  const handleChangeDate = (dateValue: Dayjs | string | null) => {
    let parsedFromDate: Dayjs | null | undefined = null;
    let parsedToDate: Dayjs | null | undefined = null;
    if (typeof dateValue === 'string') {
      const dateArray = dateValue.split('-');
      const tempFromDate = dayjs(dateArray[0], dateFormat);
      const tempToDate = dayjs(dateArray[1], dateFormat);
      let formattedFromDate: string | undefined;
      let formattedToDate: string | undefined;
      let valid = true;

      if (tempFromDate.isValid()) {
        formattedFromDate = tempFromDate.format(dateFormat);
      }
      if (tempToDate.isValid()) {
        formattedToDate = tempToDate.format(dateFormat);
      }

      if (!tempFromDate.isValid() || !tempToDate.isValid()) {
        valid = false;
      }

      if (tempFromDate.isValid() && !dateArray[1]) {
        valid = true;
      }

      if (tempFromDate.isValid() && tempToDate.isValid()) {
        let tempFromDateCopy: Dayjs | null = tempFromDate;
        let tempToDateCopy: Dayjs | null = tempToDate;
        if (tempFromDate.isAfter(tempToDate)) {
          tempFromDateCopy = tempToDate;
          tempToDateCopy = tempFromDate;
        }
        if (tempFromDateCopy.isBefore(dayjs())) {
          tempFromDateCopy = dayjs();
        }
        if (tempToDateCopy.isBefore(dayjs())) {
          tempToDateCopy = null;
        }

        formattedFromDate = tempFromDateCopy.format(dateFormat);
        formattedToDate = tempToDateCopy?.format(dateFormat);

        setRoundTrip(true);
        setValidDate(valid);
        setTextValue(`${formattedFromDate}${formattedToDate ? `-${formattedToDate}` : ''}`);
        setValue({ ...value, fromDate: tempFromDateCopy, toDate: tempToDateCopy });
        return;
      }

      if (roundTrip && tempFromDate.isValid() && !textValue?.startsWith(`${formattedFromDate}-`)) {
        setTextValue(`${formattedFromDate || ''}-${formattedToDate || ''}`);
      } else {
        setTextValue(dateValue);
      }

      setValidDate(valid);

      return;
    }
    if (dayjs.isDayjs(dateValue)) {
      setValidDate(true);
      if (roundTrip) {
        if (value?.fromDate && (value?.toDate || dateValue.isSameOrBefore(value.fromDate))) {
          parsedFromDate = dateValue;
          parsedToDate = null;
        } else if (!value?.fromDate) {
          parsedFromDate = dateValue;
          parsedToDate = null;
        } else {
          parsedFromDate = value?.fromDate;
          parsedToDate = dateValue;
        }
        setValue({ ...value, fromDate: parsedFromDate, toDate: parsedToDate });
        setTextValue(
          parsedFromDate
            ? `${parsedFromDate.format(dateFormat)}${
                parsedToDate ? `-${parsedToDate.format(dateFormat)}` : ''
              }`
            : '',
        );
        return;
      }
      parsedFromDate = dateValue;
    }

    setValue({ ...value, fromDate: parsedFromDate });
    const formattedFromDate = parsedFromDate ? parsedFromDate.format(dateFormat) : '';
    setTextValue(formattedFromDate);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setActive(false);
      handleSearch();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setActive(false);
    }
  };

  const handleBlur = () => {
    setActive(false);
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { id } = event.currentTarget;
    if (Object.values(inputIds).includes(id)) {
      setFocusedInputId(id);
      setActive(true);
    }
  };

  useEffect(() => {
    if (variant === 'header' && !showHeaderSearchField) {
      setShown(false);
    } else if (variant === 'header' && showHeaderSearchField) {
      setShown(true);
    } else if (variant !== 'header' && showHeaderSearchField) {
      setShown(false);
    } else if (variant !== 'header' && !showHeaderSearchField) {
      setShown(true);
    }
  }, [showHeaderSearchField, variant]);

  const zIndexOffset = variant === 'header' ? 3 : 2;

  const { from, to, fromDate, toDate } = value || {};

  return (
    <Box
      ref={variant !== 'header' ? obstructedRef : undefined}
      // visibility={variant !== 'header' && showHeaderSearchField ? 'hidden' : 'visible'}
      // position="relative"
      overflow="hidden"
      maxWidth="800px"
      flexGrow={1}
      flexShrink={1}
      mx="auto"
      role="search"
      sx={{
        zIndex: (theme) => (active && shown ? theme.zIndex.appBar + zIndexOffset : undefined),
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid grey',
        transition: 'opacity 0.2s ease-in-out',
        ...(!shown
          ? {
              opacity: 0,
            }
          : {
              opacity: 1,
            }),
      }}
    >
      <TextField
        placeholder="Hvor fra?"
        id={inputIds.from}
        value={from || ''}
        onChange={(e) => handleChangeFrom(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        type="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FlightTakeoffIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          '& fieldset': { border: 'none' },
        }}
      />
      <Divider orientation="vertical" flexItem />
      <TextField
        placeholder="Hvor til?"
        id={inputIds.to}
        value={to || ''}
        onChange={(e) => handleChangeTo(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        type="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FlightLandIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          '& fieldset': { border: 'none' },
        }}
      />
      <Divider orientation="vertical" flexItem />
      <TextField
        placeholder="Når?"
        id={inputIds.date}
        error={!!textValue?.length && !validDate}
        color={!!textValue?.length && !validDate ? 'error' : undefined}
        value={textValue || ''}
        ref={datePickerRef}
        onChange={(e) => handleChangeDate(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={handleInputFocus}
        type="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarMonthIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          '& fieldset': { border: 'none' },
        }}
      />
      <Divider orientation="vertical" flexItem />
      {/* TODO: Add internationalized aria-labels */}
      <IconButton disableRipple onClick={handleSearch} aria-label="search" sx={{ padding: 1 }}>
        <SearchIcon />
      </IconButton>
      <Popper
        open={active && shown && focusedInputId === inputIds.date}
        anchorEl={datePickerRef.current}
        placement="bottom"
        sx={{ zIndex: (theme) => theme.zIndex.appBar + zIndexOffset + 1 }}
      >
        <Paper>
          <Stack>
            {/* Switch to change between rund trip and not */}
            <Box padding={2}>
              <FormControlLabel
                control={<Switch checked={roundTrip} onChange={() => setRoundTrip(!roundTrip)} />}
                label={capitalizeFirstLetter(t('roundTrip'))}
              />
            </Box>
            <Stack direction="row">
              <DateCalendar
                onChange={(d) => handleChangeDate(d)}
                minDate={dayjs()}
                value={null}
                disableHighlightToday
                slots={{ day: Day }}
                slotProps={{
                  day: (ownerState) => ({
                    selectedFromDate: fromDate,
                    selectedToDate: toDate,
                    roundTrip,
                    hoveredDate,
                    onPointerEnter: () => setHoveredDate(ownerState.day),
                    onPointerLeave: () => setHoveredDate(null),
                  }),
                }}
              />
              {/* <DateCalendar
                onChange={(d) => handleChangeDate(d)}
                minDate={dayjs()}
                value={fromDate || dayjs()}
                disableHighlightToday
                slots={{ day: Day }}
                slotProps={{
                  day: (ownerState) => ({
                    selectedFromDate: fromDate,
                    selectedToDate: toDate,
                    roundTrip,
                    hoveredDate,
                    onPointerEnter: () => setHoveredDate(ownerState.day),
                    onPointerLeave: () => setHoveredDate(null),
                    onFocus: () => setHoveredDate(ownerState.day),
                    onBlur: () => setHoveredDate(null),
                  }),
                }}
              /> */}
            </Stack>
          </Stack>
        </Paper>
      </Popper>

      {/* <DatePicker
          onChange={(d) => handleChangeFromDate(d)}
          value={value?.fromDate || null}
          tabIndex={shown ? undefined : -2}
          slotProps={{ textField: { id: 'search-field-input-fromDate' } }}
          disablePast
          sx={{
            '& fieldset': { border: 'none' },
          }}
        /> */}
    </Box>
  );
}

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
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, isBetween, isStart, isEnd }) => {
  // if (day.date() >= 23) {
  //   console.log(day.date(), isSelected, isHovered, isStart, isBetween, isEnd);
  // }
  return {
    width: 40,
    height: 40,
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
  roundTrip?: boolean;
};

function Day(props: DayProps) {
  const { day, selectedFromDate, selectedToDate, hoveredDate, roundTrip, ...other } = props;

  return (
    <CustomPickersDay
      sx={{ px: 2.5 }}
      {...other}
      day={day}
      disableMargin
      selected={false}
      isSelected={
        day.isSame(selectedFromDate, 'day') ||
        (roundTrip &&
          selectedToDate &&
          day.isBetween(selectedFromDate, selectedToDate, 'day', '[]')) ||
        false
      }
      isStart={
        (roundTrip &&
          (day.isSame(selectedFromDate, 'day') ||
            (selectedToDate &&
              !hoveredDate?.isSame(selectedToDate, 'day') &&
              hoveredDate?.isAfter(selectedFromDate, 'day') &&
              day.isSame(hoveredDate, 'day')) ||
            (hoveredDate?.isSameOrBefore(selectedFromDate, 'day') &&
              day.isSame(hoveredDate, 'day')))) ||
        false
      }
      isEnd={
        (roundTrip &&
          (day.isSame(selectedToDate, 'day') ||
            (!selectedToDate &&
              // hoveredDate?.isSameOrAfter(selectedFromDate, 'day') &&
              day.isSame(hoveredDate, 'day')) ||
            (!hoveredDate?.isSame(selectedFromDate, 'day') &&
              selectedToDate &&
              day.isSame(hoveredDate, 'day')))) ||
        false
      }
      isHovered={
        day.isSame(hoveredDate, 'day') ||
        (roundTrip &&
          !selectedToDate &&
          hoveredDate?.isAfter(selectedFromDate, 'day') &&
          day.isBetween(selectedFromDate, hoveredDate, 'day', '[]')) ||
        false
      }
      isBetween={
        roundTrip && selectedFromDate
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
