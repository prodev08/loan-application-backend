import { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "../routes";
import { APIError } from "../utils";

export default function configureApp(app: Express): void {
  // API routes
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use("/api", routes);

  // Handle Not Found
  app.use("/api/*", (req: Request, res: Response) => {
    const errorMessage = `Endpoint ${req.method?.toUpperCase()} ${
      req.baseUrl
    }${req.path.slice(0, -1)} NOT FOUND!`;
    res.status(404).json(errorMessage);
  });

  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof APIError) {
      return res.status(err.status).json(err.jsonify());
    }
    return next(err);
  });

  app.use(
    async (_err: Error, _req: Request, res: Response, _next: NextFunction) => {
      return res.status(500).json({
        name: "Server Error",
        status: 500,
        statusText: "Internal Server Error",
        message: "Something went wrong!",
      });
    }
  );
}
