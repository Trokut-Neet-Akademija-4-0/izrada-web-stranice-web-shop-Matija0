let apiData = null;
let test = false;
async function getAllProducts() {
  const url =
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=men_all&concepts=H%26M%20MAN";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "12f7d92fcdmshb29dc70d54946e3p182334jsnd9a69db0fb7a",
      "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    apiData = result;
    return result;
  } catch (error) {
    console.error(error);
  }
}

const formEl = document.getElementById("form_el");

async function handleSubmit(event) {
  test = true;
  event.preventDefault();
  const checkedRadioButton = document.querySelector(
    'input[name="sort"]:checked'
  );

  const checkedValue = checkedRadioButton ? checkedRadioButton.value : null;

  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=men_all&sortBy=${checkedValue}&concepts=H%26M%20MAN`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "12f7d92fcdmshb29dc70d54946e3p182334jsnd9a69db0fb7a",
      "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    apiData = result;
    const container = document.getElementById("products_grid");
    container.innerHTML = "";
    apiData.results.map((item) => {
      const productComponent = createProductComponent(item);
      container.appendChild(productComponent);
    });
  } catch (error) {
    console.error(error);
  }
}

formEl.addEventListener("submit", handleSubmit);

function createProductComponent(item) {
  // Create a div for the product
  const productDiv = document.createElement("div");
  productDiv.className = "grid_el";

  const link = document.createElement("a");
  link.className = "link_wrapper";
  link.href = `product-detail.html?id=${item.defaultArticle.code}`;
  link.target = "_blank";

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper2";

  const priceTitleWrapper = document.createElement("div");
  priceTitleWrapper.className = "price_title_wrapper";

  // Create an img element for the product image
  const img = document.createElement("img");
  img.src = item.images[0].url;
  img.className = "product_img";
  productDiv.appendChild(img);

  // Create a h2 element for the product title
  const title = document.createElement("h2");
  title.textContent = item.name;
  title.className = "product_title";
  link.appendChild(title);
  priceTitleWrapper.appendChild(link);
  wrapper.appendChild(priceTitleWrapper);

  // Create a p element for the product price
  const price = document.createElement("p");
  price.textContent = item.price.formattedValue;
  price.className = "product_price";
  priceTitleWrapper.appendChild(price);
  wrapper.appendChild(priceTitleWrapper);

  //Create a button for the product
  const button = document.createElement("button");
  button.className = "product_button";
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
</svg>`;
  wrapper.appendChild(button);

  productDiv.appendChild(wrapper);
  productDiv.appendChild(wrapper);

  return productDiv;
}

document.addEventListener("DOMContentLoaded", async function () {
  await getAllProducts();
  const container = document.getElementById("products_grid");
  apiData.results.map((item) => {
    const productComponent = createProductComponent(item);
    container.appendChild(productComponent);
  });
});
