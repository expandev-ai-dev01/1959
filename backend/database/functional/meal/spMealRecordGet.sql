/**
 * @summary
 * Retrieves a single meal record by ID.
 * 
 * @procedure spMealRecordGet
 * @schema functional
 * @type stored-procedure
 * 
 * @endpoints
 * - GET /api/internal/meal/:id
 * 
 * @parameters
 * @param {INT} idAccount - Account identifier
 * @param {INT} idMealRecord - Meal identifier
 */
CREATE OR ALTER PROCEDURE [functional].[spMealRecordGet]
  @idAccount INT,
  @idMealRecord INT
AS
BEGIN
  SELECT 
    [meal].[idMealRecord],
    [meal].[date],
    [meal].[time],
    [meal].[type],
    [meal].[notes],
    [meal].[photoUrl]
  FROM [functional].[mealRecord] [meal]
  WHERE [meal].[idAccount] = @idAccount
    AND [meal].[idMealRecord] = @idMealRecord
    AND [meal].[deleted] = 0;

  SELECT 
    [item].[idMealItem],
    [item].[idMealRecord],
    [item].[idFood],
    COALESCE([item].[manualFoodName], [fd].[name]) AS [name],
    [item].[quantity],
    [item].[unit],
    [item].[calories],
    [item].[protein],
    [item].[carbohydrates],
    [item].[fats]
  FROM [functional].[mealItem] [item]
    LEFT JOIN [functional].[food] [fd] ON [fd].[idFood] = [item].[idFood]
  WHERE [item].[idAccount] = @idAccount
    AND [item].[idMealRecord] = @idMealRecord;
END;
GO
