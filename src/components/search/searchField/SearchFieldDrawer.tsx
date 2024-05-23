import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import SearchIcon from '@mui/icons-material/Search';
import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';
import {
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRef } from 'react';
import { Dayjs } from 'dayjs';
import { useTranslations } from 'next-intl';
import CloseIcon from '@mui/icons-material/Close';
import DateRangePicker from '../DateRangePicker';
import LocationField from './LocationField';
import RootElement from './RootElement';
import { InputMap } from './inputs';
import InputWrapper from './InputWrapper';

type SearchFieldDialogProps = {
  variant: 'dialog' | 'header' | 'landing';
  active: boolean;
  shown: boolean;
  zIndexOffset: number;
  compact: boolean;
  handleFocusOrClick: (inputId: string, focus?: boolean, e?: React.MouseEvent) => void;
  inputs: InputMap;
  locationAutocompleteOptions: readonly LocationOrAirportOption[];
  from?: LocationOrAirportOption | null;
  fromTextValue: string | null;
  handleChangeFrom: (value: LocationOrAirportOption | null) => void;
  handleChangeFromText: (value: string) => void;
  handleBlur: () => void;
  validFrom: boolean;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  handleKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  to?: LocationOrAirportOption | null;
  toTextValue: string | null;
  handleChangeTo: (value: LocationOrAirportOption | null) => void;
  handleChangeToText: (value: string) => void;
  validTo: boolean;
  validDate: boolean;
  dateTextValue: string | null;
  handleChangeDateText: (value: string) => void;
  handleDateFieldBlur: () => void;
  datePopperOpen: boolean;
  handleChangeDate: (value: Dayjs | null) => void;
  setHoveredDate: (value: Dayjs | null) => void;
  hoveredDate: Dayjs | null;
  fromDate?: Dayjs | null;
  toDate?: Dayjs | null;
  setRoundTrip: (value: boolean) => void;
  roundTrip: boolean;
  handleSearch: () => void;
  t: ReturnType<typeof useTranslations<'common.trip'>>;
  closeDatePopper: () => void;
  dialogOpen: boolean;
};

export default function SearchFieldDialog(props: SearchFieldDialogProps) {
  const {
    variant,
    active,
    shown,
    zIndexOffset,
    compact,
    handleFocusOrClick,
    inputs,
    locationAutocompleteOptions,
    from,
    fromTextValue,
    handleChangeFrom,
    handleChangeFromText,
    handleBlur,
    validFrom,
    handleKeyDown,
    handleKeyUp,
    to,
    toTextValue,
    handleChangeTo,
    handleChangeToText,
    validTo,
    validDate,
    dateTextValue,
    handleChangeDateText,
    handleDateFieldBlur,
    datePopperOpen,
    handleChangeDate,
    setHoveredDate,
    hoveredDate,
    fromDate,
    toDate,
    setRoundTrip,
    roundTrip,
    handleSearch,
    closeDatePopper,
    dialogOpen,
    t,
  } = props;

  const dateFieldRef = useRef<HTMLDivElement>(null);
  return (
    <Dialog onClose={handleBlur} open={active && shown && dialogOpen} sx={{ width: '100%' }}>
      <Stack gap={1} padding={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          padding={2}
        >
          <Typography variant="h6">{inputs.generic.label}</Typography>
          <IconButton onClick={handleBlur} aria-label="Close drawer" disableRipple>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <RootElement
          variant={variant}
          active={active}
          shown={shown}
          zIndexOffset={zIndexOffset}
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
                disablePortal
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
                  closeDatePopper={closeDatePopper}
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
              id={inputs.search.id}
              aria-label="search"
              aria-hidden={!shown}
              tabIndex={shown ? undefined : -1}
              hidden={!shown}
              disableRipple
              onFocus={() => handleFocusOrClick(inputs.search.id)}
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
      </Stack>
    </Dialog>
  );
}
