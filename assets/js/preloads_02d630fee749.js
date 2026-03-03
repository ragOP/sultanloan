
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.BGEdQoKJ.js","/cdn/shopifycloud/checkout-web/assets/c1/app.BUguTjvD.js","/cdn/shopifycloud/checkout-web/assets/c1/vendor.D2mbghyn.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.DTG4tKOP.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage.BS2tnNPv.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons.D8forYmZ.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalPickup.C_LRLhqR.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.B-aHm9j5.js","/cdn/shopifycloud/checkout-web/assets/c1/VaultedPayment.BE7YeJLF.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer.BzsnjwKw.js","/cdn/shopifycloud/checkout-web/assets/c1/PickupPointCarrierLogo.DyjiqTqK.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks.BhnzGvMh.js","/cdn/shopifycloud/checkout-web/assets/c1/AddDiscountButton.D6JE_46m.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText.d9sb_4I_.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer.CcxhyU2o.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary.DeUNz2gT.js","/cdn/shopifycloud/checkout-web/assets/c1/OrderEditVaultedDelivery.tWAMTyvg.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice.C3yNKxbq.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblemsLineItemList.DBSjX4_w.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayErrorBanner.MA8ROpX6.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPaySessionTokenStorage.BlrIlFLb.js","/cdn/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch.7wdZsEh-.js","/cdn/shopifycloud/checkout-web/assets/c1/useSubscribeMessenger.M068nqVX.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-js-index.DFic6x5y.js","/cdn/shopifycloud/checkout-web/assets/c1/v4.BKrj-4V8.js","/cdn/shopifycloud/checkout-web/assets/c1/monorail.Dz7CjhhO.js","/cdn/shopifycloud/checkout-web/assets/c1/DutyOptions.C5l3Rc21.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.DDd1YVmf.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.B74dKq4t.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.DiXxRjkL.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.C5cOHKN5.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalPickup.6gWii3xb.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AddDiscountButton.CZ33y7Va.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.7lB-c-sA.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShopPayVerificationSwitch.WW3cs_z5.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.BrcQzLuH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DutyOptions.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/VaultedPayment.OxMVm7u-.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PickupPointCarrierLogo.DuZuWHqZ.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0682/5079/6200/files/Screenshot_2024-11-25_at_4.30.06_PM-removebg-preview-2_x320.png?v=1732532456"];

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
  