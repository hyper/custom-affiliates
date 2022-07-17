// Set this to your Hyper portal domain (required)
const HYPER_PORTAL_DOMAIN = "join.onlydevs.co";

function reconstruct(affiliateID) {
  return `https://${HYPER_PORTAL_DOMAIN}/purchase?affiliate=${affiliateID}`;

}

function redirect() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { affiliate: affiliateID } = Object.fromEntries(urlSearchParams.entries());

  let redirectUrl;

  if (!affiliateID) {
    alert('No affiliate found in request query. Non-referred user.');
    redirectUrl = `https://${HYPER_PORTAL_DOMAIN}/purchase`;
  }
  else {
    alert(`Affilite (id: ${affiliateID}) found in request query. Referred user.`);
    redirectUrl = reconstruct(affiliateID);
  }

  location.assign(redirectUrl);
}
