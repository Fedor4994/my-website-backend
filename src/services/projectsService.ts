import { Project } from "../db/projectModel";
import { ProjectData } from "../types/projects";
import { SortType } from "../types/sortType";

export const getAllProjects = async () => {
  const total = (await Project.find({})).length;

  const projects = await Project.find({});

  return { projects, total };
};

export const getProjectById = async (projectId: string) => {
  const project = await Project.findOne({ _id: projectId });

  if (!project) {
    return false;
  }

  return project;
};

export const addProject = async ({
  link,
  title,
  poster,
  source_link,
  description,
  technologies,
}: ProjectData) => {
  const newProject = new Project({
    link,
    title,
    poster,
    source_link,
    description,
    technologies,
  });

  const project = await newProject.save();

  return project;
};
