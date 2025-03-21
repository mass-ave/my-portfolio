function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let pages = [
//   { url: "./", title: "Home" },
//   { url: "./projects", title: "Projects" },
//   { url: "./resume", title: "Resume" },
//   { url: "./contact", title: "Contact" },
//   { url: "https://github.com/mass-ave", title: "GitHub" },
// ];

// let nav = document.createElement("nav");
// document.body.prepend(nav);

// for (let p of pages) {
//   let url = p.url;
//   let title = p.title;
//   if (!url.startsWith("http")) {
//     url = `../${url}`;
//   }
//   let a = document.createElement("a");
//   a.href = url;
//   a.textContent = title;

//   if (a.host === location.host && a.pathname === location.pathname) {
//     a.classList.add("current");
//   }

//   if (a.host !== location.host) {
//     a.target = "_blank";
//   }

//   nav.append(a);
// }

// document.body.insertAdjacentHTML(
//   "afterbegin",
//   `
// 	<label class="color-scheme">
// 		Theme:
// 		<select>
// 			<option value="light dark">Automatic</option>
//             <option value="dark">Dark</option>
//             <option value="light">Light</option>
// 		</select>
// 	</label>`
// );

// let select = document.querySelector("select");

// select.addEventListener("input", function (event) {
//   console.log("color scheme changed to", event.target.value);
//   document.documentElement.style.setProperty(
//     "color-scheme",
//     event.target.value
//   );
//   localStorage.colorScheme = event.target.value;
// });

// if ("colorScheme" in localStorage) {
//   document.documentElement.style.setProperty(
//     "color-scheme",
//     localStorage.colorScheme
//   );
//   select.value = localStorage.colorScheme;
// }
