'use client';

import useSearchFieldContext from '@hooks/context/useSearchFieldContext';
import { useRouter } from '@internationalization/navigation';
import { Box, TextField } from '@mui/material';
import { RefObject } from 'react';

export type SearchFieldProps = {
  obstructedRef?: RefObject<HTMLDivElement>;
  variant: 'landing' | 'header';
};

export default function SearchField(props: SearchFieldProps) {
  const { obstructedRef, variant } = props;

  const { value, setValue } = useSearchFieldContext();
  const router = useRouter();

  const handleSearch = () => {
    router.push({ pathname: '/search', query: { q: value } });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setValue('');
    }
  };

  return (
    <Box ref={obstructedRef}>
      <TextField
        placeholder="Search"
        value={value}
        onChange={handleChange}
        variant="outlined"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        type="search"
        inputProps={{
          className: 'search-field-input',
        }}
      />
    </Box>
  );
}
