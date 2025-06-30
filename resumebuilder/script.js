const fields = [
  'name', 'email', 'career', 'education', 
  'projects', 'certifications', 'skills', 
  'experience', 'languages'
];

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

fields.forEach(field => {
  const input = document.getElementById(field);
  const preview = document.getElementById(`preview${capitalize(field)}`);
  if (input && preview) {
    input.addEventListener('input', () => {
      preview.textContent = input.value;
    });
  }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const resume = document.querySelector('.resume');
  setTimeout(() => {
    html2canvas(resume).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('styled-resume.pdf');
    });
  }, 100);
});

const resumeDiv = document.querySelector('.resume');
const templateButtons = document.querySelectorAll('#templateButtons button');

templateButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.getAttribute('data-template');
    resumeDiv.classList.remove('classic', 'modern', 'minimal');
    resumeDiv.classList.add(selected);
    templateButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

const fontSelect = document.getElementById('fontStyle');
const themeSelect = document.getElementById('themeColor');

if (fontSelect && themeSelect) {
  fontSelect.addEventListener('change', () => {
    resumeDiv.classList.remove('arial', 'georgia', 'courier', 'segoe');
    resumeDiv.classList.add(fontSelect.value);
  });

  themeSelect.addEventListener('change', () => {
    resumeDiv.classList.remove('blue', 'green', 'gray');
    resumeDiv.classList.add(themeSelect.value);
  });
}