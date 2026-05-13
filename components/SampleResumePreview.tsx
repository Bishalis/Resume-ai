"use client";

type Props = {
  html: string;
};

export default function SampleResumePreview({ html }: Props) {
  if (!html.trim()) return null;

  return (
    <div
      className="mt-3 max-h-[min(70vh,520px)] overflow-y-auto rounded-lg border border-gray-200 bg-gray-50/80 p-6 text-left shadow-inner"
      aria-label="Sample resume preview"
    >
      <div
        className="text-gray-900 [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-green-800 [&_h2:first-child]:mt-0 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_p]:text-sm [&_p]:leading-relaxed [&_li]:text-sm [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
