// ** Overrides Imports
import MuiCard from './overrides/card';
import MuiChip from './overrides/chip';
import MuiLink from './overrides/link';
import MuiList from './overrides/list';
import MuiMenu from './overrides/menu';
import MuiTabs from './overrides/tabs';
import FabButton from './overrides/fab';
import MuiBadge from './overrides/badge';
import MuiInput from './overrides/input';
import MuiTable from './overrides/table';
import MuiRadio from './overrides/radio';
import MuiAlerts from './overrides/alerts';
import MuiButton from './overrides/button';
import MuiDialog from './overrides/dialog';
import MuiRating from './overrides/rating';
import MuiDrawer from './overrides/drawer';
import MuiSelect from './overrides/select';
import MuiSlider from './overrides/slider';
import MuiAvatar from './overrides/avatars';
import MuiDivider from './overrides/divider';
import MuiPopover from './overrides/popover';
import MuiTooltip from './overrides/tooltip';
import MuiCheckbox from './overrides/checkbox';
import MuiBackdrop from './overrides/backdrop';
import MuiDataGrid from './overrides/dataGrid';
import MuiProgress from './overrides/progress';
import MuiSnackbar from './overrides/snackbar';
// import MuiSwitches from './overrides/switches';
import MuiTimeline from './overrides/timeline';
import MuiAccordion from './overrides/accordion';
import MuiPagination from './overrides/pagination';
import MuiTypography from './overrides/typography';
import MuiBreadcrumb from './overrides/breadcrumbs';
import MuiIconButton from './overrides/icon-button';
import MuiButtonGroup from './overrides/button-group';
import MuiAutocomplete from './overrides/autocomplete';
// import MuiToggleButton from './overrides/toggleButton';

// export default function componentStyleOverrides(theme) {
//   const bgColor = theme.colors?.grey50;
//   return {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           fontWeight: 500,
//           borderRadius: '4px'
//         }
//       }
//     },
//     MuiPaper: {
//       defaultProps: {
//         elevation: 0
//       },
//       styleOverrides: {
//         root: {
//           backgroundImage: 'none'
//         },
//         rounded: {
//           borderRadius: `${theme?.customization?.borderRadius}px`
//         }
//       }
//     },
//     MuiCardHeader: {
//       styleOverrides: {
//         root: {
//           color: theme.colors?.textDark,
//           padding: '24px'
//         },
//         title: {
//           fontSize: '1.125rem'
//         }
//       }
//     },
//     MuiCardContent: {
//       styleOverrides: {
//         root: {
//           padding: '24px'
//         }
//       }
//     },
//     MuiCardActions: {
//       styleOverrides: {
//         root: {
//           padding: '24px'
//         }
//       }
//     },
//     MuiListItemButton: {
//       styleOverrides: {
//         root: {
//           color: theme.darkTextPrimary,
//           paddingTop: '10px',
//           paddingBottom: '10px',
//           '&.Mui-selected': {
//             color: theme.menuSelected,
//             backgroundColor: theme.menuSelectedBack,
//             '&:hover': {
//               backgroundColor: theme.menuSelectedBack
//             },
//             '& .MuiListItemIcon-root': {
//               color: theme.menuSelected
//             }
//           },
//           '&:hover': {
//             backgroundColor: theme.menuSelectedBack,
//             color: theme.menuSelected,
//             '& .MuiListItemIcon-root': {
//               color: theme.menuSelected
//             }
//           }
//         }
//       }
//     },
//     MuiListItemIcon: {
//       styleOverrides: {
//         root: {
//           color: theme.darkTextPrimary,
//           minWidth: '36px'
//         }
//       }
//     },
//     MuiListItemText: {
//       styleOverrides: {
//         primary: {
//           color: theme.textDark
//         }
//       }
//     },
//     MuiInputBase: {
//       styleOverrides: {
//         input: {
//           color: theme.textDark,
//           '&::placeholder': {
//             color: theme.darkTextSecondary,
//             fontSize: '0.875rem'
//           }
//         }
//       }
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           background: bgColor,
//           borderRadius: `${theme?.customization?.borderRadius}px`,
//           '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: theme.colors?.grey400
//           },
//           '&:hover $notchedOutline': {
//             borderColor: theme.colors?.primaryLight
//           },
//           '&.MuiInputBase-multiline': {
//             padding: 1
//           }
//         },
//         input: {
//           fontWeight: 500,
//           background: bgColor,
//           padding: '15.5px 14px',
//           borderRadius: `${theme?.customization?.borderRadius}px`,
//           '&.MuiInputBase-inputSizeSmall': {
//             padding: '10px 14px',
//             '&.MuiInputBase-inputAdornedStart': {
//               paddingLeft: 0
//             }
//           }
//         },
//         inputAdornedStart: {
//           paddingLeft: 4
//         },
//         notchedOutline: {
//           borderRadius: `${theme?.customization?.borderRadius}px`
//         }
//       }
//     },
//     MuiSlider: {
//       styleOverrides: {
//         root: {
//           '&.Mui-disabled': {
//             color: theme.colors?.grey300
//           }
//         },
//         mark: {
//           backgroundColor: theme.paper,
//           width: '4px'
//         },
//         valueLabel: {
//           color: theme?.colors?.primaryLight
//         }
//       }
//     },
//     MuiDivider: {
//       styleOverrides: {
//         root: {
//           borderColor: theme.divider,
//           opacity: 1
//         }
//       }
//     },
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           color: theme.colors?.primaryDark,
//           background: theme.colors?.primary200
//         }
//       }
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           '&.MuiChip-deletable .MuiChip-deleteIcon': {
//             color: 'inherit'
//           }
//         }
//       }
//     },
//     MuiTooltip: {
//       styleOverrides: {
//         tooltip: {
//           color: theme.paper,
//           background: theme.colors?.grey700
//         }
//       }
//     }
//   };
// }

export default function componentStyleOverrides(theme) {
  const skin = 'default';
  const chip = MuiChip();
  const list = MuiList();
  const menu = MuiMenu();
  const tabs = MuiTabs();
  const radio = MuiRadio();
  const input = MuiInput();
  const tables = MuiTable();
  const alerts = MuiAlerts();
  const button = MuiButton();
  const rating = MuiRating();
  const slider = MuiSlider();
  const cards = MuiCard(skin);
  const avatars = MuiAvatar();
  const divider = MuiDivider();
  const tooltip = MuiTooltip();
  const fabButton = FabButton();
  const dialog = MuiDialog(skin);
  const checkbox = MuiCheckbox();
  const backdrop = MuiBackdrop();
  const dataGrid = MuiDataGrid();
  const progress = MuiProgress();
  const drawer = MuiDrawer(skin);
  // const switches = MuiSwitches();
  const timeline = MuiTimeline();
  const popover = MuiPopover(skin);
  const accordion = MuiAccordion();
  const pagination = MuiPagination();
  const snackbar = MuiSnackbar(skin);
  const breadcrumb = MuiBreadcrumb();
  const buttonGroup = MuiButtonGroup();
  const autocomplete = MuiAutocomplete(skin);

  return Object.assign(
    {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          },
          rounded: {
            borderRadius: `${theme?.customization?.borderRadius}px`
          }
        }
      }
    },
    chip,
    list,
    menu,
    tabs,
    cards,
    radio,
    input,
    alerts,
    button,
    dialog,
    rating,
    slider,
    drawer,
    tables,
    avatars,
    divider,
    MuiLink,
    popover,
    tooltip,
    checkbox,
    backdrop,
    MuiBadge,
    dataGrid,
    // MuiPaper,
    progress,
    snackbar,
    // switches,
    timeline,
    accordion,
    MuiSelect,
    fabButton,
    breadcrumb,
    pagination,
    buttonGroup,
    autocomplete,
    MuiIconButton,
    MuiTypography
    // MuiToggleButton
  );
}
