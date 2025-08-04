function generatePDF() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const linkedIn = document.querySelector("textarea[name='Linked In Profile']").value;
  const education = document.querySelector("textarea[name='education']").value;
  const technical = document.querySelector("textarea[name='technical']").value;
  const projects = document.querySelector("textarea[name='projects']").value;
  const internship = document.querySelector("textarea[name='internship']").value;
  const certificate = document.querySelector("textarea[name='certificate']").value;

  const photoInput = document.getElementById("photo");
  const file = photoInput.files[0];
  const resumeDiv = document.getElementById("resume-output");

  const buildResumeHTML = (imageSrc = null) => `
    <div id="resume-content" style="text-align: center; font-family: Arial; padding: 20px;">
      ${imageSrc ? `<img src="${imageSrc}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;">` : ''}
      <h2>${name}'s Resume</h2>
      <div style="text-align: left; margin: 0 auto; max-width: 500px;">
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>LinkedIn:</strong> ${linkedIn}</p>
        <p><strong>Education:</strong>${education}</p>
        <p><strong>Technical Skills:</strong>${technical}</p>
        <p><strong>Projects:</strong>${projects}</p>
        <p><strong>Internship:</strong>${internship}</p>
        <p><strong>Certificates:</strong>${certificate}</p>
      </div>
    </div>
  `;

  function downloadResume() {
    const element = document.getElementById("resume-content");
    html2pdf()
      .set({
        margin: 0.5,
        filename: `${name}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      })
      .from(element)
      .save();
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageSrc = e.target.result;
      resumeDiv.innerHTML = buildResumeHTML(imageSrc);
      resumeDiv.style.display = "block";

      requestAnimationFrame(() => {
        requestAnimationFrame(downloadResume);
      });
    };
    reader.readAsDataURL(file);
  } else {
    resumeDiv.innerHTML = buildResumeHTML();
    resumeDiv.style.display = "block";
    requestAnimationFrame(() => {
      requestAnimationFrame(downloadResume);
    });
  }
}