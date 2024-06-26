'use client';

import useSearchFieldContext from '@hooks/context/useSearchFieldContext';
import { useRouter } from '@internationalization/navigation';
// import { alpha } from '@mui/material/styles';
import {
  Backdrop,
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
  RefObject,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  FocusEvent,
  KeyboardEvent,
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
import { useSearchParams } from 'next/navigation';
import DateRangePicker from '../DateRangePicker';
import LocationField from './LocationField';
import RootElement from './RootElement';
import { InputMap } from './inputs';
import InputWrapper from './InputWrapper';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(dayjsIsBetween);

export type SearchFieldProps = {
  obstructedRef?: RefObject<HTMLDivElement>;
  variant: 'dialog' | 'header' | 'landing';
  locationAutocompleteOptions: readonly LocationOrAirportOption[];
  inputs: InputMap;
};

const dateFormat = 'DD/MM/YYYY';

function SuspendedSearchField(props: SearchFieldProps) {
  const { obstructedRef, variant, locationAutocompleteOptions, inputs } = props;

  // To add more translations, you have to add them to the
  // pick(messages) in the wrapper server components
  const t = useTranslations('common.trip');
  const compact = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

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
  const activeDebounced = useDebounce(active, 50);

  const searchParams = useSearchParams();

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

  const applyDateTextValue = useCallback(
    (fromDateValue: Dayjs | null | undefined, toDateValue: Dayjs | null | undefined) => {
      if (!fromDateValue) {
        if (roundTrip) {
          // setDateTextValue('DD/MM/YYYY-DD/MM/YYYY');
        } else {
          // setDateTextValue('DD/MM/YYYY');
        }
      } else {
        const formattedFromDate = fromDateValue.format(dateFormat);
        if (toDateValue) {
          setDateTextValue(`${formattedFromDate}-${toDateValue.format(dateFormat)}`);
        } else {
          setDateTextValue(formattedFromDate);
        }
      }
    },
    [roundTrip],
  );

  const handleFocusOrClick = (
    id: string,
    focusElement?: boolean,
    e?: FocusEvent | KeyboardEvent | MouseEvent,
  ) => {
    if (id === inputIds.generic) {
      if (e) {
        e.preventDefault();
      }
    }

    if (Object.values(inputIds).includes(id)) {
      let closeDatePopper = false;
      if (datePopperOpen && id === inputIds.date) {
        closeDatePopper = true;
      }
      setFocusedInputId(id);
      setActive(true);
      if (closeDatePopper) {
        setFocusedInputId(null);
      }
    }

    if (focusElement) {
      const element = document.querySelector<HTMLElement>(`#${id}:not([hidden])`);
      if (element) {
        element.focus();
      }
    }
    if (id === inputIds.date) {
      setValidDate(true);
      applyDateTextValue(value?.fromDate, value?.toDate);
    }
    if (id === inputIds.from) {
      setValidFrom(true);
    }
    if (id === inputIds.to) {
      setValidTo(true);
    }
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

  useEffect(() => {
    applyDateTextValue(value?.fromDate, value?.toDate);
  }, [applyDateTextValue, value?.fromDate, value?.toDate]);

  useEffect(() => {
    if (!roundTrip && value?.toDate) {
      setValue((prev) => ({ ...prev, toDate: null }));
    }
  }, [roundTrip, setValue, value?.toDate]);

  useEffect(() => {
    const fromDateQuery = searchParams.get('fd');
    const toDateQuery = searchParams.get('td');
    const fromLocationQuery = searchParams.get('fl');
    const toLocationQuery = searchParams.get('tl');
    const fromAirportQuery = searchParams.get('fa');
    const toAirportQuery = searchParams.get('ta');

    let fromDate: Dayjs | null = null;
    let fromDateValid = false;
    let toDate: Dayjs | null = null;
    let toDateValid = false;

    if (fromLocationQuery || fromAirportQuery) {
      const fromOption = locationAutocompleteOptions.find(
        (opt) =>
          (fromLocationQuery &&
            opt.type === 'location' &&
            opt.id === parseInt(fromLocationQuery, 10)) ||
          (fromAirportQuery && opt.type === 'airport' && opt.id === parseInt(fromAirportQuery, 10)),
      );
      if (fromOption) {
        setValue((prev) => ({ ...prev, from: fromOption }));
        setFromTextValue(fromOption.name);
      } else {
        setValue((prev) => ({ ...prev, from: null }));
        setValidFrom(false);
      }
    }

    if (toLocationQuery || toAirportQuery) {
      const toOption = locationAutocompleteOptions.find(
        (opt) =>
          (toLocationQuery &&
            opt.type === 'location' &&
            opt.id === parseInt(toLocationQuery, 10)) ||
          (toAirportQuery && opt.type === 'airport' && opt.id === parseInt(toAirportQuery, 10)),
      );
      if (toOption) {
        setValue((prev) => ({ ...prev, to: toOption }));
        setToTextValue(toOption.name);
      } else {
        setValue((prev) => ({ ...prev, to: null }));
        setValidTo(false);
      }
    }

    if (fromDateQuery) {
      fromDate = dayjs(parseInt(fromDateQuery, 10) * 1000);
      fromDateValid = fromDate ? fromDate.isValid() : false;
    }

    if (toDateQuery) {
      toDate = dayjs(parseInt(toDateQuery, 10) * 1000);
      toDateValid = toDate ? toDate.isValid() : false;
    }

    if (fromDate && fromDateValid) {
      setRoundTrip(false);
      setValue((prev) => ({ ...prev, fromDate }));
      const formattedFromDate = fromDate.format(dateFormat);
      if (toDate && toDateValid) {
        setRoundTrip(true);
        setValue((prev) => ({ ...prev, toDate }));
        setDateTextValue(`${formattedFromDate}-${toDate.format(dateFormat)}`);
      } else {
        setDateTextValue(formattedFromDate);
      }
    } else if (fromDateQuery) {
      setValidDate(false);
    }
  }, [
    searchParams,
    locationAutocompleteOptions,
    setValue,
    setRoundTrip,
    setValidTo,
    setValidFrom,
    setValidDate,
  ]);

  const zIndexOffset = variant === 'header' ? 2 : 1;

  const { from, to, fromDate, toDate } = value || {};

  if (compact && variant === 'header' && !active) {
    return (
      <RootElement
        variant={variant}
        active={active}
        shown={shown}
        zIndexOffset={zIndexOffset}
        obstructedRef={obstructedRef}
        compact={compact}
      >
        <InputWrapper
          handleFocusOrClick={handleFocusOrClick}
          inputId={inputs.generic.id}
          zIndexOffset={zIndexOffset}
          active={active}
          shown={shown}
          variant={variant}
          focus={false}
        >
          <TextField
            onClick={(e) => handleFocusOrClick(inputIds.generic, false, e)}
            placeholder={inputs.generic.label}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onFocus={(e) => handleFocusOrClick(inputIds.generic, false, e)}
            onBlur={handleBlur}
            sx={{
              zIndex: (theme) =>
                active && shown ? theme.zIndex.appBar + zIndexOffset + 1 : undefined,
              '& fieldset': { border: 'none' },
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        </InputWrapper>
      </RootElement>
    );
  }

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
      <RootElement
        variant={variant}
        active={active}
        shown={shown}
        zIndexOffset={zIndexOffset}
        obstructedRef={obstructedRef}
        compact={compact}
      >
        <>
          <InputWrapper
            handleFocusOrClick={handleFocusOrClick}
            inputId={inputs.from.id}
            zIndexOffset={zIndexOffset}
            active={active}
            shown={shown}
            variant={variant}
          >
            <LocationField
              options={locationAutocompleteOptions}
              id={inputs.from.id}
              label={inputs.from.label}
              placeholder={inputs.from.placeholder}
              shown={shown}
              value={from || null}
              textValue={fromTextValue || ''}
              handleChange={handleChangeFrom}
              handleChangeText={handleChangeFromText}
              handleFocusOrClick={handleFocusOrClick}
              handleBlur={handleBlur}
              zIndexOffset={zIndexOffset + 1}
              variant={variant}
              valid={validFrom}
              handleKeyDown={handleKeyDown}
              handleKeyUp={handleKeyUp}
              inputAdornmentIcon={<FlightTakeoffIcon color={!validFrom ? 'error' : undefined} />}
            />
          </InputWrapper>
          <Divider
            flexItem
            sx={{
              borderBottomWidth: { xs: 'thin', md: 0 },
              borderRightWidth: { xs: 0, md: 'thin' },
            }}
          />
          <InputWrapper
            handleFocusOrClick={handleFocusOrClick}
            inputId={inputs.to.id}
            zIndexOffset={zIndexOffset}
            active={active}
            shown={shown}
            variant={variant}
          >
            <LocationField
              options={locationAutocompleteOptions}
              id={inputs.to.id}
              label={inputs.to.label}
              placeholder={inputs.to.placeholder}
              shown={shown}
              value={to || null}
              textValue={toTextValue || ''}
              handleChange={handleChangeTo}
              handleChangeText={handleChangeToText}
              handleFocusOrClick={handleFocusOrClick}
              handleBlur={handleBlur}
              zIndexOffset={zIndexOffset + 1}
              variant={variant}
              valid={validTo}
              handleKeyDown={handleKeyDown}
              handleKeyUp={handleKeyUp}
              inputAdornmentIcon={<FlightLandIcon color={!validTo ? 'error' : undefined} />}
            />
          </InputWrapper>
          <Divider
            flexItem
            sx={{
              borderBottomWidth: { xs: 'thin', md: 0 },
              borderRightWidth: { xs: 0, md: 'thin' },
            }}
          />
          <InputWrapper
            handleFocusOrClick={handleFocusOrClick}
            inputId={inputs.date.id}
            zIndexOffset={zIndexOffset}
            active={active}
            shown={shown}
            variant={variant}
            customRef={dateFieldRef}
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
              onFocus={() => handleFocusOrClick(inputs.date.id)}
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
                minWidth: '250px',
                '& fieldset': { border: 'none' },
              }}
            />
          </InputWrapper>
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
                selectedFromDate={fromDate}
                selectedToDate={toDate}
                setRoundTrip={setRoundTrip}
                roundTrip={roundTrip}
                setRangeLabel={capitalizeFirstLetter(t('roundTrip'))}
                closeDatePopper={() => setFocusedInputId(null)}
              />
            </Paper>
          </Popper>
        </>
        <Divider
          flexItem
          sx={{
            borderBottomWidth: { xs: 'thin', md: 0 },
            borderRightWidth: { xs: 0, md: 'thin' },
          }}
        />
        {/* TODO: Add internationalized aria-labels */}
        <InputWrapper
          handleFocusOrClick={handleFocusOrClick}
          inputId={inputs.search.id}
          zIndexOffset={zIndexOffset}
          active={active}
          shown={shown}
          variant={variant}
          backgroundColor="primary.main"
          onClick={handleSearch}
        >
          <IconButton
            id={inputIds.search}
            aria-label="search"
            aria-hidden={!shown}
            tabIndex={shown ? undefined : -1}
            hidden={!shown}
            disableRipple
            onFocus={() => handleFocusOrClick(inputIds.search)}
            onClick={handleSearch}
            onBlur={handleBlur}
            sx={{
              height: '100%',
              width: '100%',
            }}
          >
            <SearchIcon sx={{ color: 'white' }} />
          </IconButton>
        </InputWrapper>
      </RootElement>
    </>
  );
}

export default function SearchField(props: SearchFieldProps) {
  return (
    <Suspense>
      <SuspendedSearchField {...props} />
    </Suspense>
  );
}
