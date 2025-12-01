/**
 * @summary
 * Updates a meal record.
 * 
 * @procedure spMealRecordUpdate
 * @schema functional
 * @type stored-procedure
 * 
 * @endpoints
 * - PUT /api/internal/meal/:id
 */
CREATE OR ALTER PROCEDURE [functional].[spMealRecordUpdate]
  @idAccount INT,
  @idMealRecord INT,
  @date DATE,
  @time TIME,
  @type NVARCHAR(50),
  @notes NVARCHAR(500) = NULL,
  @photoUrl NVARCHAR(MAX) = NULL
AS
BEGIN
  IF NOT EXISTS (SELECT 1 FROM [functional].[mealRecord] WHERE [idMealRecord] = @idMealRecord AND [idAccount] = @idAccount AND [deleted] = 0)
  BEGIN
    ;THROW 51000, 'NotFound', 1;
  END

  UPDATE [functional].[mealRecord]
  SET 
    [date] = @date,
    [time] = @time,
    [type] = @type,
    [notes] = @notes,
    [photoUrl] = @photoUrl,
    [dateModified] = GETUTCDATE()
  WHERE [idMealRecord] = @idMealRecord
    AND [idAccount] = @idAccount;
END;
GO
