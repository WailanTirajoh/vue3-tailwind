const focusOutline = {
  mounted: (el: HTMLElement) => {
    el.classList.add(
      "focus:outline-0",
      "focus:ring-inset",
      "focus:ring-2",
      "focus:ring-gray-300",
      "visited:outline-0",
      "visited:ring-inset",
      "visited:ring-2",
      "visited:ring-gray-300",
      "blur:outline-0",
      "blur:ring-inset",
      "blur:ring-2",
      "blur:ring-gray-300",
      "inline-block"
    );
  },
};

export default focusOutline;
