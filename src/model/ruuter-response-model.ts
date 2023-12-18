export interface RuuterResponse {
  response: Record<string, unknown> | null;
}

export interface CustomJwtExtendResponse {
  data: {
    custom_jwt_extend: string;
  };
  error: null;
}
