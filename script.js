$(document).ready(function() {
    // Scroll animation for sections
    $(window).scroll(function() {
        $('.timeline-item').each(function() {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass('fade-in');
            }
        });
    });
});

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set, push, onValue, update, transaction } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

// Firebase configuration
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
transaction(pageViewsRef, (currentViews) => (currentViews || 0) + 1);

onValue(pageViewsRef, (snapshot) => {
    const views = snapshot.val();
    document.getElementById('viewCount').innerText = views;
});

// Submit Review Form
const form = document.getElementById('reviewForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewName').value;
    const review = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;

    const reviewsRef = ref(db, 'reviews');
    push(reviewsRef, {
        name: name,
        review: review,
        rating: rating,
        timestamp: new Date().toString()
    }).then(() => {
        alert('Review submitted!');
        form.reset();
    });
});

// Display Reviews
const reviewsContainer = document.getElementById('reviewsContainer');
const reviewsRef = ref(db, 'reviews');
onValue(reviewsRef, (snapshot) => {
    reviewsContainer.innerHTML = ''; // Clear previous reviews
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
