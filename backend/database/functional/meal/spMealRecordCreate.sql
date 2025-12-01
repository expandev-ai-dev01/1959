/**
 * @summary
 * Creates a new meal record with associated food items.
 * 
 * @procedure spMealRecordCreate
 * @schema functional
 * @type stored-procedure
 * 
 * @endpoints
 * - POST /api/internal/meal
 * 
 * @parameters
 * @param {INT} idAccount - Account identifier
 * @param {DATE} date - Meal date
 * @param {TIME} time - Meal time
 * @param {NVARCHAR} type - Meal type
 * @param {NVARCHAR} notes - Optional notes
 * @param {NVARCHAR} photoUrl - Optional photo URL
 * 
 * @testScenarios
 * - Create meal with valid items
 * - Fail if no items provided (handled by app logic, but DB allows)
 */
CREATE OR ALTER PROCEDURE [functional].[spMealRecordCreate]
  @idAccount INT,
  @date DATE,
  @time TIME,
  @type NVARCHAR(50),
  @notes NVARCHAR(500) = NULL,
  @photoUrl NVARCHAR(MAX) = NULL,
  @newId INT OUTPUT
AS
BEGIN
  /**
   * @validation Validate required parameters
   */
  IF @idAccount IS NULL OR @date IS NULL OR @time IS NULL OR @type IS NULL
  BEGIN
    ;THROW 51000, 'RequiredParametersMissing', 1;
  END

  INSERT INTO [functional].[mealRecord]
  ([idAccount], [date], [time], [type], [notes], [photoUrl])
  VALUES
  (@idAccount, @date, @time, @type, @notes, @photoUrl);

  SET @newId = SCOPE_IDENTITY();
END;
GO
