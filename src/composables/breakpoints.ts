import { computed, onMounted, onUnmounted, ref } from "vue";

/**
 * Breakpoint reference https://tailwindcss.com/docs/screens
 */
export const useBreakpoints = () => {
  const width = ref(0);

  const type = computed(() => {
    if (width.value < 640) return "sm";
    if (width.value >= 768 && width.value < 1024) return "md";
    if (width.value >= 1024 && width.value < 1280) return "lg";
    if (width.value >= 1280 && width.value < 1536) return "xl";
    return "2xl";
  });

  function onResize() {
    width.value = window.innerWidth;
  }

  onMounted(() => {
    onResize();
    window.addEventListener("resize", onResize);
  });

  onUnmounted(() => window.removeEventListener("resize", onResize));

  return { width, type };
};
