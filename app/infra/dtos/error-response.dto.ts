interface Error {
  code: string;
  detail: string;
  attr: string;
}

export interface ErrorResponseDto {
  type: string;
  errors: Error[];
  path: string;
  timestamp: string;
}
