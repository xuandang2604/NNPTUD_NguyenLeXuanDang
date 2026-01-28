function renderCard(questionNumber, title, content, isCode = false) {
  const container = document.getElementById("output-container");
  let contentHtml = "";

  if (isCode) {
    const formattedJSON = JSON.stringify(content, null, 2);
    contentHtml = `<pre>${formattedJSON}</pre>`;
  } else {
    contentHtml = `<div class="text-result">${content}</div>`;
  }

  let headerColor = "";
  if (questionNumber <= 3)
    headerColor = "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)";
  else if (questionNumber <= 6)
    headerColor = "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)";
  else if (questionNumber <= 9)
    headerColor = "linear-gradient(to right, #fa709a 0%, #fee140 100%)";
  else headerColor = "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)";

  const html = `
            <div class="result-card" style="animation-delay: ${questionNumber * 0.1}s">
                <div class="card-header" style="background: ${headerColor}; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
                    <span class="question-label">CÂU ${questionNumber}</span>
                    <span class="badge">Done</span>
                </div>
                <div class="card-body">
                    <span class="question-title">${title}</span>
                    ${contentHtml}
                </div>
            </div>
        `;
  container.innerHTML += html;
}

// CÂU 1
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.category = category;
  this.isAvailable = isAvailable;
}
renderCard(
  1,
  "Khai báo Constructor Function",
  "✅ Đã khai báo function Product(id, name, ...) thành công.",
);

// CÂU 2
const products = [
  new Product(1, "Laptop Dell XPS", 35000000, 10, "Electronics", true),
  new Product(2, "iPhone 15 Pro", 28000000, 5, "Electronics", true),
  new Product(3, "Chuột Logitech", 500000, 0, "Accessories", false),
  new Product(4, "Bàn phím cơ", 1500000, 20, "Accessories", true),
  new Product(5, "Tai nghe Sony", 3000000, 15, "Accessories", true),
  new Product(6, "Samsung TV 4K", 12000000, 3, "Electronics", false),
  new Product(7, "Macbook Pro M3", 45000000, 2, "Electronics", true),
];
renderCard(2, "Khởi tạo mảng Products (Database)", products, true);

// CÂU 3
const nameAndPrice = products.map((product) => {
  return { name: product.name, price: product.price };
});
renderCard(3, "Map: Lấy mảng chỉ chứa Name & Price", nameAndPrice, true);

// CÂU 4
const inStockProducts = products.filter((product) => product.quantity > 0);
renderCard(
  4,
  "Filter: Sản phẩm còn hàng (Quantity > 0)",
  inStockProducts,
  true,
);

// CÂU 5
const hasExpensiveProduct = products.some(
  (product) => product.price > 30000000,
);
const msg5 = hasExpensiveProduct
  ? "<span class='status-box highlight-true'>✅ CÓ</span> sản phẩm giá trên 30 triệu"
  : "<span class='status-box highlight-false'>❌ KHÔNG CÓ</span> sản phẩm nào";
renderCard(5, "Some: Kiểm tra giá > 30.000.000", msg5);

// CÂU 6
const accessories = products.filter((p) => p.category === "Accessories");
const allAccessoriesAvailable = accessories.every(
  (p) => p.isAvailable === true,
);
const msg6 = allAccessoriesAvailable
  ? "<span class='status-box highlight-true'>✅ ĐÚNG</span> (Tất cả phụ kiện đang bán)"
  : "<span class='status-box highlight-false'>❌ SAI</span> (Có phụ kiện đã ngừng bán)";
renderCard(6, "Every: Kiểm tra tất cả Accessories đang bán", msg6);

// CÂU 7
const totalInventoryValue = products.reduce((total, product) => {
  return total + product.price * product.quantity;
}, 0);
const formattedTotal = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
}).format(totalInventoryValue);
renderCard(
  7,
  "Reduce: Tổng giá trị kho hàng",
  `<span class="money">${formattedTotal}</span>`,
);

// CÂU 8
let content8 = "<ul class='simple-list'>";
for (const p of products) {
  const status = p.isAvailable
    ? "<span style='color:green'>● Đang bán</span>"
    : "<span style='color:red'>● Ngừng bán</span>";
  content8 += `<li><b>${p.name}</b> <span style='color:#999'>(${p.category})</span> - ${status}</li>`;
}
content8 += "</ul>";
renderCard(8, "Loop: Duyệt mảng (for...of)", content8);

// CÂU 9
const firstProduct = products[0];
let content9 = "<ul class='simple-list'>";
for (const key in firstProduct) {
  content9 += `<li><b style='color:#6c5ce7'>${key}</b>: ${firstProduct[key]}</li>`;
}
content9 += "</ul>";
renderCard(9, "Loop: Duyệt thuộc tính SP đầu tiên (for...in)", content9);

// CÂU 10
const productsSellingAndInStock = products
  .filter((p) => p.isAvailable === true && p.quantity > 0)
  .map((p) => p.name);
renderCard(
  10,
  "Chaining: TÊN các SP đang bán & còn hàng",
  productsSellingAndInStock,
  true,
);
