/**
 * @summary
 * Lists meal records for a specific date and account.
 * Returns two result sets: Meals and Items.
 * 
 * @procedure spMealRecordList
 * @schema functional
 * @type stored-procedure
 * 
 * @endpoints
 * - GET /api/internal/meal
 * 
 * @parameters
 * @param {INT} idAccount - Account identifier
 * @param {DATE} date - Date to filter
 * 
 * @output {MealList, n, n}
 * @column {INT} idMealRecord
 * @column {DATE} date
 * @column {TIME} time
 * @column {NVARCHAR} type
 * @column {NVARCHAR} notes
 * @column {NVARCHAR} photoUrl
 * 
 * @output {ItemList, n, n}
 * @column {INT} idMealItem
 * @column {INT} idMealRecord
 * @column {NVARCHAR} name
 * @column {NUMERIC} quantity
 * @column {NVARCHAR} unit
 * @column {NUMERIC} calories
 * @column {NUMERIC} protein
 * @column {NUMERIC} carbohydrates
 * @column {NUMERIC} fats
 */
CREATE OR ALTER PROCEDURE [functional].[spMealRecordList]
  @idAccount INT,
  @date DATE
AS
BEGIN
  -- Meals
  SELECT 
    [meal].[idMealRecord],
    [meal].[date],
    [meal].[time],
    [meal].[type],
    [meal].[notes],
    [meal].[photoUrl]
  FROM [functional].[mealRecord] [meal]
  WHERE [meal].[idAccount] = @idAccount
    AND [meal].[date] = @date
    AND [meal].[deleted] = 0
  ORDER BY [meal].[time];

  -- Items for those meals
  SELECT 
    [item].[idMealItem],
    [item].[idMealRecord],
    COALESCE([item].[manualFoodName], [fd].[name]) AS [name],
    [item].[quantity],
    [item].[unit],
    [item].[calories],
    [item].[protein],
    [item].[carbohydrates],
    [item].[fats]
  FROM [functional].[mealItem] [item]
    JOIN [functional].[mealRecord] [meal] ON [meal].[idMealRecord] = [item].[idMealRecord]
    LEFT JOIN [functional].[food] [fd] ON [fd].[idFood] = [item].[idFood]
  WHERE [meal].[idAccount] = @idAccount
    AND [meal].[date] = @date
    AND [meal].[deleted] = 0;
END;
GO
