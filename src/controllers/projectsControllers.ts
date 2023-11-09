import { Response, NextFunction } from "express";
import { RequestError } from "../helpers/RequestError";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
} from "../types/request";

import mongoose from "mongoose";
import { SortType } from "../types/sortType";
import { ProjectData } from "../types/projects";
import {
  addProject,
  getAllProjects,
  getProjectById,
} from "../services/projectsService";
import { UploadedFile } from "express-fileupload";
import { validateImage } from "../helpers/validateImage";

export const getAllProjectsController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const data = await getAllProjects();
  const { projects, total } = data;

  res.status(200).json({ projects, total });
};

export const getProjectByIdController = async (
  req: RequestWithParams<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw RequestError(404, "Not found");
  }

  const project = await getProjectById(req.params.id);

  if (!project) {
    throw RequestError(404, "Not found");
  }

  res.json(project);
};

export const addProjectController = async (
  req: RequestWithBody<ProjectData>,
  res: Response,
  next: NextFunction
) => {
  const { title, link, source_link, description, technologies } = req.body;

  //if you don't add poster file you will get an error because it cannot read data in posterFile
  //handle this error, like, add an image for your project please
  const posterFile = req.files?.poster as UploadedFile;

  validateImage(posterFile);

  const poster = "data:image/jpeg;base64," + posterFile.data.toString("base64");

  const project = await addProject({
    title,
    link,
    poster,
    source_link,
    description,
    technologies,
  });

  if (!project) {
    throw RequestError(400, "Cannot add a project");
  }

  res.status(201).json(project);
};
