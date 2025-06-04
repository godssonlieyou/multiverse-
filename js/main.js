
// 使用者管理功能
function addUser(e) {
  e.preventDefault();
  const name = document.getElementById('username').value;
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(name);
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById('username').value = "";
  loadUsers();
}

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const list = document.getElementById("user-list");
  if (!list) return;
  list.innerHTML = "";
  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${user} <button onclick="deleteUser(${index})">刪除</button>`;
    list.appendChild(li);
  });
}

// 黑白名單管理
function addEntry(e) {
  e.preventDefault();
  const name = document.getElementById("entry-name").value;
  const type = document.getElementById("entry-type").value;
  const key = type === "white" ? "whitelist" : "blacklist";
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  list.push(name);
  localStorage.setItem(key, JSON.stringify(list));
  document.getElementById("entry-name").value = "";
  loadLists();
}

function deleteEntry(type, index) {
  const key = type === "white" ? "whitelist" : "blacklist";
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  list.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(list));
  loadLists();
}

function loadLists() {
  ["whitelist", "blacklist"].forEach(type => {
    const list = JSON.parse(localStorage.getItem(type) || "[]");
    const ul = document.getElementById(type);
    if (!ul) return;
    ul.innerHTML = "";
    list.forEach((name, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${name} <button onclick="deleteEntry('${type === "whitelist" ? "white" : "black"}', ${index})">刪除</button>`;
      ul.appendChild(li);
    });
  });
}

// 設定儲存
function saveSettings(e) {
  e.preventDefault();
  const settings = {
    serverName: document.getElementById("server-name")?.value || "",
    maxPlayers: document.getElementById("max-players")?.value || ""
  };
  localStorage.setItem("serverSettings", JSON.stringify(settings));
  alert("設定已儲存！");
}




// 顯示目前會員狀態
function loadMembershipStatus() {
  const status = localStorage.getItem("membership") === "premium" ? "✅ 你是會員。" : "❌ 你目前不是會員。";
  const statusEl = document.getElementById("membership-status");
  if (statusEl) statusEl.textContent = status;
}

// 升級為會員
function upgradeMembership() {
  if (confirm("確定要支付 2.99 美金升級為會員嗎？")) {
    localStorage.setItem("membership", "premium");
    alert("升級成功！你現在是會員。");
    loadMembershipStatus();
  }
}
