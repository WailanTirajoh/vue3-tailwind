import type { App } from "vue";
import {
  TwFile,
  TwInput,
  TwMultiSelect,
  TwSelect,
  TwTextarea,
  TwToggle,
} from "./components";

const TwComponents = {
  install(app: App) {
    app.component("TwFile", TwFile);
    app.component("TwInput", TwInput);
    app.component("TwMultiSelect", TwMultiSelect);
    app.component("TwSelect", TwSelect);
    app.component("TwTextarea", TwTextarea);
    app.component("TwToggle", TwToggle);
  },
};

export default TwComponents;
