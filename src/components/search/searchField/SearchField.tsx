'use client';

import useSearchFieldContext from '@hooks/context/useSearchFieldContext';
import { useRouter } from '@internationalization/navigation';
import { alpha } from '@mui/material/styles';
import {
  Backdrop,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  TextField,
  Theme,
  useMediaQuery,
} from '@mui/material';
import {
  FocusEventHandler,
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import dayjs, { Dayjs } from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTranslations } from 'next-intl';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import dayjsIsBetween from 'dayjs/plugin/isBetween';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import SearchIcon from '@mui/icons-material/Search';
import { SearchFieldValue } from '@contexts/SearchFieldContext';
import useDebounce from '@hooks/useDebounce';
import DateRangePicker from '../DateRangePicker';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(dayjsIsBetween);

export type SearchFieldProps = {
  obstructedRef?: RefObject<HTMLDivElement>;
  variant: 'header' | 'landing';
};

const dateFormat = 'DD/MM/YYYY';

export default function SearchField(props: SearchFieldProps) {
  const { obstructedRef, variant } = props;

  // To add more translations, you have to add them to the
  // pick(messages) in the wrapper server components
  const t = useTranslations('common.trip');
  const compact = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  const inputs: {
    [key: string]: {
      id: string;
      label: string;
      placeholder?: string;
    };
  } = {
    from: { id: 'search-field-input-from', label: 'Hvor fra?', placeholder: 'Legg til sted' },
    to: { id: 'search-field-input-to', label: 'Hvor til?', placeholder: 'Legg til sted' },
    date: { id: 'search-field-input-date', label: 'Når?', placeholder: 'DD/MM/YYYY' },
    search: { id: 'search-field-button-search', label: 'Søk' },
    generic: { id: 'search-field-input-generic', label: 'Søk etter flyreiser' },
  };
  const inputIds: {
    [key: string]: (typeof inputs)[keyof typeof inputs]['id'];
  } = {
    from: inputs.from.id,
    to: inputs.to.id,
    date: inputs.date.id,
    search: inputs.search.id,
    generic: inputs.generic.id,
  };

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
    dateTextValue,
    setDateTextValue,
    reset,
  } = useSearchFieldContext();
  const [shown, setShown] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Dayjs | null>(null);
  const dateFieldRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // const debouncedShowBackdrop = useDebounce(active && shown, active && !shown ? 0 : 0);
  // const activeDebounced = useDebounce(active, active ? 0 : 50);
  const activeDebounced = useDebounce(active, 50);

  const datePopperOpen = active && shown && focusedInputId === inputIds.date;

  const handleValidateAndApplyDateText = (): SearchFieldValue | null => {
    let fromDate: Dayjs | null = null;
    let toDate: Dayjs | null = null;
    const now = dayjs();
    let returnValue: SearchFieldValue | null = null;

    if (!dateTextValue?.length) {
      returnValue = { ...value, fromDate: null, toDate: null };
      setValue(returnValue);
      return returnValue;
    }
    const formattedDate = dayjs(dateTextValue, dateFormat);
    if (dateTextValue?.split('-').length <= 1 && formattedDate.isValid()) {
      fromDate = formattedDate;
      if (fromDate.isBefore(now, 'day')) {
        fromDate = now;
      }
      returnValue = { ...value, fromDate, toDate: null };
      setValue(returnValue);
      setDateTextValue(fromDate.format(dateFormat));
      setValidDate(true);
    } else {
      const textArray = dateTextValue?.split('-');
      const formattedFromDate =
        textArray && textArray?.length >= 1 ? dayjs(textArray[0], dateFormat) : null;
      const formattedToDate =
        textArray && textArray?.length >= 2 ? dayjs(textArray[1], dateFormat) : null;
      if (formattedFromDate?.isValid()) {
        fromDate = formattedFromDate;
        if (fromDate?.isBefore(now, 'day')) {
          fromDate = now;
        }
      }
      if (formattedToDate?.isValid()) {
        toDate = formattedToDate;
        if (toDate.isBefore(now, 'day')) {
          toDate = now;
        }
      }
      if (toDate && fromDate?.isAfter(toDate, 'day')) {
        const temp = toDate;
        toDate = fromDate;
        fromDate = temp;
      }
      if (!fromDate && toDate) {
        fromDate = toDate;
        toDate = null;
      }
      if (fromDate && toDate) {
        setRoundTrip(true);
      } else if (fromDate) {
        setRoundTrip(false);
      }

      returnValue = { ...value, fromDate, toDate };
      setValue(returnValue);
      setDateTextValue(
        `${fromDate ? fromDate.format(dateFormat) : ''}${
          toDate ? `-${toDate.format(dateFormat)}` : ''
        }`,
      );
    }
    return returnValue;
  };

  const handleSearch = () => {
    const validatedValue = handleValidateAndApplyDateText();
    router.push({
      pathname: '/search',
      query: {
        ...(validatedValue?.from && { f: validatedValue?.from }),
        ...(validatedValue?.to && { t: validatedValue?.to }),
        ...(validatedValue?.fromDate && { fd: validatedValue?.fromDate.format(dateFormat) }),
        ...(validatedValue?.toDate && { td: validatedValue?.toDate.format(dateFormat) }),
      },
    });
    reset({ active: false });
  };

  const handleChangeFrom = (fromValue: string) => {
    setValue({ ...value, from: fromValue });
  };

  const handleChangeTo = (toValue: string) => {
    setValue({ ...value, to: toValue });
  };

  const handleChangeDate = (dateValue: Dayjs | null) => {
    let parsedFromDate: Dayjs | null = null;
    let parsedToDate: Dayjs | null = null;
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
        setDateTextValue(
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
    setDateTextValue(formattedFromDate);
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

  const handleChangeDateText = (dateText: string) => {
    // TODO: Add validation for date format on each run
    setDateTextValue(dateText);
  };

  const handleDateFieldBlur = () => {
    handleValidateAndApplyDateText();
  };

  const handleFocusOrClick = (id: string, focusElement?: boolean) => {
    if (Object.values(inputIds).includes(id)) {
      setFocusedInputId(id);
      setActive(true);
    }

    if (focusElement) {
      const element = document.querySelector<HTMLElement>(`#${id}:not([hidden])`);
      if (element) {
        element.focus();
      }
    }
    if (id !== inputIds.date) {
      return;
    }

    if (!value?.fromDate) {
      if (roundTrip) {
        // setDateTextValue('DD/MM/YYYY-DD/MM/YYYY');
      } else {
        // setDateTextValue('DD/MM/YYYY');
      }
    } else if (value?.fromDate) {
      const formattedFromDate = value.fromDate.format(dateFormat);
      if (value?.toDate) {
        setDateTextValue(`${formattedFromDate}-${value?.toDate.format(dateFormat)}`);
      } else {
        setDateTextValue(formattedFromDate);
      }
    }
  };

  const handleInputClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const { id } = event.currentTarget;
    handleFocusOrClick(id);
  };

  const handleInputFocus: FocusEventHandler<
    HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { id } = event.currentTarget;
    handleFocusOrClick(id);
  };

  useEffect(() => {
    if (variant === 'header' && !showHeaderSearchField) {
      setShown(false);
    } else if (variant === 'header' && showHeaderSearchField) {
      setShown(true);
    } else if (variant !== 'header' && !showHeaderSearchField) {
      setShown(true);
    } else if (variant !== 'header' && showHeaderSearchField) {
      setShown(false);
    }
  }, [showHeaderSearchField, variant]);

  const zIndexOffset = variant === 'header' ? 2 : 1;

  const { from, to /* , fromDate , toDate */ } = value || {};

  return (
    <>
      <Backdrop
        open={(active || activeDebounced) && shown}
        onClick={() => setActive(false)}
        sx={{
          zIndex: (theme) => theme.zIndex.appBar + 1,
          ...(activeDebounced && { transition: 'opacity 0s !important' }),
        }}
      />
      <Paper
        elevation={variant === 'landing' ? 2 : undefined}
        ref={variant !== 'header' ? obstructedRef : undefined}
        sx={{
          zIndex:
            active && shown
              ? (theme) => {
                  return theme.zIndex.appBar + zIndexOffset;
                }
              : undefined,
          position: 'relative',
          left: shown ? undefined : '-10000px',
          display: 'flex',
          borderRadius: 5,
          mx: 'auto',
        }}
      >
        <Box
          role={shown ? 'search' : undefined}
          sx={{
            zIndex: active && shown ? (theme) => theme.zIndex.appBar + zIndexOffset : undefined,
            flexGrow: 1,
            flexShrink: 1,
            mx: 'auto',
            maxWidth: '800px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            borderRadius: 5,
            flexDirection: variant === 'header' && compact ? 'row' : { xs: 'column', md: 'row' },
            justifyContent: 'center',
            border: '1px solid',
            borderColor: (theme) => (active && shown ? 'primary.main' : theme.palette.divider),
            // Fixes a bug where the background color is darker in the header
            backgroundColor: (theme) => alpha(theme.palette.background.default, 1),
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
          {variant === 'header' && compact ? (
            <Box
              alignItems="end"
              display="flex"
              onClick={() => handleFocusOrClick(inputIds.generic, true)}
              sx={{
                position: 'relative',
                zIndex: (theme) =>
                  active && shown ? theme.zIndex.appBar + zIndexOffset + 1 : undefined,
                cursor: 'text',
              }}
            >
              <TextField
                onClick={() => handleFocusOrClick(inputIds.generic, true)}
                placeholder={inputs.generic.label}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onFocus={handleInputFocus}
                onBlur={handleBlur}
                sx={{
                  zIndex: (theme) =>
                    active && shown ? theme.zIndex.appBar + zIndexOffset + 1 : undefined,
                  '& fieldset': { border: 'none' },
                }}
              />
            </Box>
          ) : (
            <>
              <Box
                alignItems="end"
                display="flex"
                onClick={() => handleFocusOrClick(inputIds.from, true)}
                sx={{
                  position: 'relative',
                  zIndex: (theme) =>
                    active && shown ? theme.zIndex.appBar + zIndexOffset + 1 : undefined,
                  cursor: 'text',
                  ...(variant !== 'header' && {
                    minHeight: '5rem',
                  }),
                }}
              >
                <TextField
                  placeholder={variant === 'header' ? inputs.from.label : inputs.from.placeholder}
                  label={variant === 'header' ? undefined : inputs.from.label}
                  aria-label={inputs.from.label}
                  id={inputs.from.id}
                  // aria-controls={inputs.from.id}
                  aria-hidden={!shown}
                  tabIndex={shown ? undefined : -1}
                  hidden={!shown}
                  variant="outlined"
                  value={from || ''}
                  onChange={(e) => handleChangeFrom(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  onFocus={handleInputFocus}
                  onBlur={handleBlur}
                  type="search"
                  inputProps={{
                    tabIndex: shown ? undefined : -1,
                    hidden: !shown,
                  }}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  InputProps={{
                    sx: {
                      zIndex: (theme) =>
                        active && shown ? theme.zIndex.appBar + zIndexOffset + 1 : undefined,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoffIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    zIndex: (theme) =>
                      active && shown ? theme.zIndex.appBar + zIndexOffset + 1 : undefined,
                    '& fieldset': { border: 'none' },
                  }}
                />
              </Box>
              <Divider
                flexItem
                sx={{
                  borderBottomWidth: { xs: 'thin', md: 0 },
                  borderRightWidth: { xs: 0, md: 'thin' },
                }}
              />
              <Box
                alignItems="end"
                display="flex"
                onClick={() => handleFocusOrClick(inputIds.to, true)}
                sx={{
                  cursor: 'text',
                  ...(variant !== 'header' && {
                    minHeight: '5rem',
                  }),
                }}
              >
                <TextField
                  placeholder={variant === 'header' ? inputs.to.label : inputs.to.placeholder}
                  label={variant === 'header' ? undefined : inputs.to.label}
                  aria-label={inputs.to.label}
                  id={inputs.to.id}
                  // aria-controls={inputs.to.id}
                  aria-hidden={!shown}
                  tabIndex={shown ? undefined : -1}
                  hidden={!shown}
                  value={to || ''}
                  onChange={(e) => handleChangeTo(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  onFocus={handleInputFocus}
                  onClick={handleInputClick}
                  onBlur={handleBlur}
                  type="search"
                  inputProps={{
                    tabIndex: shown ? undefined : -1,
                    hidden: !shown,
                  }}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
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
              </Box>
              <Divider
                flexItem
                sx={{
                  borderBottomWidth: { xs: 'thin', md: 0 },
                  borderRightWidth: { xs: 0, md: 'thin' },
                }}
              />
              <Box
                alignItems="end"
                display="flex"
                onClick={() => handleFocusOrClick(inputIds.date, true)}
                ref={dateFieldRef}
                sx={{
                  cursor: 'text',
                  ...(variant !== 'header' && {
                    minHeight: '5rem',
                  }),
                }}
              >
                <TextField
                  placeholder={variant === 'header' ? inputs.date.label : inputs.date.placeholder}
                  label={variant === 'header' ? undefined : inputs.date.label}
                  aria-label={inputs.date.label}
                  id={inputs.date.id}
                  // aria-controls={inputIds.date}
                  aria-hidden={!shown}
                  tabIndex={shown ? undefined : -1}
                  hidden={!shown}
                  error={!!dateTextValue?.length && !validDate}
                  // color={!!dateTextValue?.length && !validDate ? 'error' : undefined}
                  value={dateTextValue || ''}
                  onChange={(e) => handleChangeDateText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  onFocus={handleInputFocus}
                  onBlur={handleDateFieldBlur}
                  inputProps={{
                    tabIndex: shown ? undefined : -1,
                    hidden: !shown,
                    pattern:
                      '([0-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/d{4}(-([0-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/d{4})?',
                  }}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  InputProps={{
                    color: !!dateTextValue?.length && !validDate ? 'error' : undefined,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    minWidth: '300px',
                    '& fieldset': { border: 'none' },
                  }}
                />
              </Box>
              <Popper
                open={datePopperOpen}
                anchorEl={dateFieldRef.current}
                onKeyUp={handleKeyUp}
                placement="bottom"
                sx={{ zIndex: (theme) => theme.zIndex.appBar + zIndexOffset + 1 }}
              >
                <Paper onKeyUp={handleKeyUp}>
                  <DateRangePicker
                    rootProps={{
                      onKeyUp: handleKeyUp,
                    }}
                    onChange={(d) => handleChangeDate(d)}
                    disablePast
                    value={null}
                    disableHighlightToday
                    setHoveredDate={setHoveredDate}
                    hoveredDate={hoveredDate}
                    selectedFromDate={value?.fromDate}
                    selectedToDate={value?.toDate}
                    setRange={setRoundTrip}
                    range={roundTrip}
                    setRangeLabel={capitalizeFirstLetter(t('roundTrip'))}
                  />
                </Paper>
              </Popper>
            </>
          )}
          <Divider
            flexItem
            sx={{
              borderBottomWidth: { xs: 'thin', md: 0 },
              borderRightWidth: { xs: 0, md: 'thin' },
            }}
          />
          {/* TODO: Add internationalized aria-labels */}
          <Box
            alignItems="end"
            display="flex"
            onClick={handleSearch}
            sx={{
              cursor: 'text',
              ...(variant !== 'header' && {
                minHeight: { xs: undefined, md: '5rem' },
              }),
              backgroundColor: 'primary.main',
            }}
          >
            <IconButton
              id={inputIds.search}
              aria-label="search"
              aria-hidden={!shown}
              tabIndex={shown ? undefined : -1}
              hidden={!shown}
              disableRipple
              onFocus={handleInputFocus}
              onClick={handleSearch}
              onBlur={handleBlur}
              sx={{
                height: '100%',
                width: '100%',
              }}
            >
              <SearchIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
