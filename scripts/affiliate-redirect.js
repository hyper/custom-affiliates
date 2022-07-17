// Set this to your Hyper dashboard domain (required)
const HYPER_PORTAL_DOMAIN = "join.onlydevs.co";

/**
 * Requirements:
 * Provide your affiliates with the following affiliate URL:
 * https://<YOUR WEBSITE>/<PATH TO PRODUCT (if needed)>?affiliate=<AFFILIATE ID>
 * WEBSITE: Your own, non-Hyper Dashboard, domain. In other words, the domain this server is running on.
 * PATH: If you want to show a specific page (eg. a product) when trying to convert customers
 * AFFILIATE ID: When an affiliate joins, they get a link that looks like: https://<HYPER PORTAL DOMAIN>/purchase?affiliate=<AFFILIATE ID>.
 * Fill in the AFFILIATE ID here.
 */
function redirect() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { affiliate } = Object.fromEntries(urlSearchParams.entries());
  if (!affiliate) return alert('Error: missing an affiliate id in the URL query!');

  const HYPER_AFFILIATE_URL = `https://${HYPER_PORTAL_DOMAIN}/purchase?affiliate=${affiliate}`;
  location.assign(HYPER_AFFILIATE_URL);
}