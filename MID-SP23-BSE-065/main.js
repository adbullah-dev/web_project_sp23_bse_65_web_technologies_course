// Handle click events for header buttons
document.getElementById('aboutMeBtn').addEventListener('click', function () {
    document.getElementById('headerDetails').innerHTML = `
        <p>I'm Hafiz Mian Abdullah, a professional MERN stack developer who can build almost all types of websites.</p>`;
});

document.getElementById('contactUsBtn').addEventListener('click', function () {
    document.getElementById('headerDetails').innerHTML = `
        <p>Email: mianabdullah7273@gmail.com <br> Phone: +92 306 8150226</p>`;
});

document.getElementById('addressBtn').addEventListener('click', function () {
    document.getElementById('headerDetails').innerHTML = `
        <p>Address: Sector E, Building No. 87, Quaid Block, Bahria Town</p>`;
});

document.getElementById('educationBtn').addEventListener('click', function () {
    document.getElementById('headerDetails').innerHTML = `
        <p>Education: BS Software Engineering</p>`;
});

document.getElementById('experienceBtn').addEventListener('click', function () {
    document.getElementById('headerDetails').innerHTML = `
        <p>Experience: 4 years experience in front-end, back-end, JS, MERN stack, and related web technologies.</p>`;
});

function toggleProjectDetails(detailsId) {
    const details = document.getElementById(detailsId);
    if (details.style.display === "none") {
        details.style.display = "block"; // Show details
    } else {
        details.style.display = "none"; // Hide details
    }
}
