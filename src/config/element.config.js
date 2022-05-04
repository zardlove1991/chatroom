import Vue from 'vue';

import {
  Alert,
  Select,
  Option,
  Input,
  Button,
  Dialog,
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Upload,
  Message,
  MessageBox,
  Loading,
  Checkbox,
  CheckboxGroup,
  Avatar,
  Table,
  TableColumn,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  Switch,
  InputNumber,
  Popover,
  Container,
  Header,
  Submenu,
  Menu,
  MenuItem,
  MenuItemGroup,
  Aside,
  Main,
  Tabs,
  TabPane,
  Tag,
  DatePicker,
  Tree,
  Autocomplete,
} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '../../theme/index.css';
Vue.use(Alert);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Upload);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Avatar);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Switch);
Vue.use(InputNumber);
Vue.use(Popover);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Submenu);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(MenuItemGroup);
Vue.use(DatePicker);
Vue.use(Tree);
Vue.use(Tree);
Vue.use(Autocomplete);
Vue.use(Loading.directive);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = (msg) => {
  Message({ ...msg, duration: 3000 });
};

