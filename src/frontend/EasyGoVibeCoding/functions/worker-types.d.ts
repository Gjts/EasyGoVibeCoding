interface KVNamespace {
  get(key: string): Promise<string | null>
  get(key: string, options: { type: "text" }): Promise<string | null>
  get<T = unknown>(key: string, options: { type: "json" }): Promise<T | null>
  get(
    key: string,
    options: { type: "arrayBuffer" },
  ): Promise<ArrayBuffer | null>
  get(key: string, options: { type: "stream" }): Promise<ReadableStream | null>
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>
  delete(key: string): Promise<void>
}

interface AnalyticsEngineDataset {
  writeDataPoint(event: {
    indexes?: string[]
    blobs?: string[]
    doubles?: number[]
  }): void
}
