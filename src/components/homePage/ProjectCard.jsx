const ProjectCard = ({ project, index, isActive }) => {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
        isActive ? "opacity-100" : "opacity-90 hover:opacity-95"
      } h-[77vh] max-h-[720px] min-h-[500px] flex flex-col group bg-gray-900 border border-gray-700 hover:border-indigo-500/30 shadow-lg hover:shadow-indigo-500/10`}
    >
      {/* Image container with responsive height */}
      <div className="relative h-[40%] min-h-[200px] max-h-[300px] overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Content container with flexible height */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 flex-1 flex flex-col bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div>
            <div className="uppercase tracking-wider text-xs font-semibold mb-1 text-indigo-400">
              Project {index + 1}
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-indigo-100 transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="text-xs px-2 sm:px-3 py-1 rounded-full bg-indigo-900/30 text-indigo-300">
            Featured
          </div>
        </div>

        <p className="mb-4 sm:mb-6 flex-1 text-sm sm:text-base text-gray-300 group-hover:text-gray-100 transition-colors">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-indigo-300 hover:bg-indigo-900/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
          <a
            href={project.link}
            target="_blank"
            className="flex-1 text-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View Project
          </a>
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
      )}
    </div>
  );
};

export default ProjectCard;
