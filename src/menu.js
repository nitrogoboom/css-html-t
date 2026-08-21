// Close the mobile popover when the viewport grows to desktop; CSS can't leave the top layer.
// 64rem: keep in sync with style.css.
matchMedia('(min-width: 64rem)').addEventListener('change', e => e.matches && document.getElementById('mobile-menu').hidePopover())

// Desktop dropdowns: <details> has no built-in light dismiss, so close on outside click and Escape.
const dropdowns = document.querySelectorAll('header nav details')
document.addEventListener('click', e => dropdowns.forEach(d => d.open && !d.contains(e.target) && (d.open = false)))
document.addEventListener('keydown', e => e.key === 'Escape' && dropdowns.forEach(d => {
  if (d.open) { d.open = false; d.querySelector('summary').focus() }
}))
