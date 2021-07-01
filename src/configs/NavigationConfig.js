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
  key: 'home',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Dashboard',
  icon: AntDesignOutlined,
  breadcrumb: false,
  submenu: []
}];


//Applications
const appNavTree = [{
  key: 'app',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Applications',
  icon: AppstoreOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'app-overview',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Overview',
      icon: EyeOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'app-integrations-2',
          path: `${APP_PREFIX_PATH}/home`,
          title: 'Integrations',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'app-integrations',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Integrations',
      icon: ApiOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'app-sandbox',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Open in Sandbox',
      icon: CodeSandboxOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'app-deploy',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Deploy',
      icon: DeploymentUnitOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}];

//Entities
const entitiesBoardNavTree = [{
  key: 'entities',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Entities',
  icon: DatabaseOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'entities-overview',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Content Model',
      icon: BlockOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'entities-schemas',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Schemas analysis',
      icon: HeatMapOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}];

//Workspaces
const workspacedNavTree = [{
  key: 'workspace',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Workspaces',
  icon: ApartmentOutlined,
  breadcrumb: false,
  submenu: [
    ...appNavTree,
    ...entitiesBoardNavTree,
    {
      key: 'workspace-settings',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Workspace settings',
      icon: SettingOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}];



//Command Line Interface
const cliNavTree = [{
  key: 'console',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Console',
  icon: '',
  breadcrumb: false,
  submenu: [
    {
      key: 'console-cli',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Command (CLI)',
      icon: CodeOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'console-graphql',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'GraphQL Console',
      icon: RadarChartOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}];

//Version Control
const versionControlNavTree = [{
  key: 'versionControl',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Version Control',
  icon: '',
  breadcrumb: false,
  submenu: [
    {
      key: 'versionControl-pending',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Pending Changes',
      icon: BranchesOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'versionControl-commits',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Commits',
      icon: SubnodeOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'versionControl-sync',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Sync with Github',
      icon: GithubOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'versionControl-build',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Build Status',
      icon: BuildOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}];

//Roles
const roleNavTree = [{
  key: 'role',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Roles & Permissions',
  icon: SafetyCertificateOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'role-permission',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Permissions',
      icon: UnlockOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'role-token',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'API Tokens',
      icon: IdcardOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}];

const userNavTree = [{
  key: 'user',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'User',
  icon: UserOutlined,
  breadcrumb: false,
  submenu: []
}];

//Settings
const settingsNavTree = [{
  key: 'settings',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Settings',
  icon: SettingOutlined,
  breadcrumb: false,
  submenu: [
    ...roleNavTree,
    ...userNavTree
  ]
}];

//Support
const supportNavTree = [{
  key: 'support',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Support',
  icon: QuestionOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'support-start',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Getting Started',
      icon: BulbOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'support-dev',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Developer Docs',
      icon: ReadOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'support-changelog',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Changelogs',
      icon: ProfileOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'support-cms',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'Guide to Headless CMS',
      icon: BookOutlined,
      breadcrumb: false,
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
  breadcrumb: false,
  submenu: [
    ...supportNavTree
  ]
}];

//Logout
const logoutNavTree = [{
  key: 'logout',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Logout',
  icon: LogoutOutlined,
  breadcrumb: false,
  submenu: []
}];

const othersNavTree = [{
  key: 'others',
  path: `${APP_PREFIX_PATH}/home`,
  title: ' ',
  icon: '',
  breadcrumb: false,
  submenu: [
    ...logoutNavTree
  ]
}];

const navigationConfig = [
  ...dashBoardNavTree,
  ...workspacedNavTree,
  ...cliNavTree,
  ...versionControlNavTree,
  ...settingsNavTree,
  ...docsNavTree,
  ...othersNavTree
]

export default navigationConfig;
