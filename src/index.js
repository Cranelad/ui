import Alert from './components/Alert.vue';
import Button from './components/Button.vue';
import Card from './components/Cards/Card.vue';
import DropDown from './components/Dropdown.vue';
import FormGroupInput from './components/Inputs/formGroupInput.vue';
import Navbar from './components/Navbar/Navbar.vue';
import NavbarToggleButton from './components/Navbar/NavbarToggleButton.vue';
import NavLink from './components/Navbar/NavLink.vue';
import Parallax from './components/Parallax.vue';
import clickOutside from './directives/click-outside.js';

export {
  Alert,
  Button,
  Card,
  DropDown,
  FormGroupInput,
  Navbar,
  NavbarToggleButton,
  NavLink,
  Parallax,
  clickOutside
};

/**
 * Vue plugin: registers the v-click-outside directive (used by Navbar and
 * DropDown) and the components templates use without importing them
 * (<n-button>, <fg-input>, <parallax>).
 */
export default {
  install(app) {
    app.directive('click-outside', clickOutside);

    [Button, FormGroupInput, Parallax].forEach(component => {
      app.component(component.name, component);
    });
  }
};
