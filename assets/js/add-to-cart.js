let iframe = document.getElementById("quizellIframe");



// Add To Cart Handler
async function updateCartCount() {
  try {
    if (Shopify.shop == "tlc-direct.myshopify.com") {
      window.themeCore.CartApi.makeRequest(
        window.themeCore.CartApi.actions.UPDATE_CART
      );
    }

    const response = await fetch("/cart.js");
    const data = await response.json();
    const cartCountContainer = document.querySelector(
      ".cart-count-bubble span"
    );
    if (cartCountContainer) {
      cartCountContainer.innerHTML = data.item_count;
    } else {
      const cartIconBubble = document.querySelector("#cart-icon-bubble");
      if (cartIconBubble) {
        const cartBubble = document.createElement("div");
        cartBubble.className = "cart-count-bubble";
        cartBubble.innerHTML = `<span aria-hidden="true">${data.item_count}</span><span class="visually-hidden"> items</span>`;
        cartIconBubble.appendChild(cartBubble);
      }
    }
  } catch (error) {
    console.error("Error updating cart count:", error);
  }
}

async function quizellAddToCartVariants(received, event) {
  if (!received || !received.items || !received.items.length) return;

  let items = received.items.map(function (item) {
    return {
      id: item.variant_id != null ? item.variant_id : item.id,
      quantity: item.quantity != null ? item.quantity : 1,
      properties: { _quizell_recommended: "1" },
    };
  });

  const attributes = {};
  if (received.questionAnswer && received.questionAnswer.length) {
    var attrArray = received.questionAnswer;
    attrArray.forEach((attr) => {
      attributes["_" + attr.name] = attr.value;
    });
  }

  let addData = { items: items, attributes: attributes };

  let cartResponse = {};
  let ok = false;

  try {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/cart/add.js", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      try {
        cartResponse = xhr.responseText ? JSON.parse(xhr.responseText) : {};
      } catch (e) {
        cartResponse = { raw: xhr.responseText };
      }

      ok = xhr.status >= 200 && xhr.status < 300;
      if (ok) {
        updateCartCount();
        CadrtDrawerUpdate(cartResponse);
      } else {
        console.error("Add to cart failed:", xhr.status, xhr.responseText);
      }
      replyToChild(received.quiz_key, ok, cartResponse, undefined, event);
    };

    xhr.onerror = function () {
      replyToChild(received.quiz_key, false, undefined, "Network error", event);
    };

    xhr.send(JSON.stringify(addData));
  } catch (error) {
    console.error("AddToCart error:", error);
    replyToChild(
      received.quiz_key,
      false,
      undefined,
      (error && error.message) || "Unknown error",
      event
    );
  }
}

function replyToChild(quiz_key, ok, cartResponse, error, event) {
  var iframe = document.getElementById("quizellIframe");
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(
    {
      source: "quizell-parent",
      type: "CART_RESULT",
      payload: {
        quiz_key: quiz_key,
        ok: ok,
        cartResponse: cartResponse,
        error: error,
      },
    },
    event.origin
  );
}

async function CadrtDrawerUpdate(cartResponse) {
  /* Prestige 10.6.0 | Impact 6.6.0 | Focal 12.4.0 | Warehouse 6.3.0 | Vision 8.2.0 */
  document.documentElement.dispatchEvent(
    new CustomEvent("cart:refresh", { bubbles: true })
  );
  if (document.querySelector("a[data-action='open-drawer']")) {
    document.querySelector("a[data-action='open-drawer']").click();
  }
  // Prestige 10.6.0 | Impact 6.6.0
  if (document.querySelector('a[aria-controls="cart-drawer"]')) {
    document.querySelector('a[aria-controls="cart-drawer"]').click();
  }
  // Focal 12.4.0 | Warehouse 6.3.0
  if (document.querySelector('a[aria-controls="mini-cart"]')) {
    document.querySelector('a[aria-controls="mini-cart"]').click();
  }
  // Vision 8.2.0
  if (document.querySelector(".thb-secondary-cart")) {
    document.querySelector(".thb-secondary-cart").click();
  }

  /* Enterprise 1.6.2 */
  document.dispatchEvent(
    new CustomEvent("dispatch:cart-drawer:refresh", { bubbles: true })
  );
  document.dispatchEvent(new CustomEvent("dispatch:cart-drawer:open"));

  /* Impulse 7.6.1 | Motion 10.6.1 */
  document.dispatchEvent(new CustomEvent("cart:build"));
  if (document.querySelector(".js-drawer-open-cart")) {
    document.querySelector(".js-drawer-open-cart").click();
  }

  /* Concept 4.0.0 */
  document.dispatchEvent(
    new CustomEvent("cart:refresh", { bubbles: true, detail: { open: true } })
  );

  /* Pipeline 7.5.0 */
  document.dispatchEvent(
    new CustomEvent("theme:cart:change", {
      detail: { cartResponse },
      bubbles: true,
    })
  );
  if (document.querySelector('a[data-drawer-toggle="drawer-cart"]')) {
    document.querySelector('a[data-drawer-toggle="drawer-cart"]').click();
  }

  /* Local 2.6.2 | Combine 2.6.1 */
  if (typeof window.refreshCart === "function") {
    window.refreshCart();
  }

  /* Stiletto 3.3.0 */
  document.dispatchEvent(new CustomEvent("apps:product-added-to-cart"));
  if (document.querySelector('a[aria-label="Open cart modal"]')) {
    document.querySelector('a[aria-label="Open cart modal"]').click();
  }
  //derma client
  if (typeof window.upcartRefreshCart === "function") {
    window.upcartRefreshCart();
    window.upcartOpenCart();
  }

  if (typeof window.refreshCartDrawer === "function") {
    window.refreshCartDrawer();
  }
}

// Handle quiz height adjustment
let rafId = 0;

function handleQuizHeight(height) {
  if (!iframe) throw new Error("iframe not found");

  const h = Number(height);
  if (!Number.isFinite(h)) return;

  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    const clamped = Math.min(Math.max(h, 200), 3000);
    iframe.style.height = clamped + "px";
  });
}

var ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://app.quizell.com",
  "https://demodashboard.quizell.com",
];

// Main message handler
async function handlePostMessage(event) {
  if (!ALLOWED_ORIGINS.includes(event.origin)) return;

  let data = parseMsg(event.data);
  if (!data || data.source !== "quizell" || !data.type) return;

  console.log("from child to parent data passed", data);
  switch (data.type) {
    case "ADD_TO_CART":
    case "ADD_ALL_TO_CART":
      await quizellAddToCartVariants(data.payload, event);
      break;

       case "NAVIGATE": {
  const url = data.payload && data.payload.url;
  if (!url) return;

  // ACK immediately
  const ackSent = sendAck(event, data);
  console.log("[Parent] NAVIGATE from:", event.origin, "ACK:", ackSent);

  // Tip: avoid 'noreferrer' so most browsers return a Window; keep 'noopener'
  const features = "noopener";
  const tab = window.open(url, "_blank", features);

  // If popup blocked, ask child to top-navigate. Do NOT call window.location.assign here.
  if (!tab) {
    const replyPort = event.ports && event.ports[1]; // we will pass a second port from child
    if (replyPort) {
      try { replyPort.postMessage({ type: "FALLBACK_TOP", url }); } catch {}
    } else if (event.source && "postMessage" in event.source) {
      try {
        event.source.postMessage({ source: "quizell", type: "FALLBACK_TOP", url }, event.origin);
      } catch {}
    }
  }
  break;
}

    case "QUIZ_HEIGHT":
      if (data.payload && data.payload.height != null) {
        handleQuizHeight(data.payload.height);
      }
      break;
   case "PING":
      // respond immediately so child knows the bridge exists
    const ackSent = sendAck(event, data);
console.log("[Parent] type:", data.type, "from:", event.origin, "ACK sent:", ackSent);
      break;

    default:
      break;
  }
}

function parseMsg(raw) {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }
  return raw && typeof raw === "object" ? raw : null;
}

function sendAck(event, data) {
  // Prefer MessageChannel ACK
  const port = event.ports && event.ports[0];
  try { port && port.postMessage({ type: "ACK", ok: true }); } catch {}

  // Legacy ACK for children that didn't pass a port but sent a requestId
  if (!port && data && data.requestId && event.source && "postMessage" in event.source) {
    try {
      event.source.postMessage(
        { source: "quizell", type: "ACK", ok: true, requestId: data.requestId },
        event.origin
      );
    } catch {}
  }
}

window.addEventListener("message", handlePostMessage, false);