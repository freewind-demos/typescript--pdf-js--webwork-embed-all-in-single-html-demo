import pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';
import {PDFDocumentProxy} from 'pdfjs-dist';
import './node_modules/pdfjs-dist/web/pdf_viewer.css';

const {PDFViewer} = require('pdfjs-dist/web/pdf_viewer.js');

function renderInViewer(pdfDocument: PDFDocumentProxy) {
  // we can render the pdf document page by page and give a small wait time
  // between them, to give some time for the browser to handle events
  // see another demo: typescript--pdf-js--disable-worker-demo
  const pdfViewer = new PDFViewer({
    container: document.getElementById('viewerContainer'),
  });

  pdfViewer.setDocument(pdfDocument);
}


async function loadPdf() {
  // Notice: this method will freeze browser when the pdf file is big
  (pdfjs as any).GlobalWorkerOptions.workerSrc = 'no-worker-can-provided';
  const pdf = await pdfjs.getDocument('/sample.pdf').promise
  renderInViewer(pdf);
}

loadPdf();
