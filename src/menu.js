// Close the mobile popover when the viewport grows to desktop; CSS can't leave the top layer.
// 64rem: keep in sync with style.css. Belt-and-suspenders: the MQL change event misses abrupt
// viewport jumps (window snap, monitor unplug), so a plain resize listener backs it up.
const closeMenuIfDesktop = () => matchMedia('(min-width: 64rem)').matches && document.getElementById('mobile-menu').hidePopover()
matchMedia('(min-width: 64rem)').addEventListener('change', closeMenuIfDesktop)
addEventListener('resize', closeMenuIfDesktop)

// A skipped cross-document view transition rejects its ready promise; swallow the expected noise.
addEventListener('pagereveal', e => e.viewTransition?.ready.catch(() => {}))

// Popover light-dismiss (pointerdown/pointerup, independent of this click event) closes the mobile nav on
// a backdrop click, but the click itself still lands on whatever's behind the backdrop and activates it
// (the ::backdrop isn't a real element clicks stop at). Block just that one click's default action.
const mobileMenu = document.getElementById('mobile-menu')
document.addEventListener('click', e => {
  if (mobileMenu.matches(':popover-open') && !mobileMenu.contains(e.target)) e.preventDefault()
}, true)

// Desktop dropdowns: <details> has no built-in light dismiss, so close on outside click and Escape.
const dropdowns = document.querySelectorAll('header nav details')
document.addEventListener('click', e => dropdowns.forEach(d => d.open && !d.contains(e.target) && (d.open = false)))
document.addEventListener('keydown', e => e.key === 'Escape' && dropdowns.forEach(d => {
  if (d.open) { d.open = false; d.querySelector('summary').focus() }
}))
