import { Box } from '@mui/material';

type InputWrapperProps = {
  handleFocusOrClick: (inputId: string, focus: boolean, e: React.MouseEvent) => void;
  inputId: string;
  zIndexOffset: number;
  active: boolean;
  shown: boolean;
  variant: 'dialog' | 'header' | 'landing';
  focus?: boolean;
  customRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  backgroundColor?: string;
  onClick?: () => void;
};

export default function InputWrapper(props: InputWrapperProps) {
  const {
    handleFocusOrClick,
    inputId,
    zIndexOffset,
    active,
    shown,
    variant,
    focus = true,
    customRef: ref,
    backgroundColor,
    onClick,
    children,
  } = props;
  return (
    <Box
      alignItems="end"
      display="flex"
      onClick={(e) => (onClick ? onClick() : handleFocusOrClick(inputId, focus, e))}
      ref={ref}
      sx={{
        flexGrow: inputId !== 'search-field-button-search' ? 1 : 0,
        position: 'relative',
        zIndex: (theme) => (active && shown ? theme.zIndex.appBar + zIndexOffset + 1 : undefined),
        cursor: 'text',
        ...(variant !== 'header' && {
          minHeight: '5rem',
        }),
        backgroundColor,
      }}
    >
      {children}
    </Box>
  );
}
