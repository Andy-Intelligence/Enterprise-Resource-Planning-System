'use client'
import ProjectCard from "@/components/ProjectCard";
import React from "react";
import { useRouter } from "next/navigation";

const ProjectsComponent = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Projects</div>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <div className="flex justify-between mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={()=>router.push('/projects/create')}>
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
      </div>
    </div>
  );
};

export default ProjectsComponent;
