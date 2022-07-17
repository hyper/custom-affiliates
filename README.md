# Hyper Custom Affiliates
 Redirect users from your website to a Hyper checkout session while keeping affiliate data!

## What is it?
If you're using [Hyper](https://hyper.co) to sell a digital product and have your own, non-Hyper hosted, website/landing page, you're probably familiar with redirecting people to your Hyper portal to purchase a product. This can be done with an `<a>` tag or via a `<button>` that sends the user to your portal.

However, if you're on the **Scale** plan and leveraging the **Affiliates** feature, you might've realized that the link Hyper gives each affiliate points them to a checkout session on your Hyper portal and doesn't go through your landing page first.

Chances are, if a user is interested in buying a product, they want to learn more about it first (via your website) before going straight to checkout (via your Hyper portal). **Because your website is separate from Hyper, we aren't able to implement this functionality directly.** However, the affiliates feature is designed to enable this user flow, which is why guide contains the information and some starter code to show you how.

## How Hyper forms affiliate links
When you add an affiliate, they get a unique link that looks something like this:

`https://<HYPER PORTAL DOMAIN>/purchase?affiliate=<AFFILIATE ID>`

| Variable | Description |
| --- | --- |
| `HYPER PORTAL DOMAIN` | The domain that your Hyper-hosted member portal is on. |
| `AFFILIATE ID` | An affiliate's unique identifier that tracks their sales. |

## Steps to redirect users while persisting affiliate data
Regardless of how your website is coded, the steps to enabling affiliate data to be persisted are the same at a high level:

1. Give your affiliates a new link that looks something like (make sure they use this one instead of the Hyper-issued link):

`https://<YOUR WEBSITE>/<PATH TO PRODUCT (if needed)>?affiliate=<AFFILIATE ID>`
| Variable | Description |
| --- | --- |
| `YOUR WEBSITE` | The domain of your own website/landing page. |
| `PATH TO PRODUCT` | A path to a specific page on your website that has information about your product/business (if needed). |
| `AFFILIATE ID` | The Affiliate ID found in the original, Hyper-issued affiliate link. |

2. When your purchase button is clicked, reconstruct the original, Hyper-provided, affiliate link. Since Hyper only uses the portal domain (which you should be setting as a constant) and Affiliate ID (which you can extract from the current query parameters), you can acomplish this very easily.

3. If there isn't an Affiliate ID (query parameters has no "ID" value), you can redirect them to your portal's checkout page (`https://<HYPER_PORTAL_DOMAIN>/purchase`)--this means that no affiliate was used to refer the current user. However, if there is an affiliate ID, redirect the user to the original, Hyper-provided, affiliate link we reconstructed in step 2.

## How our example works
In `index.html`, we've laid out a simple mock landing page for Only Devs, a business that uses Hyper.

When you visit [custom-affiliates.demo.hyper.co](https://custom-affiliates.demo.hyper.co/), you'll see the option to purchase. If you click the button, you'll see an alert (done for demonstration purposes) saying that no Affiliate ID was found in the request query--this means that we are an 'organic', non-referred user. After dismissing, you'll be redirected to the Hyper-hosted purchase page.

Alertnatively, if you visit [custom-affiliates.demo.hyper.co/?affiliate=kmIwRUYlrfxbVigQEImR4](https://custom-affiliates.demo.hyper.co?affiliate=kmIwRUYlrfxbVigQEImR4), you'll once again see the option to purchase. But, since we've provided an Affiliate ID in the request query, we can reconstruct the original affiliate link. If you click on the purchase button, you'll get an alert that shows the reconstructed affiliate link. After dismissing, you'll be redirected to the Hyper-hosted purchase page *with affiliate information carried over*.

The starter Javascript can be found in `scripts/affiliate-redirect.js`.

## Notes and Considerations
- The specific demo we provide is designed to be a starting point, not the absolute solution, since every website is different. However, the high-level steps we provided are designed to work in all configurations.
- You should **always** test your code's ability to accurately reconstruct Hyper's original affiliate links. If something goes wrong, your affiliates won't be getting their payouts. *Hyper is not responsible for any errors or unexpected behavior that may come as a result of incorrectly building atop of our native functionality.*
- Some times, a user might visit an affiliate link and then travel to other parts of the website. When this happens, the request query that contains the affiliate information will be lost. So if the user returns to the product page to purchase, the redirect logic wouldn't know that they were referred by an affiliate. This is only a problem if your site has multiple pages. A simple solution is persisting the Affiliate ID in `Local Storage`, `Cookies`, or `Session Storage`, and then pulling it from there when attempting to reconstruct the original, Hyper-provided, affiliate link.