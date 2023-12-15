document.addEventListener("DOMContentLoaded", function() {
    const postListContainer = document.getElementById("postList");
    const searchInput = document.getElementById("searchInput");
    let posts = [];

    // Fetch data from the API
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(data => {
            posts = data;
            renderPosts(posts);
        });

    // Render posts on the page
    function renderPosts(postsToRender) {
        postListContainer.innerHTML = "";
        postsToRender.forEach(post => {
            const postCard = document.createElement("div");
            postCard.classList.add("postCard");
            postCard.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button onclick="showPostDetails(${post.id})">Details</button>
        <button onclick="showConfirmModal(${post.id})">Delete</button>
      `;
            postListContainer.appendChild(postCard);
        });
    }

    // Search functionality
    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.body.toLowerCase().includes(searchTerm)
        );
        renderPosts(filteredPosts);
    });

    // Show post details modal
    window.showPostDetails = function(postId) {
        const postDetailsModal = document.getElementById("postModal");
        const postDetailsContainer = document.getElementById("postDetails");

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(comments => {
                postDetailsContainer.innerHTML = `<h2>Comments for Post #${postId}</h2>`;
                comments.forEach(comment => {
                    postDetailsContainer.innerHTML += `<p>${comment.body}</p>`;
                });
                postDetailsModal.style.display = "flex";
            });
    };

    // Show confirm delete modal
    window.showConfirmModal = function(postId) {
        const confirmModal = document.getElementById("confirmModal");
        const confirmDeleteButton = document.getElementById("confirmDelete");

        confirmDeleteButton.addEventListener("click", function() {
            // Add logic to delete the post here
            console.log(`Post ${postId} deleted.`);
            closeModal("confirmModal");
        });

        confirmModal.style.display = "flex";
    };

    // Close modal
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
    };
});
