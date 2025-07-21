'use client';
import { Margin, usePDF } from "react-to-pdf";
import PrimaryButton from "./common/PrimaryButton";
export default function ExportPDF({targetRef}:{targetRef:React.RefObject<HTMLDivElement>}){
   const {toPDF} = usePDF({
    filename:'ai-resume-analysis.pdf',
    page : {margin:20}
   })

   return(
     <PrimaryButton className="outline">
        Export PDF
     </PrimaryButton>
   )
}