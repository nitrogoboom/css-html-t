// Close the mobile popover when the viewport grows to desktop; CSS can't leave the top layer.
// 64rem: keep in sync with style.css. Belt-and-suspenders: the MQL change event misses abrupt
// viewport jumps (window snap, monitor unplug), so a plain resize listener backs it up.
const closeMenuIfDesktop = () => matchMedia('(min-width: 64rem)').matches && document.getElementById('mobile-menu').hidePopover()
matchMedia('(min-width: 64rem)').addEventListener('change', closeMenuIfDesktop)
addEventListener('resize', closeMenuIfDesktop)

// A skipped cross-document view transition rejects its ready promise; swallow the expected noise.
addEventListener('pagereveal', e => e.viewTransition?.ready.catch(() => {}))

// A fast tap that light-dismisses the mobile nav fires pointerdown (which closes the popover, per spec)
// and click (which lands on whatever's under the finger) in the same gesture. CSS blocks that click while
// the popover is still open, but light-dismiss can close it between pointerdown and click, so the click
// arrives after the page underneath is already normal again -- nothing left to block it. Note at
// pointerdown whether the popover was open; if so, swallow the click that follows.
const mobileMenu = document.getElementById('mobile-menu')
let dismissing = false
document.addEventListener('pointerdown', () => { dismissing = mobileMenu.matches(':popover-open') }, true)
document.addEventListener('click', e => {
  if (dismissing && !mobileMenu.contains(e.target)) { e.preventDefault(); e.stopPropagation() }
  dismissing = false
}, true)

// Desktop dropdowns: <details> has no built-in light dismiss, so close on outside click and Escape.
const dropdowns = document.querySelectorAll('header nav details')
document.addEventListener('click', e => dropdowns.forEach(d => d.open && !d.contains(e.target) && (d.open = false)))
document.addEventListener('keydown', e => e.key === 'Escape' && dropdowns.forEach(d => {
  if (d.open) { d.open = false; d.querySelector('summary').focus() }
}))
