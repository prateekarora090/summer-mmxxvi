/* Site-wide navigation — single source of truth.
   Injected as the first element of <body> on every page. */
(function () {
  var PAGES = {
    'index.html': 'universes',
    'dionysia.html': 'weekend',
    'cult-of-artemis.html': 'weekend',
    'first-contact.html': 'weekend',
    'djs.html': 'planners',
    'anointments.html': 'planners'
  };
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var active = PAGES[here] || '';

  var css =
    '.site-nav{position:sticky;top:0;z-index:1000;background:rgba(11,16,27,.9);' +
      '-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);' +
      'border-bottom:1px solid rgba(232,196,118,.26);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;}' +
    '.site-nav .nav-in{max-width:920px;margin:0 auto;padding:0 18px;min-height:52px;' +
      'display:flex;align-items:center;justify-content:space-between;gap:14px;}' +
    '.site-nav .nav-mark{font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;' +
      'font-size:.92rem;letter-spacing:.14em;color:#F2EAD8;text-decoration:none;white-space:nowrap;}' +
    '.site-nav .nav-mark b{color:#E8C476;font-weight:600;letter-spacing:.2em;margin-left:.35em;}' +
    '.site-nav .nav-links{display:flex;align-items:center;gap:4px;}' +
    '.site-nav .nav-link{display:inline-block;padding:16px 12px;font-size:.68rem;font-weight:600;' +
      'letter-spacing:.15em;text-transform:uppercase;color:#C9C2B2;text-decoration:none;' +
      'background:none;border:none;cursor:pointer;line-height:1;}' +
    '.site-nav .nav-link:hover{color:#E8C476;}' +
    '.site-nav .nav-link.is-active{color:#E8C476;box-shadow:inset 0 -2px 0 #E8C476;}' +
    '.site-nav .nav-dd{position:relative;display:inline-block;}' +
    '.site-nav .nav-dd .caret{font-size:.6rem;opacity:.7;margin-left:2px;}' +
    '.site-nav .nav-dd-menu{display:none;position:absolute;right:0;top:100%;min-width:184px;' +
      'background:#161f31;border:1px solid #26324b;border-radius:6px;padding:6px;' +
      'box-shadow:0 14px 34px rgba(0,0,0,.45);}' +
    '.site-nav .nav-dd.open .nav-dd-menu{display:block;}' +
    '@media(hover:hover){.site-nav .nav-dd:hover .nav-dd-menu{display:block;}}' +
    '.site-nav .nav-dd-menu a{display:block;padding:10px 14px;border-radius:4px;' +
      'font-size:.68rem;font-weight:600;letter-spacing:.13em;text-transform:uppercase;' +
      'color:#C9C2B2;text-decoration:none;white-space:nowrap;}' +
    '.site-nav .nav-dd-menu a:hover{color:#E8C476;background:rgba(232,196,118,.07);}' +
    '.site-nav .nav-dd-menu a.is-active{color:#E8C476;}' +
    '@media(max-width:520px){.site-nav .nav-mark{display:none;}' +
      '.site-nav .nav-in{justify-content:center;}' +
      '.site-nav .nav-link{padding:16px 10px;}}' +
    '#universes,#weekend{scroll-margin-top:64px;}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Site');
  nav.innerHTML =
    '<div class="nav-in">' +
      '<a class="nav-mark" href="index.html">SUMMER<b>MMXXVI</b></a>' +
      '<div class="nav-links">' +
        '<a class="nav-link' + (active === 'universes' ? ' is-active' : '') + '" href="index.html#universes">Universes</a>' +
        '<a class="nav-link' + (active === 'weekend' ? ' is-active' : '') + '" href="index.html#weekend">The Weekend</a>' +
        '<div class="nav-dd">' +
          '<button class="nav-link nav-dd-btn' + (active === 'planners' ? ' is-active' : '') + '" type="button" aria-haspopup="true" aria-expanded="false">Planners <span class="caret">&#9662;</span></button>' +
          '<div class="nav-dd-menu">' +
            '<a' + (here === 'djs.html' ? ' class="is-active"' : '') + ' href="djs.html">The DJ Hunt</a>' +
            '<a' + (here === 'anointments.html' ? ' class="is-active"' : '') + ' href="anointments.html">The Anointments</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.insertBefore(nav, document.body.firstChild);

  var dd = nav.querySelector('.nav-dd');
  var btn = nav.querySelector('.nav-dd-btn');
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = dd.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function () {
    dd.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      dd.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();
