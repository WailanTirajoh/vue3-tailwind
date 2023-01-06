export const useAnimationOpenClose = () => {
  function animateEnter(el: HTMLElement) {
    el.style.height = "auto";
    const height = getComputedStyle(el).height;
    el.style.height = "0";
    setTimeout(() => {
      el.style.height = height;
    });
  }

  function animateAfterEnter(el: HTMLElement) {
    el.style.height = "auto";
  }

  function animateLeave(el: HTMLElement) {
    el.style.height = getComputedStyle(el).height;
    getComputedStyle(el);
    setTimeout(() => {
      el.style.height = "0";
    });
  }

  return {
    animateEnter,
    animateAfterEnter,
    animateLeave,
  };
};
