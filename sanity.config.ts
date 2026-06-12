import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { blogPostSchema } from "./src/sanity/schemas/blogPost";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  title: "LuraLoop Blog Studio",
  schema: {
    types: [blogPostSchema],
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("LuraLoop Content")
          .items([
            S.listItem()
              .title("Blog Posts")
              .child(S.documentTypeList("blogPost").title("Blog Posts")),
          ]),
    }),
    visionTool(), // GROQ query playground
  ],
});
