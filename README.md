# smallbiz-website — Cedar &amp; Stone

A fast, modern, fully responsive **single-page website for a local service
business**, built with plain HTML, CSS, and JavaScript — no frameworks, no build
step, no dependencies. Clone it, swap the text and colors, and it's ready to
ship.

It's set up as a realistic demo for a fictional landscaping company, but it's
really a **reusable template** for any local business (plumber, cafe, salon,
contractor, dentist).

🔗 **Live demo:** **https://cedarstone-demo.web.app** (hosted on Firebase)

![HTML](https://img.shields.io/badge/HTML5-semantic-orange)
![CSS](https://img.shields.io/badge/CSS3-responsive-blue)
![JS](https://img.shields.io/badge/JavaScript-vanilla-yellow)
![Build](https://img.shields.io/badge/build-none-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Mobile-first & responsive** — one column on phones, multi-column on desktop,
  with an animated hamburger menu.
- **Accessible** — semantic landmarks, a skip link, labeled form fields with
  inline error messages, visible focus states, and `prefers-reduced-motion`
  support.
- **Fast** — no frameworks or images to download; hero/illustrations are inline
  SVG and CSS gradients, so it loads almost instantly.
- **Themeable** — the whole palette and type scale live in CSS custom properties
  at the top of `css/styles.css`; change a few variables to rebrand.
- **Interactive, without bloat** — scroll-reveal animations, an auto-rotating
  testimonial slider with clickable dots, and accessible form validation in
  vanilla JS.
- **Real backend — leads captured in Firestore.** The contact form writes
  straight to Cloud Firestore (no server to run), protected by tight security
  rules (`firestore.rules`): create-only on `/leads`, every field validated,
  and no client can read, update, or delete. Firebase is loaded lazily so an
  early submit never misses.
- **Deployed on Firebase Hosting** — live at
  [cedarstone-demo.web.app](https://cedarstone-demo.web.app) (config in
  `firebase.json`); a `.gitlab-ci.yml` is also included for GitLab Pages CI.

## Sections

Sticky nav · hero with CTAs and trust stats · services grid · project gallery ·
about · testimonials slider · contact form · footer.

## Run it locally

No build needed — it's static files. Just serve the folder:

```bash
git clone https://gitlab.com/broussardkobey67/smallbiz-website.git
cd smallbiz-website
python3 -m http.server 8000     # then open http://localhost:8000
```

(Or just open `index.html` directly in a browser.)

## Make it yours

| To change… | Edit… |
|---|---|
| Business name, copy, services | `index.html` |
| Colors, fonts, spacing | the `:root` variables in `css/styles.css` |
| Logo / favicon | `assets/favicon.svg` and the inline `.brand-mark` SVG |
| Project photos | swap the `.gallery-item` blocks for `<img>` tags |
| Where the form sends | wire the submit handler in `js/main.js` to an email/CRM endpoint |

## The contact form (Firestore backend)

Submissions are written to **Cloud Firestore** from the browser via the Firebase
web SDK (`js/firebase-form.js`) — no server to run or maintain. Security is
enforced by `firestore.rules`:

- **create-only** on the `/leads` collection — anyone can submit, nobody can read
- every field is **validated** (types, lengths, email format, server timestamp)
- **everything else is denied** (no read/update/delete, no other collections)

The site owner reads incoming leads in the Firebase console or via the Admin SDK.
Deploy rules + hosting with `firebase deploy`.

> The Firebase web API key in the config is public by design — it only
> identifies the project; access is governed entirely by the Firestore rules.

## License

MIT © Kobey Broussard — free to use and adapt for client work.
