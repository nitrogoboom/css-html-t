// Close the mobile popover when the viewport grows to desktop; CSS can't leave the top layer.
// 64rem: keep in sync with style.css. Belt-and-suspenders: the MQL change event misses abrupt
// viewport jumps (window snap, monitor unplug), so a plain resize listener backs it up.
const closeMenuIfDesktop = () => matchMedia('(min-width: 64rem)').matches && document.getElementById('mobile-menu').hidePopover()
matchMedia('(min-width: 64rem)').addEventListener('change', closeMenuIfDesktop)
addEventListener('resize', closeMenuIfDesktop)

// A skipped cross-document view transition rejects its ready promise; swallow the expected noise.
addEventListener('pagereveal', e => e.viewTransition?.ready.catch(() => {}))

// A fast tap that light-dismisses the mobile nav is really two events: the dismiss, then a click that
// still lands where the finger came down. CSS (main/footer pointer-events:none while the popover is open)
// stops that click while the panel is open, but a quick second tap in the same spot arrives just after
// close, once the page underneath is normal again -- nothing left to block it. Swallow one click right
// after close so that trailing tap can't activate whatever was under the panel.
const mobileMenu = document.getElementById('mobile-menu')
const swallowTrailingClick = e => { e.preventDefault(); e.stopPropagation() }
mobileMenu.addEventListener('toggle', e => {
  if (e.newState === 'closed') {
    document.addEventListener('click', swallowTrailingClick, { capture: true, once: true })
    setTimeout(() => document.removeEventListener('click', swallowTrailingClick, true), 300)
  }
})

// Desktop dropdowns: <details> has no built-in light dismiss, so close on outside click and Escape.
const dropdowns = document.querySelectorAll('header nav details')
document.addEventListener('click', e => dropdowns.forEach(d => d.open && !d.contains(e.target) && (d.open = false)))
document.addEventListener('keydown', e => e.key === 'Escape' && dropdowns.forEach(d => {
  if (d.open) { d.open = false; d.querySelector('summary').focus() }
}))
