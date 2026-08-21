// Single source of truth for header, mobile drawer, and footer links.
// Section links derive from the page data files, so a new service page appears in every nav automatically.
import services from "./services.js"
import industries from "./industries.js"

export default {
  sections: [
    { title: "Managed Services", links: services.map(s => ({ label: s.title, url: `/services/${s.slug}/` })) },
    { title: "Industries", links: industries.map(i => ({ label: i.title, url: `/industries/${i.slug}/` })) },
  ],
  pages: [
    { label: "Newsdesk", url: "/newsroom/" },
    { label: "About Us", url: "/about/" },
  ],
  tel: "+16134436316",
  telDisplay: "Call\u00A0(613)\u00A0443\u00A06316", // non-breaking spaces: the number never wraps mid-phone,
  email: "hello@example.com",
}
