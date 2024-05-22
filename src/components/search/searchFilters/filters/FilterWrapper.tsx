import { Button, Stack, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { Filters } from '../filters';

type FilterWrapperProps = {
  label: string;
  labelId: string;
  filterKey: keyof Filters;
  clearFilter?: () => void;
  resetFilter?: () => void;
  children: React.ReactNode;
};

export default function FilterWrapper(props: FilterWrapperProps) {
  const { label, labelId, filterKey, clearFilter, resetFilter, children } = props;
  return (
    <Stack gap={2} p={2} data-filter-key={filterKey}>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography id={labelId} variant="h6">
          {label}
        </Typography>
        {resetFilter ? (
          // TODO: Internationalize tooltip
          <Tooltip title={`Reset ${label.toLowerCase()} filter`}>
            <Button onClick={resetFilter} sx={{ minWidth: 'auto' }}>
              <ReplayIcon color="primary" fontSize="small" />
            </Button>
          </Tooltip>
        ) : null}
        {clearFilter ? (
          // TODO: Internationalize tooltip
          <Tooltip title={`Clear ${label.toLowerCase()} filter`}>
            <Button onClick={clearFilter} sx={{ minWidth: 'auto' }} color="error">
              <DeleteIcon fontSize="small" />
            </Button>
          </Tooltip>
        ) : null}
      </Stack>
      {children}
    </Stack>
  );
}
