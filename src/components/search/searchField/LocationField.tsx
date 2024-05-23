import { Autocomplete, Box, InputAdornment, TextField, darken, lighten } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import styled from '@mui/system/styled';
import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';
import { ReactNode } from 'react';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';

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

type LocationFieldProps = {
  options: readonly LocationOrAirportOption[];
  id: string;
  label: string;
  placeholder?: string;
  shown: boolean;
  value: LocationOrAirportOption | null;
  textValue: string;
  handleChangeText: (value: string) => void;
  handleChange: (value: LocationOrAirportOption | null) => void;
  handleBlur: () => void;
  zIndexOffset: number;
  variant: 'dialog' | 'header' | 'landing';
  valid: boolean;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  handleKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputAdornmentIcon: ReactNode;
  handleFocusOrClick: (id: string) => void;
  disablePortal?: boolean;
};

export default function LocationField(props: LocationFieldProps) {
  const {
    options,
    id,
    label,
    placeholder,
    shown,
    value,
    textValue,
    handleChange,
    handleChangeText,
    handleBlur,
    handleFocusOrClick,
    zIndexOffset,
    variant,
    valid,
    handleKeyDown,
    handleKeyUp,
    inputAdornmentIcon,
    disablePortal,
  } = props;
  return (
    <Autocomplete
      disablePortal={disablePortal}
      options={options}
      id={id}
      // type="search"
      renderOption={(renderProps, option) => {
        const { name, type, id: oId } = option;
        const location = type === 'location';
        return (
          <Box
            component="li"
            sx={{ '& > svg': { mr: 2, flexShrink: 0 } }}
            {...renderProps}
            key={`${type}:${oId}`}
          >
            {location ? <LocationCityIcon /> : <LocalAirportIcon />}
            {name}
          </Box>
        );
      }}
      // TODO: Internationalize group header
      groupBy={(option) => capitalizeFirstLetter(option.type)}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      aria-label={label}
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      hidden={!shown}
      value={value}
      sx={{ flexGrow: 1 }}
      getOptionLabel={(option) => option.name}
      getOptionKey={(option) => `${option.type}:${option.id}`}
      isOptionEqualToValue={(o, v) => o.id === v?.id && o.type === v?.type}
      inputValue={textValue}
      onInputChange={(e, v) => handleChangeText(v)}
      onChange={(e, v) => handleChange(v)}
      onFocus={() => handleFocusOrClick(id)}
      onClick={() => handleFocusOrClick(id)}
      onBlur={handleBlur}
      slotProps={{
        popper: {
          style: {
            width: '300px',
            maxWidth: '90vw',
          },
          sx: {
            zIndex: (theme) => theme.zIndex.appBar + zIndexOffset,
          },
        },
      }}
      renderInput={(params) => {
        return (
          <TextField
            label={variant === 'header' ? undefined : label}
            placeholder={variant === 'header' ? label : placeholder}
            error={!valid}
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
                <InputAdornment position="start">{inputAdornmentIcon}</InputAdornment>
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
  );
}
