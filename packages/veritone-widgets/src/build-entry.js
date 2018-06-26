import r from 'regenerator-runtime/runtime';
window.regeneratorRuntime = r;

export VeritoneApp from './shared/VeritoneApp';
export AppBar, { AppBarWidget } from './widgets/AppBar';
export OAuthLoginButton, {
  OAuthLoginButtonWidget
} from './widgets/OAuthLoginButton';
export FilePicker, { FilePickerWidget } from './widgets/FilePicker';
export { EngineSelectionWidget } from './widgets/EngineSelection';
export { TableWidget as Table, TableWidget } from './widgets/Table';
export {
  GlobalNotificationDialog,
  GlobalSnackBar
} from './widgets/Notifications';
export { MediaPlayer } from './widgets/MediaPlayer';

export MediaDetailsPage from './widgets/MediaDetails';
export SourceManagement from './widgets/SourceManagementOverview';
export SourceList from './widgets/SourceList';
export SourceManagementForm from './widgets/SourceManagementForm';
export SourceDropdownMenu from './widgets/SourceDropdownMenu';
export ContentTemplate from './widgets/ContentTemplate';
export ContentTemplateForm from './widgets/ContentTemplateForm';
export SDOTable from './widgets/SDOTable';
export IngestionJobsList from './widgets/IngestionJobsList';
export IngestionAdapters from './widgets/IngestionAdapters';
export Scheduler from './widgets/Scheduler';
