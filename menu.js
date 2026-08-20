// Close the mobile popover when the viewport grows to desktop; CSS can't leave the top layer.
// 64rem: keep in sync with style.css.
matchMedia('(min-width: 64rem)').addEventListener('change', e => e.matches && document.getElementById('mobile-menu').hidePopover())
