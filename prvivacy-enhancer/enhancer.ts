import { CreateEnhancer } from ".";

export async function trackData<R extends any = any>(userId: string) {
  const enhancer = new CreateEnhancer(userId);

  type TransportData = {
    userId: string;
  }
}
