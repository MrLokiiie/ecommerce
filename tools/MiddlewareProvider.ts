type MiddlewareApiType<AIK = string, AU = string> = {
  apiIncommingKey: AIK;

  /**
   * Example: apiUrl: "http://localhost:3000/api"
   */
  apiUrl: AU;
}

interface MiddlewareProps<MiddlewareApiTypeIndex extends MiddlewareApiType = MiddlewareApiType> {
  publicRoutes: string[];
  privateRoutes: string[];
  api: MiddlewareApiTypeIndex;
}

async function Middleware({
  publicRoutes,
  privateRoutes,
  api,
}: MiddlewareProps) {
  
}