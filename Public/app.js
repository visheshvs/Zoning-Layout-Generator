const upload = document.getElementById('upload');
const canvas = new fabric.Canvas('pdf-render', {
  isDrawingMode: true
});

upload.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file.type !== 'application/pdf') {
    alert('Please upload a PDF file.');
    return;
  }
  // Function to read and render PDF
  renderPDF(file);
});

function renderPDF(file) {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const typedarray = new Uint8Array(this.result);
    const loadingTask = pdfjsLib.getDocument({ data: typedarray });
    loadingTask.promise.then(function(pdf) {
      console.log('PDF loaded');
      
      // Fetch the first page
      pdf.getPage(1).then(function(page) {
        console.log('Page loaded');
        
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });
        const canvasEl = document.getElementById('pdf-render');
        canvasEl.height = viewport.height;
        canvasEl.width = viewport.width;
        
        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        };
        const renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log('Page rendered');
        });
      });
    }, function (reason) {
      console.error(reason);
    });
  };
  fileReader.readAsArrayBuffer(file);
}

// Add event listener for export button
document.getElementById('export').addEventListener('click', function() {
  // Function to export PDF with annotations
});