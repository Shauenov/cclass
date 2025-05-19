document.addEventListener("DOMContentLoaded", () => {
  const avatarInput = document.getElementById("avatar-upload");
  const uploadBox = document.getElementById("upload-box");
  const avatarError = document.getElementById("avatar-error");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const form = document.getElementById("ticket-form");
  const ticketSection = document.getElementById("ticket-section");
  const ticketName = document.getElementById("ticket-name");
  const ticketEmail = document.getElementById("ticket-email");
  const ticketAvatar = document.getElementById("ticket-avatar");
  const ticketFullname = document.getElementById("ticket-fullname");
  const ticketGithub = document.getElementById("ticket-github");

  let selectedAvatar = null;

  const uploadPreview = document.createElement("img");
  uploadPreview.style.maxWidth = "100px";
  uploadPreview.style.marginTop = "1rem";
  uploadBox.appendChild(uploadPreview);

  uploadBox.addEventListener("click", () => avatarInput.click());

  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];

    if (file && file.size <= 1050 * 1024) {
      selectedAvatar = file;
      avatarError.textContent = "";

      const reader = new FileReader();
      reader.onload = function (e) {
        uploadPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      avatarError.textContent =
        "File too large. Please upload a photo under 1MB.";
      avatarInput.value = "";
      selectedAvatar = null;
      uploadPreview.src = "";
    }
  });

 

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("full-name").value.trim();
    const email = emailInput.value.trim();
    const github = document.getElementById("github").value.trim();

    if (!selectedAvatar) {
      avatarError.textContent = "Please upload a valid avatar image.";
      return;
    }

   

    ticketName.textContent = fullName;
    ticketEmail.textContent = email;
    ticketFullname.textContent = fullName;
    ticketGithub.textContent = github.startsWith("@") ? github : `@${github}`;

    const reader = new FileReader();
    reader.onload = function (event) {
      ticketAvatar.src = event.target.result;
    };
    reader.readAsDataURL(selectedAvatar);

    ticketSection.classList.remove("hidden");
    form.classList.add("hidden");
  });
});
