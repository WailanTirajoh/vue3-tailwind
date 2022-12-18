import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import TwButton from "../button/TwButton.vue";

describe("TwButton", () => {
  it("renders properly", () => {
    const wrapper = mount(TwButton, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
