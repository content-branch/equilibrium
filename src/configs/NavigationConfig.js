import { 
  AntDesignOutlined, 
  QuestionOutlined,
  CodeOutlined,
  BranchesOutlined,
  LogoutOutlined,
  SettingOutlined,
  DatabaseOutlined,
  SafetyCertificateOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  GithubOutlined,
  RadarChartOutlined,
  SubnodeOutlined,
  BuildOutlined,
  EyeOutlined,
  ApiOutlined,
  CodeSandboxOutlined,
  DeploymentUnitOutlined,
  BlockOutlined,
  HeatMapOutlined,
  UnlockOutlined,
  IdcardOutlined,
  ReadOutlined,
  ProfileOutlined,
  BookOutlined,
  BulbOutlined,
  UserOutlined
} from '@ant-design/icons';

import { APP_PREFIX_PATH } from 'configs/AppConfig';

//Dashboard
const dashBoardNavTree = [{
  key: 'home-dashboard',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Dashboard',
  icon: AntDesignOutlined,
  breadcrumb: true,
  submenu: []
}];


//Applications
const appNavTree = [{
  key: 'applications',
  path: `${APP_PREFIX_PATH}/applications`,
  title: 'Applications',
  icon: AppstoreOutlined,
  breadcrumb: true,
  submenu: [
    {
      key: 'applications-overview',
      path: `${APP_PREFIX_PATH}/applications/overview`,
      title: 'Overview',
      icon: EyeOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'applications-integrations',
      path: `${APP_PREFIX_PATH}/applications/integrations`,
      title: 'Integrations',
      icon: ApiOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'applications-open-in-sandbox',
      path: `${APP_PREFIX_PATH}/applications/sandbox`,
      title: 'Open in Sandbox',
      icon: CodeSandboxOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'applications-app-deploy',
      path: `${APP_PREFIX_PATH}/applications/deploy`,
      title: 'Deploy',
      icon: DeploymentUnitOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}];

//Entities
const entitiesBoardNavTree = [{
  key: 'entities',
  path: `${APP_PREFIX_PATH}/entities`,
  title: 'Entities',
  icon: DatabaseOutlined,
  breadcrumb: true,
  submenu: [
    {
      key: 'entities-content-model',
      path: `${APP_PREFIX_PATH}/entities/content-model`,
      title: 'Content Model',
      icon: BlockOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'entities-schemas-analysis',
      path: `${APP_PREFIX_PATH}/entities/schemas-analysis`,
      title: 'Schemas analysis',
      icon: HeatMapOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}];

//Workspaces
const workspacesNavTree = [{
  key: 'workspaces',
  path: `${APP_PREFIX_PATH}/workspaces`,
  title: 'Workspaces',
  icon: ApartmentOutlined,
  breadcrumb: true,
  submenu: [
    ...appNavTree,
    ...entitiesBoardNavTree,
    {
      key: 'workspace-settings',
      path: `${APP_PREFIX_PATH}/workspaces`,
      title: 'Workspace settings',
      icon: SettingOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}];



//Command Line Interface
const cliNavTree = [{
  key: 'console',
  path: `${APP_PREFIX_PATH}/console`,
  title: 'Console',
  icon: '',
  breadcrumb: true,
  submenu: [
    {
      key: 'console-cli-command-line-interface',
      path: `${APP_PREFIX_PATH}/console/cli`,
      title: 'Command (CLI)',
      icon: CodeOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'console-graphql-gql-GraphQL',
      path: `${APP_PREFIX_PATH}/console/gql`,
      title: 'GraphQL Console',
      icon: RadarChartOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}];

//Version Control
const versionControlNavTree = [{
  key: 'version-control',
  path: `${APP_PREFIX_PATH}/version`,
  title: 'Version Control',
  icon: '',
  breadcrumb: true,
  submenu: [
    {
      key: 'version-control-pending-staging',
      path: `${APP_PREFIX_PATH}/version/staging`,
      title: 'Pending Changes',
      icon: BranchesOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'version-control-commits',
      path: `${APP_PREFIX_PATH}/version/commits`,
      title: 'Commits',
      icon: SubnodeOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'version-control-sync-github',
      path: `${APP_PREFIX_PATH}/version/sync`,
      title: 'Sync with Github',
      icon: GithubOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'version-control-build-status-pipeline',
      path: `${APP_PREFIX_PATH}/version/build-status`,
      title: 'Build Status',
      icon: BuildOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}];

//Roles
const roleNavTree = [{
  key: 'settings-role',
  path: `${APP_PREFIX_PATH}/settings/`,
  title: 'Roles & Permissions',
  icon: SafetyCertificateOutlined,
  breadcrumb: true,
  submenu: [
    {
      key: 'settings-role-permissions',
      path: `${APP_PREFIX_PATH}/settings/permissions`,
      title: 'Permissions',
      icon: UnlockOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'settings-role-api-tokens',
      path: `${APP_PREFIX_PATH}/settings/api-tokens`,
      title: 'API Tokens',
      icon: IdcardOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}];

const userNavTree = [{
  key: 'settings-user-edit-profile',
  path: `${APP_PREFIX_PATH}/settings/edit-profile`,
  title: 'User',
  icon: UserOutlined,
  breadcrumb: true,
  submenu: []
}];

//Settings
const settingsNavTree = [{
  key: 'settings',
  path: `${APP_PREFIX_PATH}/settings`,
  title: 'Settings',
  icon: SettingOutlined,
  breadcrumb: true,
  submenu: [
    ...roleNavTree,
    ...userNavTree
  ]
}];

//Support
const supportNavTree = [{
  key: 'support',
  path: `${APP_PREFIX_PATH}/support`,
  title: 'Support',
  icon: QuestionOutlined,
  breadcrumb: true,
  submenu: [
    {
      key: 'support-start',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Getting Started',
      icon: BulbOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'support-dev',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Developer Docs',
      icon: ReadOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'support-changelog',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Changelogs',
      icon: ProfileOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'support-cms',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Guide to Headless CMS',
      icon: BookOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}];

//Docs
const docsNavTree = [{
  key: 'docs',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Docs',
  icon: '',
  breadcrumb: true,
  submenu: [
    ...supportNavTree
  ]
}];

//Logout
const logoutNavTree = [{
  key: 'logout',
  path: `${APP_PREFIX_PATH}/logout`,
  title: 'Logout',
  icon: LogoutOutlined,
  breadcrumb: true,
  submenu: [],
  isLogout:true,
}];

const othersNavTree = [{
  key: 'others',
  path: `${APP_PREFIX_PATH}/home`,
  title: ' ',
  icon: '',
  breadcrumb: true,
  submenu: [
    ...logoutNavTree
  ]
}];

const navigationConfig = [
  ...dashBoardNavTree,
  ...workspacesNavTree,
  ...cliNavTree,
  ...versionControlNavTree,
  ...settingsNavTree,
  ...docsNavTree,
  ...othersNavTree
]

export default navigationConfig;
