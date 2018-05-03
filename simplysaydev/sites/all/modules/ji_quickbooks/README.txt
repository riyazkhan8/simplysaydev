CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Installation
 * Configuration
 * Troubleshooting
 * FAQ
 * Maintainers



INTRODUCTION
------------

A Drupal 7 QuickBooks module use with Ubercart or Commerce modules. Syncs data
during checkout when a customer makes/completes a purchase - entirely seamless.

Major features are:

* Using the latest and greatest QuickBooks API (version: 3 2.6.0)
* Using Drupal 7 and plans to migrate to Drupal 8
* Making installation super easy and pain free using what's already available to
  us by adapting JI QuickBooks to either the Ubercart interface or Commerce's.
  Currently compatible with Ubercart and work has already begun to integrate
  into Commerce.
      Features:
        * Customer data is synced upon checkout
        * Invoice and Payment data is synced to QuickBooks upon checkout
        * Taxes can be synced from QuickBooks or from Drupal

REQUIREMENTS
------------
* Download SDK from https://joshideas.com/sdk/ji_quickbooks/qbosdk3260.zip
  and place in the /sites/all/libraries/ directory. Placing the qbosdk3260
  folder in that directory so it looks like /sites/all/libraries/qbosdk3260
* QuickBooks Online requires the installation of OAuth on the server using the
  php.ini extension=oauth.so. The module will alert you if it detects
  OAuth isn't installed on the web server
* Ubercart or Commerce


INSTALLATION
------------
To get going by creating a free QuickBooks account to test with, follow the
instructions below:

Navigate to https://developer.intuit.com/ and create an account unless you
already have one. If you already have a QBO account then this process will be
much easier since you can use that account to tie into a developer account.
Once logged in, follow the instructions below to enable test companies so you
won't have to worry about touching live data.

* Click on My Apps.
* On the Create new app page, click Select APIs.
* On the Select API page, check Accounting and click Create app.
* On the DEVELOPMENT Dashboard page under Get your app ready for submission,
  choose Test with OAuth Playground.
* On the OAuth Playground page you'll be given your Consumer Key and Consumer
  Secret. Put these keys in the /admin/config/services/ji_quickbooks
  configuration page. Now choose an Access Token Duration that's about
  5 months in seconds or 12960000. Note: You'll have to refresh the keys
  before your duration runs out or your website will stop communicating with
  QuickBooks. Future releases of JI QuickBooks will implement automatic token
  refresh features so you only have to set this once.
  Press the CONNECT TO QuickBooks button.
* A popup window displays stating Authorize the Sharing of Your Data Between
  Untitled and Intuit, click the Authorize button.
* It now displays a page where your Access Token, Access Token Secret, and
  RealmId values are given. Copy these to your configuration page.
* Congratulations! You now have a working Drupal website that connects to
  QuickBooks Online!


CONFIGURATION
-------------
Once JI QuickBooks module is installed, navigate to
admin/config/services/ji_quickbooks. By going here the module
will alert you if something isn't working.

TROUBLESHOOTING
---------------
Post any issue you may have in our issue queue
https://www.drupal.org/project/issues/2847007?status=All&categories=All page.

You can see our actively maintained documentation here
https://joshideas.com/ji_quickbooks

FAQ
--------------
Q: Why can't I download the QuickBooks Online SDK from QuickBooks directly?
A: Two reasons:
    1) They update their SDK on a regular basis and functionality may
       break.
    2) We've made modifications to their SDK and may need to
       make further changes as well.

Q: I'm finished testing and I'm happy with the module, how do I switch to
   production mode to connect JI QuickBooks to my live paid QBO account?
A: You go through a similar process as when getting your access tokens but
   instead of DEVELOPMENT you go to PRODUCTION then Keys - place the
   keys given to you in your configuration page. You return to Test with
   OAuth Playground where you copy your ConsumerKey and
   ConsumerKeySecret. Once you complete the OAuth Playground pages,
   it will give you new AccessToken and AccessTokenSecret
   which you'll replace in your configuration page.

   Visit https://joshideas.com/ji_quickbooks for a better guide

Q: My access tokens and keys appear to be correct, I even double checked the
   realmid but JI QuickBooks module is telling me there's an error with them.
   What's going on?
A: We've noticed that QuickBooks will block or prevent a new user from
   accessing a newly created sandbox account. During testing, this occurred to
   us. We had to log QuickBooks support ticket asking them about this.


MAINTAINERS
-----------
Current maintainers:
 * Joshua Ramirez  https://www.drupal.org/u/joshideas - https://joshideas.com
 * Leonardo Araki  https://www.drupal.org/u/toshiwo - https://joshideas.com
