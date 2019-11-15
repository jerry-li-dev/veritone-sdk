import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(_ => createStyles({

  dialog: {
    'max-height': '100%'
  },

  dialogScrollPaper: {
    'justify-content': 'center'
  },

  dialogTitle: {
    'display': 'flex',
    'justify-content': 'space-between',
    'border-bottom': '1px solid #DADCDF',
    'padding': '12px 20px',
  },

  dialogContent: {
    'padding': '16px 20px 0 20px',
    'height': 'calc(100% - 70px)',
  },

  titleItem: {
    'margin-left': '10px !important',
    'cursor': 'pointer',
  },
  previewContainer: {
    'height': '100%'
  },
  previewContent: {
    'height': 'calc(100% - 45px)',
    'overflow': '-moz-scrollbars-none',
    '&:-webkit-scrollbar': { width: '0 !important' }
  },
  formLoading: {
    'align-self': 'center'
  },
  formName: {
    'margin': '24px !important',
    'width': '500px !important',
  }
}))
