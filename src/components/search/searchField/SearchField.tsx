'use client';

import useSearchFieldContext from '@hooks/context/useSearchFieldContext';
import { useRouter } from '@internationalization/navigation';
import { alpha } from '@mui/material/styles';
import {
  Autocomplete,
  Backdrop,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  TextField,
  Theme,
  darken,
  lighten,
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
import { SearchQuery } from '@models/Search';
import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';
import { ParsedUrlQueryInput } from 'querystring';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import styled from '@mui/system/styled';
import DateRangePicker from '../DateRangePicker';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(dayjsIsBetween);

export type SearchFieldProps = {
  obstructedRef?: RefObject<HTMLDivElement>;
  variant: 'header' | 'landing';
  locationAutocompleteOptions: readonly LocationOrAirportOption[];
};

const dateFormat = 'DD/MM/YYYY';

export default function SearchField(props: SearchFieldProps) {
  const { obstructedRef, variant, locationAutocompleteOptions } = props;

  // To add more translations, you have to add them to the
  // pick(messages) in the wrapper server components
  const t = useTranslations('common.trip');
  const compact = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  const inputs: {
    [key: string]: {
      id: string;
      label: string;
      placeholder?: string;
      ownerId?: string;
    };
  } = {
    from: {
      id: 'search-field-input-from',
      label: 'Fra?',
      placeholder: 'Legg til sted',
      ownerId: 'autocomplete-from',
    },
    to: {
      id: 'search-field-input-to',
      label: 'Til?',
      placeholder: 'Legg til sted',
      ownerId: 'autocomplete-to',
    },
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
    roundTrip,
    setRoundTrip,
    validFrom,
    setValidFrom,
    validTo,
    setValidTo,
    validDate,
    setValidDate,
    reset,
  } = useSearchFieldContext();
  const [shown, setShown] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Dayjs | null>(null);
  const [fromTextValue, setFromTextValue] = useState<string | null>(null);
  const [toTextValue, setToTextValue] = useState<string | null>(null);
  const [dateTextValue, setDateTextValue] = useState<string | null>(null);

  const dateFieldRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // const debouncedShowBackdrop = useDebounce(active && shown, active && !shown ? 0 : 0);
  // const activeDebounced = useDebounce(active, active ? 0 : 50);
  const activeDebounced = useDebounce(active, 50);

  const datePopperOpen = active && shown && focusedInputId === inputIds.date;

  const handleValidateAndApplyDateText = (): {
    fromDate: SearchFieldValue['fromDate'];
    toDate: SearchFieldValue['toDate'];
  } | null => {
    let fromDate: Dayjs | null = null;
    let toDate: Dayjs | null = null;
    const now = dayjs();
    let returnValue: {
      fromDate: SearchFieldValue['fromDate'];
      toDate: SearchFieldValue['toDate'];
    } | null = null;

    if (!dateTextValue?.length) {
      returnValue = { fromDate: null, toDate: null };
      setValue({ ...value, ...returnValue });
      return returnValue;
    }
    const formattedDate = dayjs(dateTextValue, dateFormat);
    if (dateTextValue?.split('-').length <= 1 && formattedDate.isValid()) {
      fromDate = formattedDate;
      if (fromDate.isBefore(now, 'day')) {
        fromDate = now;
      }
      returnValue = { fromDate, toDate: null };
      setValue({ ...value, ...returnValue });
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

      returnValue = { fromDate, toDate };
      setValue({ ...value, ...returnValue });
      setDateTextValue(
        `${fromDate ? fromDate.format(dateFormat) : ''}${
          toDate ? `-${toDate.format(dateFormat)}` : ''
        }`,
      );
    }
    return returnValue;
  };

  const handleValidateAndApplyFrom = (): SearchFieldValue['from'] | null => {
    const { name } = value?.from || {};
    if (name === fromTextValue) {
      return value?.from;
    }
    const option = locationAutocompleteOptions.find((opt) => opt.name === fromTextValue);
    if (option) {
      setValue({ ...value, from: option });
      return option;
    }
    setValue({ ...value, from: null });
    return null;
  };

  const handleValidateAndApplyTo = (): SearchFieldValue['to'] | null => {
    const { name } = value?.to || {};
    if (name && name === toTextValue) {
      return value?.to;
    }
    const option = locationAutocompleteOptions.find((opt) => opt.name === toTextValue);
    if (option) {
      setValue({ ...value, to: option });
      return option;
    }
    setValue({ ...value, to: null });
    return null;
  };

  const handleValidateAndApplyValue = (): SearchFieldValue | null => {
    const validatedDate = handleValidateAndApplyDateText();
    const validatedFrom = handleValidateAndApplyFrom();
    const validatedTo = handleValidateAndApplyTo();

    if (!validatedFrom) {
      setValidFrom(false);
    }
    if (!validatedTo) {
      setValidTo(false);
    }
    if (!validatedDate || (!validatedDate.fromDate && !validatedDate.toDate)) {
      setValidDate(false);
    }
    if (!validatedFrom || !validatedTo || !validatedDate) {
      return null;
    }

    return {
      ...(validatedFrom && { from: validatedFrom }),
      ...(validatedTo && { to: validatedTo }),
      ...(validatedDate?.fromDate && { fromDate: validatedDate?.fromDate }),
      ...(validatedDate?.toDate && { toDate: validatedDate?.toDate }),
    };
  };

  const handleSearch = () => {
    const validatedValue = handleValidateAndApplyValue();
    if (!validatedValue || !validatedValue.from || !validatedValue.to || !validatedValue.fromDate) {
      return;
    }
    const query: { [key in keyof SearchQuery]: ParsedUrlQueryInput[keyof ParsedUrlQueryInput] } = {
      ...(validatedValue?.from && {
        ...(validatedValue?.from.type === 'airport' && { fa: validatedValue.from.id }),
        ...(validatedValue?.from.type === 'location' && { fl: validatedValue.from.id }),
      }),
      ...(validatedValue?.to && {
        ...(validatedValue?.to.type === 'airport' && { ta: validatedValue?.to.id }),
        ...(validatedValue?.to.type === 'location' && { tl: validatedValue?.to.id }),
      }),
      ...(validatedValue?.fromDate && { fd: validatedValue?.fromDate.unix() }),
      ...(validatedValue?.toDate && { td: validatedValue?.toDate.unix() }),
    };
    router.push({
      pathname: '/search',
      query,
    });
    reset({ active: false });
  };

  const handleChangeFrom = (fromValue: LocationOrAirportOption | null) => {
    const { name } = fromValue || {};
    setValue({ ...value, from: fromValue });
    setFromTextValue(name || null);
  };

  const handleChangeTo = (toValue: LocationOrAirportOption | null) => {
    const { name } = toValue || {};
    setValue({ ...value, to: toValue });
    setToTextValue(name || null);
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
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

  const handleChangeFromText = (fromText: string) => {
    if (fromText === '') {
      setValidFrom(true);
    }
    setFromTextValue(fromText);
  };

  const handleChangeToText = (toText: string) => {
    if (toText === '') {
      setValidTo(true);
    }
    setToTextValue(toText);
  };

  const handleChangeDateText = (dateText: string) => {
    // TODO: Add validation for date format on each run
    if (dateText === '') {
      setValidDate(true);
    }
    setDateTextValue(dateText);
  };

  const handleDateFieldBlur = () => {
    setValidDate(true);
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
    let focusId: string | undefined;
    Object.values(inputs).forEach((input) => {
      if (!focusId && input.ownerId === id) {
        focusId = input.id;
      }
    });

    if (!focusId) {
      focusId = id;
    }

    handleFocusOrClick(id);
  };

  const handleInputFocus: FocusEventHandler<
    HTMLButtonElement | HTMLDivElement | HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { id } = event.currentTarget;
    let focusId: string | undefined;
    Object.values(inputs).forEach((input) => {
      if (!focusId && input.ownerId === id) {
        focusId = input.id;
      }
    });

    if (!focusId) {
      focusId = id;
    }

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

  const { from, to } = value || {};

  const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === 'light'
        ? lighten(theme.palette.primary.light, 0.85)
        : darken(theme.palette.primary.main, 0.8),
  }));

  const GroupItems = styled('ul')({
    padding: 0,
  });

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
                <Autocomplete
                  fullWidth
                  options={locationAutocompleteOptions}
                  id={inputs.from.id}
                  renderOption={(renderProps, option) => {
                    const { name, type } = option;
                    const location = type === 'location';
                    return (
                      <Box
                        component="li"
                        sx={{ '& > svg': { mr: 2, flexShrink: 0 } }}
                        {...renderProps}
                        key={name}
                      >
                        {location ? <LocationCityIcon /> : <LocalAirportIcon />}
                        {name}
                      </Box>
                    );
                  }}
                  aria-label={inputs.from.label}
                  // aria-controls={inputs.from.id}
                  aria-hidden={!shown}
                  tabIndex={shown ? undefined : -1}
                  hidden={!shown}
                  value={from || null}
                  getOptionLabel={(option) => option.name}
                  getOptionKey={(option) => `${option.type}:${option.id}`}
                  inputValue={fromTextValue || ''}
                  onInputChange={(e, v) => handleChangeFromText(v)}
                  onChange={(e, v) => handleChangeFrom(v)}
                  // onFocus={handleInputFocus}
                  // onClick={handleInputClick}
                  // onBlur={handleBlur}
                  renderInput={(params) => {
                    return (
                      <TextField
                        type="search"
                        label={variant === 'header' ? undefined : inputs.from.label}
                        placeholder={
                          variant === 'header' ? inputs.from.label : inputs.from.placeholder
                        }
                        error={!validFrom}
                        sx={{
                          minWidth: '200px',
                          '& fieldset': { border: 'none' },
                        }}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <FlightTakeoffIcon color={!validFrom ? 'error' : undefined} />
                            </InputAdornment>
                          ),
                        }}
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        inputProps={{
                          ...params.inputProps,
                          tabIndex: shown ? params.inputProps.tabIndex : -1,
                          hidden: !shown,
                        }}
                      />
                    );
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
                // onClick={() => handleFocusOrClick(inputIds.to, true)}
                sx={{
                  cursor: 'text',
                  ...(variant !== 'header' && {
                    minHeight: '5rem',
                  }),
                }}
              >
                <Autocomplete
                  fullWidth
                  options={locationAutocompleteOptions}
                  id={inputs.to.id}
                  renderOption={(renderProps, option) => {
                    const { name, type } = option;
                    const location = type === 'location';
                    return (
                      <Box
                        component="li"
                        sx={{ '& > svg': { mr: 2, flexShrink: 0 } }}
                        {...renderProps}
                        key={name}
                      >
                        {location ? <LocationCityIcon /> : <LocalAirportIcon />}
                        {name}
                      </Box>
                    );
                  }}
                  // TODO: Internationalize group header
                  groupBy={(option) => option.type}
                  renderGroup={(params) => (
                    <li key={params.key}>
                      <GroupHeader>{params.group}</GroupHeader>
                      <GroupItems>{params.children}</GroupItems>
                    </li>
                  )}
                  renderTags={() => null}
                  clearIcon={null}
                  aria-label={inputs.to.label}
                  // aria-controls={inputs.to.id}
                  aria-hidden={!shown}
                  tabIndex={shown ? undefined : -1}
                  hidden={!shown}
                  value={to || null}
                  getOptionLabel={(option) => option.name}
                  getOptionKey={(option) => `${option.type}:${option.id}`}
                  inputValue={toTextValue || ''}
                  onInputChange={(e, v) => handleChangeToText(v)}
                  onChange={(e, v) => handleChangeTo(v)}
                  onFocus={handleInputFocus}
                  onClick={handleInputClick}
                  onBlur={handleBlur}
                  slotProps={{
                    popper: {
                      style: {
                        width: '300px',
                      },
                      sx: {
                        zIndex: (theme) => theme.zIndex.appBar + zIndexOffset + 1,
                      },
                    },
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        type="search"
                        label={variant === 'header' ? undefined : inputs.to.label}
                        placeholder={variant === 'header' ? inputs.to.label : inputs.to.placeholder}
                        error={!validTo}
                        sx={{
                          minWidth: '200px',
                          '& fieldset': { border: 'none' },
                        }}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <FlightLandIcon color={!validTo ? 'error' : undefined} />
                            </InputAdornment>
                          ),
                        }}
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        inputProps={{
                          ...params.inputProps,
                          tabIndex: shown ? params.inputProps.tabIndex : -1,
                          hidden: !shown,
                        }}
                      />
                    );
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
                  error={!validDate}
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
                    color: !validDate ? 'error' : undefined,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon color={!validDate ? 'error' : undefined} />
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
