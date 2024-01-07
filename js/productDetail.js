const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let apiData = null;
let color = null;

const prod_img1 = document.getElementById("prod_img1");
const prod_img2 = document.getElementById("prod_img2");
const prod_img3 = document.getElementById("prod_img3");
const prod_img4 = document.getElementById("prod_img4");
const prod_title = document.getElementById("prod_title");
const prod_price = document.getElementById("prod_price");
const prod_description = document.getElementById("prod_desc");
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const color4 = document.getElementById("color4");

async function getProductDetail() {
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=${id}`;
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
    document.querySelector("title").textContent = apiData.product.name;
    prod_img1.src = apiData.product.articlesList[0].galleryDetails[0].baseUrl;
    prod_img2.src = apiData.product.articlesList[1].galleryDetails[0].baseUrl;
    prod_img3.src = apiData.product.articlesList[2].galleryDetails[0].baseUrl;
    prod_img4.src = apiData.product.articlesList[3].galleryDetails[0].baseUrl;
    prod_title.innerHTML = apiData.product.name;
    prod_price.innerHTML = `$${apiData.product.whitePrice.price}`;
    prod_description.innerHTML = apiData.product.description;
    color1.style.backgroundColor =
      apiData.product.articlesList[0].color.rgbColor;
    color2.style.backgroundColor =
      apiData.product.articlesList[1].color.rgbColor;
    color3.style.backgroundColor =
      apiData.product.articlesList[2].color.rgbColor;
    color4.style.backgroundColor =
      apiData.product.articlesList[3].color.rgbColor;
  } catch (error) {
    console.error(error);
  }
}

getProductDetail();
