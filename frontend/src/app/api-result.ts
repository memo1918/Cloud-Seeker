import { ApiError } from "./api-error";

export type ApiResult<T> = Promise<[T | null, ApiError | null]>;
