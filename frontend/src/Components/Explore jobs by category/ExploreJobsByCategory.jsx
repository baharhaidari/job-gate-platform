// import { FaCode, FaPaintBrush, FaHammer } from "react-icons/fa";

// export default function ExploreJobsByCategory() {
//   const categories = [
//     {
//       icon: <FaCode />,
//       name: "Software Development",
//       jobs: "1200 Available Jobs",
//       skills: "JavaScript, Python, React, Node.js",
//     },
//     {
//       icon: <FaPaintBrush />,
//       name: "Design",
//       jobs: "800 Available Jobs",
//       skills: "Photoshop, Illustrator, Figma",
//     },
//     {
//       icon: <FaHammer />,
//       name: "Construction",
//       jobs: "500 Available Jobs",
//       skills: "Carpentry, Electrical, Plumbing",
//     },
//     {
//       icon: <FaCode />,
//       name: "Software Development",
//       jobs: "1200 Available Jobs",
//       skills: "JavaScript, Python, React, Node.js",
//     },
//     {
//       icon: <FaPaintBrush />,
//       name: "Design",
//       jobs: "800 Available Jobs",
//       skills: "Photoshop, Illustrator, Figma",
//     },
//     {
//       icon: <FaCode />,
//       name: "Software Development",
//       jobs: "1200 Available Jobs",
//       skills: "JavaScript, Python, React, Node.js",
//     },
//     {
//       icon: <FaPaintBrush />,
//       name: "Design",
//       jobs: "800 Available Jobs",
//       skills: "Photoshop, Illustrator, Figma",
//     },
//     {
//       icon: <FaHammer />,
//       name: "Construction",
//       jobs: "500 Available Jobs",
//       skills: "Carpentry, Electrical, Plumbing",
//     },
//   ];

//   return (
//     <section className="flex flex-col items-center justify-center gap-14 py-20">
//       <h1 className="text-5xl font-semibold capitalize text-slate-800">
//         Find jobs by <span className="text-green-700">category</span>
//       </h1>

//       <div className="grid grid-cols-4 items-center justify-center gap-4 w-full">
//         {categories.map((category, index) => (
//           <div key={index}>
//             <div className="bg-slate-200 p-6 rounded-lg shadow-md  flex flex-col items-center hover:shadow-lg transition-shadow duration-300 ease-in-out">
//               <div className="text-4xl rounded-full text-slate-200 bg-green-700 p-4 mb-4">
//                 {category.icon}
//               </div>
//               <h2 className="text-xl font-medium text-slate-800 mb-2">
//                 {category.name}
//               </h2>
//               <p className="text-green-700 font-medium mb-2 text-base">
//                 {category.jobs}
//               </p>
//               <p className="text-slate-600 text-sm">{category.skills}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { FaCode, FaPaintBrush, FaHammer, FaPlus } from "react-icons/fa";

export default function ExploreJobsByCategory() {
  const categories = [
    {
      icon: <FaCode />,
      name1: "Design",
      name2: "& Development",
      jobs: "1200 Available Jobs",
      skills: "JavaScript, Python, React, .js",
    },
    {
      icon: <FaPaintBrush />,
      name1: "Customer Marketing",
      name2: "& Sales",
      jobs: "800 Available Jobs",
      skills: "Photoshop, Illustrator, Figma",
    },
    {
      icon: <FaPaintBrush />,
      name1: "Bussines",
      name2: "& Marketing",
      jobs: "500 Available Jobs",
      skills: "Carpentry, Electrical, Plumbing",
    },
    {
      icon: <FaCode />,
      name1: "Bussiness",
      name2: "& Development",
      jobs: "1200 Available Jobs",
      skills: "JavaScript, Python, React",
    },
    {
      icon: <FaPaintBrush />,
      name1: "Programming",
      name2: "& Code",
      jobs: "800 Available Jobs",
      skills: "Photoshop, Illustrator, Figma",
    },
    {
      icon: <FaCode />,
      name1: "Art",
      name2: "& Animation",
      jobs: "500 Available Jobs",
      skills: "Carpentry, Electrical, Plumbing",
    },
    {
      icon: <FaCode />,
      name1: "Video Edition",
      name2: "& 3D work",
      jobs: "1200 Available Jobs",
      skills: "JavaScript, Python, React",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-14 py-20">
      <h1 className="heading text-slate-700 font-semibold capitalize">
        jobs by <span className="text-green-700">category</span>
      </h1>

      <div className="grid grid-cols-4 gap-4 items-center justify-center w-full">
        {categories.slice(0, 7).map((category, index) => (
          <div key={index} className="h-full">
            <div className="border-2 border-slate-200 p-7 h-full rounded-lg flex flex-col items-center transition-shadow duration-300 ease-in-out">
              <div className="text-4xl h-full rounded-full text-white bg-slate-400 p-4 mb-4">
                {category.icon}
              </div>
              <h2 className="text-xl text-center font-medium text-slate-800 mb-2">
                {category.name1}
                <span className="block">{category.name2}</span>
              </h2>
              <p className="text-green-700 font-medium mb-2 text-base">
                {category.jobs}
              </p>
              <p className="text-slate-600">{category.skills}</p>
            </div>
          </div>
        ))}

        {/* Show More Box */}
        <div className="">
          <div className="bg-green-700 hover:bg-green-800 p-6 w-60 h-48 mx-auto rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
            <div className="text-4xl text-white mb-6">
              <FaPlus />
            </div>
            <h2 className="text-xl font-medium text-white mb-2 uppercase tracking-wide">
              Show More
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
