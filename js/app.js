const spinner = document.getElementById("loading-spinner");
const newsContainner = document.getElementById("news-containner");

/* LOAD CATEGORIES */
const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  const container = document.getElementById("category-div-containner");

  data.data.news_category.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className =
      "px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition";
    btn.innerText = cat.category_name;
    btn.onclick = () => loadNews(cat.category_id);
    container.appendChild(btn);
  });
};

/* LOAD NEWS */
const loadNews = async (categoryId) => {
  spinner.classList.remove("hidden");
  newsContainner.innerHTML = "";

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    );
    const data = await res.json();

    if (!data.data.length) {
      newsContainner.innerHTML =
        "<p class='text-center col-span-full text-gray-500'>No news found</p>";
      return;
    }

    data.data.forEach((item) => {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden";

      card.innerHTML = `
        <img src="${item.image_url}" class="w-full h-56 object-cover" />

        <div class="p-6 space-y-4">
          <h3 class="text-xl font-semibold">${item.title}</h3>

          <div class="text-sm text-gray-500">
            ⭐ ${item.rating?.number || 0}
          </div>

          <p class="text-gray-600 text-sm">
            ${item.details.slice(0, 150)}...
          </p>

          <div class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">👁️ ${item.total_view || 0}</span>

            <button
              onclick='showDetails(${JSON.stringify(item)})'
              class="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
            >
              Details
            </button>
          </div>
        </div>
      `;
      newsContainner.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  } finally {
    spinner.classList.add("hidden");
  }
};

/* MODAL */
const showDetails = (item) => {
  document.getElementById("modal-image").src = item.image_url;
  document.getElementById("modal-title").innerText = item.title;
  document.getElementById("modal-details").innerText = item.details;
  document.getElementById("modal-author-img").src =
    item.author?.img || "";
  document.getElementById("modal-author-name").innerText =
    item.author?.name || "Unknown";
  document.getElementById("modal-date").innerText =
    item.author?.published_date || "N/A";

  document.getElementById("news-modal").classList.remove("hidden");
};

const closeModal = () => {
  document.getElementById("news-modal").classList.add("hidden");
};

/* SEARCH */
const handleSearch = () => {
  const value = document.getElementById("search-box").value.trim();
  if (/^\d+$/.test(value)) {
    loadNews(value);
  } else {
    alert("Please enter a numeric category ID");
  }
};

/* INIT */
loadCategory();
loadNews("08");
