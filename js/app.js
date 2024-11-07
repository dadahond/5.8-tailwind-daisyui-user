const form = document.querySelector("form");
const template = document.querySelector("template");
const tbody = document.querySelector("tbody");

let users = JSON.parse(localStorage.getItem("users")) || [];

const counter = document.querySelector(".counter");
counter.textContent = users.length;

const makeUsers = () => {
  tbody.innerHTML = "";
  users.forEach((user) => {
    const clone = template.content.cloneNode(true);
    const avatarImage = clone.querySelector(".avatar-image");
    const userName = clone.querySelector(".user-name");
    const country = clone.querySelector(".country");
    const bio = clone.querySelector(".bio");
    const deleteBtn = clone.querySelector(".delete-btn");
    deleteBtn.setAttribute("onclick", `deleteItem(${user.id})`);

    avatarImage.src = `https://picsum.photos/400?random=${Math.trunc(
      Math.random() * 1000
    )}`;
    userName.textContent = user.firstName;
    country.textContent = user.country;
    bio.textContent = `${user.bio.slice(0, 60)}...`;
    tbody.appendChild(clone);
  });
  counter.textContent = users.length;
};

const deleteItem = (e) => {
  const filteredUsers = users.filter((user) => user.id !== e);
  users = filteredUsers;
  makeUsers();
  localStorage.setItem("users", JSON.stringify(users));
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = form.firstName.value.trim();
  const country = form.country.value.trim();
  const bio = form.bio.value.trim();

  if (!firstName || !country || !bio) {
    alert("Please, all fields");
    return;
  }
  users.push({ id: Math.random(), firstName, country, bio });
  makeUsers();
  localStorage.setItem("users", JSON.stringify(users));
  form.reset();
});
if (users.length) {
  makeUsers();
}
