// One entry per service page. service.njk paginates this into /services/<slug>/.
// nav.js reads this too, so nav and pages can never drift apart.
export default [
  { slug: "cybersecurity", title: "Cybersecurity", lead: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." },
  { slug: "help-desk", title: "Help Desk (EN/FR)", lead: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip." },
  { slug: "backup-recovery", title: "Backup & Recovery", lead: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore." },
  { slug: "compliance", title: "Compliance Alignment", lead: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt." },
  { slug: "vcio-consulting", title: "vCIO Consulting", lead: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque." },
  { slug: "voip", title: "VoIP Solutions", lead: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit." },
]
