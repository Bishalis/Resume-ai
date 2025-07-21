
// const mockResult = {
//     matchScore: 76,
//     missingSkills: ["Docker", "CI/CD", "Leadership"],
//     suggestions: [
//       "Include more detail about your team projects.",
//       "Mention use of tools like Jenkins or GitHub Actions."
//     ]
//   }
  

// // export default function MockResult(resume:string,jobDescription:string){
// //     const keywords = ['React', 'TypeScript', 'Node.js', 'AWS'];
// //     const foundSkills= keywords.filter((word)=> resume.includes(word));
// //     const missingSkills = keywords.filter((word)=> !resume.includes(word));
// //     return{
// //         matchScore: Math.min(20 + (foundSkills.length * 20), 95),
// //         missingSkills,
// //         suggestions: [
// //             `Highlight more ${foundSkills.join(', ')} experience`,
// //             `Consider adding projects using ${missingSkills.join(' or ')}`,
// //             "Tailor your summary to match job requirements"
// //           ],
// //           resumeKeywords: foundSkills,
// //           jobKeywords: keywords.filter(k => jobDescription.includes(k))
// //     }
// // }