document.addEventListener("DOMContentLoaded", () => {
    const blogContainer = document.getElementById("blog-container");

    fetch("posts.json")
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.classList.add("blog-post");
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p class="meta">By ${post.author} | ${post.date}</p>
                    <p>${post.content}</p>
                `;
                blogContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error("Error loading posts:", error));
});
