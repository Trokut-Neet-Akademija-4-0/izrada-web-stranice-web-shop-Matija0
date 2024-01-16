document.addEventListener("DOMContentLoaded", function () {
  function adjustIframeHeight(iframe) {
    iframe.onload = function () {
      var frameContent =
        iframe.contentDocument || iframe.contentWindow.document;
      var object = frameContent.querySelector("object");
      var frameBody = frameContent.querySelector("body");
      var height = object.offsetHeight;
      frameBody.style.margin = 0;
      iframe.style.height = height + "px";
    };
  }
  var iframes = document.querySelectorAll(".auto-height-iframe");
  iframes.forEach(adjustIframeHeight);
});

let data;

async function getData() {
  const url =
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=men_all&sortBy=newProduct&concepts=H%26M%20MAN";
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
    return result;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const firstImage = document.getElementById("first_image");
  const secondImage = document.getElementById("second_image");
  const thirdImage = document.getElementById("third_image");
  const fourthImage = document.getElementById("fourth_image");
  const price1 = document.getElementById("price1");
  const price2 = document.getElementById("price2");
  const price3 = document.getElementById("price3");
  const price4 = document.getElementById("price4");
  function myFunction(result) {
    firstImage.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), rgba(29,30,31,100)), url(${result.results[0].images[0].url})`;
    firstImage.style.backgroundSize = "cover";
    firstImage.style.backgroundPosition = "center";
    firstImage.style.backgroundRepeat = "no-repeat";
    secondImage.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), rgba(29,30,31,100)), url(${result.results[1].images[0].url})`;
    secondImage.style.backgroundSize = "cover";
    secondImage.style.backgroundPosition = "center";
    secondImage.style.backgroundRepeat = "no-repeat";
    thirdImage.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), rgba(29,30,31,100)), url(${result.results[6].images[0].url})`;
    thirdImage.style.backgroundSize = "cover";
    thirdImage.style.backgroundPosition = "center";
    thirdImage.style.backgroundRepeat = "no-repeat";
    fourthImage.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), rgba(29,30,31,100)), url(${result.results[3].images[0].url})`;
    fourthImage.style.backgroundSize = "cover";
    fourthImage.style.backgroundPosition = "center";
    fourthImage.style.backgroundRepeat = "no-repeat";

    price1.innerHTML = result.results[0].price.formattedValue;
    price2.innerHTML = result.results[1].price.formattedValue;
    price3.innerHTML = result.results[6].price.formattedValue;
    price4.innerHTML = result.results[3].price.formattedValue;
  }

  const result = await getData();
  myFunction(result);
});

let icon = {
  success: '<span class="success_icon"></span>',
};

const showToast = (
  message = "Sample Message",
  toastType = "info",
  duration = 5000
) => {
  if (!Object.keys(icon).includes(toastType)) toastType = "info";

  let box = document.createElement("div");
  box.classList.add("toast", `toast-${toastType}`);
  box.innerHTML = ` <div class="toast-content-wrapper"> 
                    <div class="toast-icon"> 
                    ${icon[toastType]} 
                    </div> 
                    <div class="toast-message">${message}</div> 
                    <div class="toast-progress"></div> 
                    </div>`;
  duration = duration || 5000;
  box.querySelector(".toast-progress").style.animationDuration = `${
    duration / 1000
  }s`;

  let toastAlready = document.body.querySelector(".toast");
  if (toastAlready) {
    toastAlready.remove();
  }

  document.body.appendChild(box);
};

let submit = document.getElementById("submit_btn");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  showToast("Order Submitted Successfully", "success", 5000);

  setTimeout(() => {
    window.location.href = "index.html";
  }, 4000);
});
