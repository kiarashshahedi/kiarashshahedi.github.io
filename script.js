// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, onValue, push, update, increment } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Firebase configuration (use your actual credentials)
const firebaseConfig = {
    apiKey: "AIzaSyA02GTMGPHPvT1QcsvtYE2HslYRrl8y9ks",
    authDomain: "kiarashshahedi-github-io.firebaseapp.com",
    projectId: "kiarashshahedi-github-io",
    storageBucket: "kiarashshahedi-github-io.appspot.com",
    messagingSenderId: "545043533329",
    appId: "1:545043533329:web:db4dd1ad59d752d314abb0",
    measurementId: "G-WK4NFPY3GY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Page View Counter
const pageViewsRef = ref(db, 'pageViews');

// Increment page views when the page is loaded
update(pageViewsRef, {
    count: increment(1)
});

// Display updated page views in the HTML
onValue(pageViewsRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.count) {
        document.getElementById('viewCount').innerText = data.count;
    }
});

// Submit Review
document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('reviewName').value;
    const review = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;

    // Reference for reviews in the database
    const reviewsRef = ref(db, 'reviews');

    // Push the review to the database
    push(reviewsRef, {
        name: name,
        review: review,
        rating: rating,
        timestamp: new Date().toISOString()
    }).then(() => {
        alert('Review submitted!');
        document.getElementById('reviewForm').reset();
    });
});

// Display Reviews
const reviewsContainer = document.getElementById('reviewsContainer');
const reviewsRef = ref(db, 'reviews');

// Fetch reviews from the database and display them
onValue(reviewsRef, (snapshot) => {
    reviewsContainer.innerHTML = ''; // Clear the existing reviews
    snapshot.forEach((reviewSnapshot) => {
        const review = reviewSnapshot.val();
        const reviewElement = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${review.name}</h5>
                    <p class="card-text">${review.review}</p>
                    <p class="card-text">Rating: ${review.rating}/5</p>
                    <small class="text-muted">${new Date(review.timestamp).toLocaleString()}</small>
                </div>
            </div>
        `;
        reviewsContainer.innerHTML += reviewElement;
    });
});
