/**
 * @summary
 * Soft deletes a meal record.
 * 
 * @procedure spMealRecordDelete
 * @schema functional
 * @type stored-procedure
 * 
 * @endpoints
 * - DELETE /api/internal/meal/:id
 */
CREATE OR ALTER PROCEDURE [functional].[spMealRecordDelete]
  @idAccount INT,
  @idMealRecord INT
AS
BEGIN
  IF NOT EXISTS (SELECT 1 FROM [functional].[mealRecord] WHERE [idMealRecord] = @idMealRecord AND [idAccount] = @idAccount AND [deleted] = 0)
  BEGIN
    ;THROW 51000, 'NotFound', 1;
  END

  UPDATE [functional].[mealRecord]
  SET 
    [deleted] = 1,
    [dateModified] = GETUTCDATE()
  WHERE [idMealRecord] = @idMealRecord
    AND [idAccount] = @idAccount;
END;
GO
