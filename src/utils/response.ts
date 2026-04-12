import { Response } from 'express';

export const customResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = null,
  error: any = null
) => {
  const isSuccess = status >= 200 && status < 300;

  const payload: any = {
    success: isSuccess,
    status,
    message,
  };

  if (isSuccess) {
    if (data !== null) payload.data = data;
  } else {
    payload.error = error !== null ? error : message;
  }

  return res.status(status).json(payload);
};
