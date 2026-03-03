
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.D-3tW6RD.js","/cdn/shopifycloud/checkout-web/assets/c1/app.CGnqJQgD.js","/cdn/shopifycloud/checkout-web/assets/c1/vendor.C1-HyOcO.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.DTG4tKOP.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage.D0vtAcS5.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice.5hryeodj.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalPickup.C9Kd44wH.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.CXhOJyNX.js","/cdn/shopifycloud/checkout-web/assets/c1/colorContrast.YvsjW0pk.js","/cdn/shopifycloud/checkout-web/assets/c1/VaultedPayment.C1yRENt-.js","/cdn/shopifycloud/checkout-web/assets/c1/PickupPointCarrierLogo.AzOpYnX2.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks.D8OaJ91F.js","/cdn/shopifycloud/checkout-web/assets/c1/AddDiscountButton.Bsd_rd3Q.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText.DTfsMkrn.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer.fv1B1H4T.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary.fGhpzU7r.js","/cdn/shopifycloud/checkout-web/assets/c1/OrderEditVaultedDelivery.CoulGmKv.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblemsLineItemList.0d9N-Oar.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayErrorBanner.CbvHDhpj.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayQuery.DHOV1dIp.js","/cdn/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch.C3tImP8T.js","/cdn/shopifycloud/checkout-web/assets/c1/useSubscribeMessenger.CtAoyevg.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-js-index.CzBT_Jia.js","/cdn/shopifycloud/checkout-web/assets/c1/v4.BKrj-4V8.js","/cdn/shopifycloud/checkout-web/assets/c1/monorail.Bc9FzRfc.js","/cdn/shopifycloud/checkout-web/assets/c1/DutyOptions.CqXeS3Dq.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.Bi789Gwa.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.JXOa9QLj.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension.6V77gkUw.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions.CU9ZjjYr.js","/cdn/shopifycloud/checkout-web/assets/c1/rendering-extension-targets.BsfmleGR.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner.C4AC7aGo.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.xPqZ6QD6.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.C5cOHKN5.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalPickup.6gWii3xb.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AddDiscountButton.CZ33y7Va.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.7lB-c-sA.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShopPayVerificationSwitch.WW3cs_z5.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.BrcQzLuH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DutyOptions.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/VaultedPayment.OxMVm7u-.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PickupPointCarrierLogo.DuZuWHqZ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RuntimeExtension.DWkDBM73.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AnnouncementRuntimeExtensions.V0VYEO4K.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0738/4645/6536/files/Copy_of_Aurivo-US-Trust__1_-removebg_x320.png?v=1759019094"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [cdnOrigin].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  