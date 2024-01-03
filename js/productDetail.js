const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id, "id");
let apiData = null;

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
  } catch (error) {
    console.error(error);
  }
}

getProductDetail();
