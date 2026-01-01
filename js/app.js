// show category on the page

const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await response.json();
  const divContainner = document.getElementById("category-div-containner");
  data.data.news_category.forEach((item) => {
    const div = document.createElement("div");
    div.className =
      "hidden md:flex items-center gap-6 2xl:gap-10 text-sm 2xl:text-base font-medium";
    div.innerHTML = `<button onClick="loadNews('${item.category_id}')"
            class="px-3 py-2 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 transition"
          >
            ${item.category_name}
          </button>`;
    divContainner.appendChild(div);
  });
};

// show news on the page

const loadNews = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );

  const data = await response.json();
  const allData = data.data;
  const newsContainner = document.getElementById("news-containner");
  newsContainner.innerHTML = "";
  allData.forEach((item) => {
    const div = document.createElement("div");
    div.classList =
      "bg-white rounded-3xl shadow hover:shadow-2xl transition overflow-hidden";
    div.innerHTML = `
          <img
            src="${item.image_url}"
            class="w-full h-56 2xl:h-64 object-cover"
          />

          <div class="p-6 2xl:p-8 space-y-4">
            <h3 class="text-xl 2xl:text-2xl font-semibold">
              ${item.title}
            </h3>

            <div class="flex items-center gap-2 text-sm 2xl:text-base">
              <span class="text-yellow-400">${item.rating.badge}</span>
              <span class="text-gray-500">(${item.rating.number})</span>
            </div>

            <p class="text-gray-600 text-sm 2xl:text-base">
              ${item.details.slice(0, 200)}...
            </p>

            <div class="flex items-center gap-4 mt-4">
              <img
                src="${item.author.img}"
                class="w-11 h-11 2xl:w-14 2xl:h-14 rounded-full object-cover"
              />
              <div class="text-sm 2xl:text-base">
                <p class="font-medium">${item.author.name}</p>
                <p class="text-gray-500">Published: ${
                  item.author.published_date
                }</p>
              </div>
            </div>

            <div class="flex items-center justify-between mt-5">
              <div
                class="flex items-center gap-2 text-gray-500 text-sm 2xl:text-base"
              >
                <span>👁️</span>
                <span>${item.total_view}</span>
              </div>

              <button
                class="bg-indigo-600 text-white px-5 py-2.5 2xl:px-7 2xl:py-3 rounded-xl hover:bg-indigo-700 transition text-sm 2xl:text-base"
              >
                Details
              </button>
            </div>
          </div>`;
    newsContainner.appendChild(div);
  });
};

const handleSearch = () => {
  const searchValu = document.getElementById("search-box").value;
  if (!isNaN(searchValu) && searchValu !== "") {
  loadNews(searchValu)
} else {
  alert("please enter a category id which is number");
}
};

// funtion call center
loadCategory();
loadNews("08");
