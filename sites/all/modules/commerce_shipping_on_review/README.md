Commerce Shipping on Review Page
================================
This module addresses a shortcoming in Commerce Shipping that causes the final
order total to be inaccurate if the choice of shipping option is put on the
final "Review" step of checkout.

This can be useful if, for example, you're attempting to reduce Drupal
Commerce's typical four step checkout into one to three steps instead.

Once installed and enabled, this module exposes the following two new rules
events:

- **Commerce Shipping: Selecting the default shipping service** -
  Invoked when the user is entering the Checkout review step, to control which
  shipping option is applied by default. This is not invoked again unless the
  user leaves and re-enters the review step.
- **Commerce Shipping: After selecting a shipping service** - Invoked each time
  a user makes a choice of shipping option.

In addition, this module automatically overrides the pane callbacks for both
Commerce Shipping and Commerce Cart to ensure that the order total includes
shipping. The shipping amount is also automatically updated via AJAX whenever
the user chooses a shipping option.

## Installation Steps
1. Install `Commerce Shipping`, `Commerce Cart`, and at least one shipping module.
2. Install this module.
3. Adjust checkout panes (under `/admin/commerce/config/checkout`) to put
   `Shipping service` on the `Review` page of checkout.
4. Ensure that `Include this pane on the Review checkout pane` is checked under
   the settings for `Shopping cart contents` pane
   (`/admin/commerce/config/checkout/form/pane/cart_contents`).
5. Adjust or replace the `Apply default shipping service` and `Apply selected
   shipping service` reaction rules (under `admin/config/workflow/rules`).
6. Try out checkout.

## Additional Rules Actions
This module exposes one new Rules action -- `Load the list of shipping services
into a variable` -- which is used by the default `Apply default shipping
service` reaction rule in order to load all of the available shipping services
and then select the first available option during checkout.

Feel free to use this action in other rules, as needed. If it proves useful
enough, we may want to offer a patch back to the Commerce Shipping module to
make it part of that module instead.

## Known Limitations
This module was designed only so that the `Shipping service` pane can be on the
`Review` step of checkout. We have not designed it for, or tested it with, the
`Shipping service` pane on an earlier step (or in the cart).

Regardless, this module should gracefully handle the `Shipping service` pane
being on the default `Shipping` step of checkout. It will basically seem like
this module is having no effect in this configuration.
