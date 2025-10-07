"use client";

type props ={
   htmlContent : string;
}

export const   ExportPDF =  ({htmlContent} : props) => {
   console.log(htmlContent);
  const handleHTMLContent = async ()=>{
      try {
         const response = await fetch('/api/parse-exportPDF',{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({htmlContent}),
         })

       if(!response.ok){
         throw new Error("Failed to generate pdf");
       }

       const blob = await response.blob();
       const url = URL.createObjectURL(blob);
       const link = document.createElement('a');
       link.href = url;
       link.download = 'tailored_resume.pdf';
       link.click();

       URL.revokeObjectURL(url);
      } catch (error) {
         console.log(error);
         alert('pdf fetch failed')
      }
  }
  return (
    <button className="inline-flex items-center gap-2 rounded-lg  px-5 py-2.5  font-semibold text-red-500  transition hover:text-red-700 cursor-pointer" onClick={handleHTMLContent}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
      <span>Export PDF</span>
    </button>
  );
}
