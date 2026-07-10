import { NextFunction, Request, Response } from 'express';
import util from 'util';
import { logger } from '@/shared/logger';

export default (callback: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await Promise.resolve(callback(req, res, next));
  } catch (error) {
    if (error) {
      try {
        logger.log({
          level: 'error',
          error: util.format(error),
          message: 'error catch by controller wrapper.',
          data: { url: req.url, method: req.method, errorType: typeof error },
        });
      } catch (_error) {
        // ignore it
      } finally {
        if (error instanceof Error) {
          next(error);
        } else {
          next(new Error(`Unhandled promise rejection: ${JSON.stringify(error)}`));
        }
      }
    } else {
      next(new Error('Unknown Error Occurred'));
    }
  }
};
