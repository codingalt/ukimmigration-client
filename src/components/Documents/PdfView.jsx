import React from 'react'
import { PDFViewer } from "@react-pdf/renderer";
import PDF from './PDF';

const PdfView = () => {
  return (
    <PDFViewer>
      <PDF />
    </PDFViewer>
  );
}

export default PdfView