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

    startConfetti();
});

/* Confetti Animation */
function startConfetti() {
    const confetti = document.getElementById("confetti");
    const ctx = confetti.getContext("2d");
    confetti.width = window.innerWidth;
    confetti.height = window.innerHeight;

    let particles = [];
    const colors = ["#ff4b5c", "#ffc93c", "#6effc6", "#4a90e2"];

    function createParticle() {
        return {
            x: Math.random() * confetti.width,
            y: Math.random() * confetti.height - confetti.height,
            size: Math.random() * 6 + 4,
            speed: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
    }

    function updateParticles() {
        ctx.clearRect(0, 0, confetti.width, confetti.height);
        particles.forEach((p, index) => {
            p.y += p.speed;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            if (p.y > confetti.height) particles[index] = createParticle();
        });
        requestAnimationFrame(updateParticles);
    }

    for (let i = 0; i < 100; i++) particles.push(createParticle());
    updateParticles();
}
