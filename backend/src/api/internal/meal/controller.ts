/**
 * @summary
 * API controller for Meal entity.
 * Handles meal management operations.
 *
 * @module api/internal/meal/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { mealCreate, mealList, mealGet, mealUpdate, mealDelete } from '@/services/meal';

/**
 * Helper to extract user ID from headers (Mock Auth)
 */
function getUserId(req: Request): number {
  const userId = req.headers['x-user-id'];
  return userId ? parseInt(userId as string, 10) : 1;
}

/**
 * @api {get} /api/internal/meal List Meals
 * @apiName ListMeals
 * @apiGroup Meal
 *
 * @apiParam {String} date Date to filter (YYYY-MM-DD)
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data.summary Nutritional summary
 * @apiSuccess {Object[]} data.meals List of meals
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = getUserId(req);
    const data = await mealList(userId, req.query);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/meal Create Meal
 * @apiName CreateMeal
 * @apiGroup Meal
 *
 * @apiBody {String} date Date (YYYY-MM-DD)
 * @apiBody {String} time Time (HH:MM)
 * @apiBody {String} type Meal type
 * @apiBody {String} [notes] Notes
 * @apiBody {String} [photoUrl] Photo URL
 * @apiBody {Object[]} items Food items
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Created meal
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = getUserId(req);
    const data = await mealCreate(userId, req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/meal/:id Get Meal
 * @apiName GetMeal
 * @apiGroup Meal
 *
 * @apiParam {Number} id Meal ID
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Meal details
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = getUserId(req);
    const data = await mealGet(userId, req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/meal/:id Update Meal
 * @apiName UpdateMeal
 * @apiGroup Meal
 *
 * @apiParam {Number} id Meal ID
 * @apiBody {Object} ... Same as Create
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Updated meal
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = getUserId(req);
    const data = await mealUpdate(userId, req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/meal/:id Delete Meal
 * @apiName DeleteMeal
 * @apiGroup Meal
 *
 * @apiParam {Number} id Meal ID
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {String} data.message Confirmation
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = getUserId(req);
    const data = await mealDelete(userId, req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
