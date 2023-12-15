import { InstanceComparison } from "./instance-comparison";

export interface InstanceComparisonSuccessResponse {
  data: {
    InstanceComparisons: InstanceComparison[]
  };
}

export interface InstanceComparisonErrorResponse {
  error: {
    message: string;
  };
}
